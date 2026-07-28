<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class JudolSpamFilter
{
    /**
     * Blacklist keywords related to online gambling, slot spam, and SEO poisoning.
     */
    protected array $blacklistedKeywords = [
        'judol', 'judi online', 'slot online', 'slot88', 'maxwin', 'pragmatic play',
        'zeus slot', 'gacor', 'slot gacor', 'togel online', 'bocoran slot', 'deposit pulsa',
        'link gacor', 'situs slot', 'jackpot slot', 'rtp live', 'agen judi', 'casino online',
        'poker online', 'sbobet', 'bandar judi', 'scatter hitam', 'mahjong ways', 'freebet',
        'bonus new member 100', 'depo 10k', 'depo 25k', 'depo 50k', 'situs judi', 'link alternatif slot',
    ];

    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Inspect mutation requests (POST, PUT, PATCH)
        if ($request->isMethod('POST') || $request->isMethod('PUT') || $request->isMethod('PATCH')) {
            $inputString = strtolower(json_encode($request->all()));

            foreach ($this->blacklistedKeywords as $keyword) {
                if (str_contains($inputString, strtolower($keyword))) {
                    if ($request->expectsJson() || $request->is('api/*')) {
                        return response()->json([
                            'ok' => false,
                            'message' => 'Permintaan ditolak: Terdeteksi kata kunci spam / perjudian online.',
                        ], 422);
                    }

                    return redirect()->back()->withErrors([
                        'error' => 'Input mengandung kata kunci terlarang.',
                    ]);
                }
            }
        }

        return $next($request);
    }
}
