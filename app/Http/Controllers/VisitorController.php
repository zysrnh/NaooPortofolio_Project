<?php

namespace App\Http\Controllers;

use App\Models\VisitorLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class VisitorController extends Controller
{
    // ── Bot patterns ──────────────────────────────────────────────────────────
    private const BOT_PATTERNS = [
        'bot', 'crawl', 'spider', 'slurp', 'facebookexternalhit',
        'WhatsApp', 'Googlebot', 'bingbot', 'YandexBot', 'DuckDuckBot',
        'Baiduspider', 'Sogou', 'Exabot', 'ia_archiver', 'python-requests',
        'curl/', 'wget/', 'Go-http-client', 'okhttp',
    ];

    // ── Device / OS / Browser detection ──────────────────────────────────────
    private function parseUserAgent(string $ua): array
    {
        // Device
        $device = 'Desktop';
        if (preg_match('/tablet|ipad|playbook|silk/i', $ua)) {
            $device = 'Tablet';
        } elseif (preg_match('/mobile|android|iphone|ipod|blackberry|opera mini|windows phone/i', $ua)) {
            $device = 'Mobile';
        }

        // OS
        $os = 'Unknown';
        $osMap = [
            '/windows nt 10/i'  => 'Windows 10/11',
            '/windows nt 6\.3/i'=> 'Windows 8.1',
            '/windows nt 6\.1/i'=> 'Windows 7',
            '/windows/i'        => 'Windows',
            '/mac os x 10[._]1[5-9]/i' => 'macOS',
            '/mac os x/i'       => 'macOS',
            '/android/i'        => 'Android',
            '/iphone/i'         => 'iOS (iPhone)',
            '/ipad/i'           => 'iOS (iPad)',
            '/linux/i'          => 'Linux',
            '/ubuntu/i'         => 'Ubuntu',
        ];
        foreach ($osMap as $pattern => $name) {
            if (preg_match($pattern, $ua)) { $os = $name; break; }
        }

        // Browser
        $browser = 'Unknown';
        $browserMap = [
            '/edg\//i'           => 'Edge',
            '/opr\//i'           => 'Opera',
            '/opera/i'           => 'Opera',
            '/chrome\/[\d.]+/i'  => 'Chrome',
            '/firefox\/[\d.]+/i' => 'Firefox',
            '/safari\/[\d.]+/i'  => 'Safari',
            '/msie|trident/i'    => 'IE',
        ];
        foreach ($browserMap as $pattern => $name) {
            if (preg_match($pattern, $ua)) { $browser = $name; break; }
        }

        return compact('device', 'os', 'browser');
    }

    private function isBot(string $ua): bool
    {
        foreach (self::BOT_PATTERNS as $pattern) {
            if (stripos($ua, $pattern) !== false) return true;
        }
        return false;
    }

    // Geo-lookup via ip-api.com (free, no key needed, 45 req/min)
    private function geoLookup(string $ip): array
    {
        if (in_array($ip, ['127.0.0.1', '::1', 'localhost'])) {
            return ['country' => 'Local', 'city' => 'Local'];
        }
        try {
            $cacheKey = "geo_$ip";
            return Cache::remember($cacheKey, 86400, function () use ($ip) {
                $res = Http::timeout(3)->get("http://ip-api.com/json/{$ip}?fields=country,city,status");
                if ($res->ok() && $res->json('status') === 'success') {
                    return ['country' => $res->json('country'), 'city' => $res->json('city')];
                }
                return ['country' => null, 'city' => null];
            });
        } catch (\Throwable) {
            return ['country' => null, 'city' => null];
        }
    }

    // ── POST /api/track ───────────────────────────────────────────────────────
    public function track(Request $request): \Illuminate\Http\JsonResponse
    {
        $ua         = $request->header('User-Agent', '');
        $ip         = $request->ip();
        $isBot      = $this->isBot($ua);
        $parsed     = $this->parseUserAgent($ua);
        $geo        = $this->geoLookup($ip);
        $sessionId  = $request->input('session_id');
        $page       = $request->input('page', '/');
        $referrer   = $request->input('referrer');

        VisitorLog::create([
            'ip_address' => $ip,
            'country'    => $geo['country'],
            'city'       => $geo['city'],
            'device'     => $parsed['device'],
            'os'         => $parsed['os'],
            'browser'    => $parsed['browser'],
            'page'       => substr($page, 0, 255),
            'referrer'   => $referrer ? substr($referrer, 0, 500) : null,
            'user_agent' => substr($ua, 0, 1000),
            'session_id' => $sessionId,
            'is_bot'     => $isBot,
        ]);

        return response()->json(['ok' => true]);
    }

    // ── GET /api/visitors/stats ───────────────────────────────────────────────
    public function stats(Request $request): \Illuminate\Http\JsonResponse
    {
        $days  = (int) $request->query('days', 30);
        $since = now()->subDays($days);

        $base  = VisitorLog::where('is_bot', false)->where('created_at', '>=', $since);

        // Total unique sessions (= unique visitors) & pageviews
        $totalVisitors  = VisitorLog::where('is_bot', false)->distinct('session_id')->count('session_id');
        $totalPageViews = VisitorLog::where('is_bot', false)->count();

        // Daily visits for chart (last N days)
        $daily = (clone $base)
            ->selectRaw('DATE(created_at) as date, COUNT(DISTINCT session_id) as visitors, COUNT(*) as pageviews')
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        // Top pages
        $topPages = (clone $base)
            ->selectRaw('page, COUNT(*) as views')
            ->groupBy('page')
            ->orderByDesc('views')
            ->limit(10)
            ->get();

        // Device breakdown
        $devices = (clone $base)
            ->selectRaw('device, COUNT(*) as count')
            ->groupBy('device')
            ->orderByDesc('count')
            ->get();

        // Browser breakdown
        $browsers = (clone $base)
            ->selectRaw('browser, COUNT(*) as count')
            ->groupBy('browser')
            ->orderByDesc('count')
            ->limit(6)
            ->get();

        // Country breakdown
        $countries = (clone $base)
            ->selectRaw('country, COUNT(DISTINCT session_id) as visitors')
            ->groupBy('country')
            ->orderByDesc('visitors')
            ->limit(8)
            ->get();

        // Recent visitors (last 20)
        $recent = VisitorLog::where('is_bot', false)
            ->orderByDesc('created_at')
            ->limit(20)
            ->get(['ip_address', 'country', 'city', 'device', 'browser', 'os', 'page', 'referrer', 'created_at']);

        // Compare vs previous period
        $prevBase = VisitorLog::where('is_bot', false)
            ->where('created_at', '>=', now()->subDays($days * 2))
            ->where('created_at', '<', $since);
        $prevVisitors = (clone $prevBase)->distinct('session_id')->count('session_id');

        return response()->json([
            'total_visitors'  => $totalVisitors,
            'total_pageviews' => $totalPageViews,
            'prev_visitors'   => $prevVisitors,
            'daily'           => $daily,
            'top_pages'       => $topPages,
            'devices'         => $devices,
            'browsers'        => $browsers,
            'countries'       => $countries,
            'recent'          => $recent,
            'period_days'     => $days,
        ]);
    }

    // ── DELETE /api/visitors/clear (admin only) ───────────────────────────────
    public function clear(): \Illuminate\Http\JsonResponse
    {
        VisitorLog::truncate();
        return response()->json(['ok' => true]);
    }
}
