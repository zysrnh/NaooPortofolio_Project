<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use App\Models\AboutProfile;
use App\Models\Experience;
use App\Models\CaseStudy;
use App\Models\TechStack;

class AboutProfileController extends Controller
{
    // ── Default stats fallback ────────────────────────────────────────────────
    private const DEFAULT_STATS = [
        ['label' => 'Years Coding',   'value' => '3+',  'icon_key' => 'monitor'],
        ['label' => 'Projects Built', 'value' => '20+', 'icon_key' => 'book'],
        ['label' => 'Tech Explored',  'value' => '15+', 'icon_key' => 'code'],
        ['label' => 'GitHub Repos',   'value' => '30+', 'icon_key' => 'github'],
        ['label' => 'Cups of Coffee', 'value' => '∞',   'icon_key' => 'coffee'],
    ];

    // ═══════════════════════════════════════════════════════════════════════
    // ABOUT
    // ═══════════════════════════════════════════════════════════════════════

    public function show(): JsonResponse
    {
        $about = AboutProfile::first();

        if (!$about) {
            return response()->json([
                'id'                  => null,
                'tagline'             => 'Who am I',
                'extra_bio'           => '',
                'bio'                 => '',
                'info_cards'          => [
                    ['label' => 'Frontend', 'value' => 'React, Tailwind, Inertia'],
                    ['label' => 'Backend',  'value' => 'Laravel, REST API'],
                    ['label' => 'Database', 'value' => 'MySQL, Redis'],
                    ['label' => 'Tools',    'value' => 'Git, Figma, AI Tools'],
                ],
                'highlights'          => [],
                'featured_stack_ids'  => [],
                'avail_status'        => 'Open to Work',
                'avail_freelance'     => true,
                'avail_remote'        => true,
                'avail_collaboration' => true,
                'avail_timezone'      => 'WIB (UTC+7)',
                'stats'               => self::DEFAULT_STATS,
            ]);
        }

        return response()->json([
            'id'                  => $about->id,
            'tagline'             => $about->tagline             ?? 'Who am I',
            'extra_bio'           => $about->extra_bio           ?? '',
            'bio'                 => $about->extra_bio           ?? '',
            'info_cards'          => $about->info_cards          ?? [],
            'highlights'          => $about->highlights          ?? [],
            'featured_stack_ids'  => $about->featured_stack_ids  ?? [],
            'avail_status'        => $about->avail_status        ?? 'Open to Work',
            'avail_freelance'     => (bool) ($about->avail_freelance     ?? true),
            'avail_remote'        => (bool) ($about->avail_remote        ?? true),
            'avail_collaboration' => (bool) ($about->avail_collaboration ?? true),
            'avail_timezone'      => $about->avail_timezone      ?? 'WIB (UTC+7)',
            'stats'               => $about->stats               ?? self::DEFAULT_STATS,
        ]);
    }

    public function update(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'tagline'              => 'nullable|string|max:80',
            'extra_bio'            => 'nullable|string|max:1000',
            'bio'                  => 'nullable|string|max:1000',
            'info_cards'           => 'nullable|array|max:8',
            'info_cards.*.label'   => 'required|string|max:40',
            'info_cards.*.value'   => 'required|string|max:80',
            'highlights'           => 'nullable|array|max:10',
            'highlights.*'         => 'string|max:100',
            'featured_stack_ids'   => 'nullable|array',
            'featured_stack_ids.*' => 'integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $about = AboutProfile::first() ?? new AboutProfile();

        $about->tagline    = $request->tagline    ?? $about->tagline    ?? 'Who am I';
        $about->extra_bio  = $request->extra_bio  ?? $request->bio      ?? $about->extra_bio  ?? '';
        $about->info_cards = $request->info_cards ?? $about->info_cards ?? [];
        $about->highlights = $request->highlights ?? $about->highlights ?? [];

        if ($request->has('featured_stack_ids')) {
            $about->featured_stack_ids = $request->featured_stack_ids ?? [];
        }

        $about->save();
        return response()->json($about);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // STATS (By the Numbers)
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * GET /api/about/stats
     * Public
     */
    public function getStats(): JsonResponse
    {
        $about = AboutProfile::first();
        return response()->json($about?->stats ?? self::DEFAULT_STATS);
    }

    /**
     * PUT /api/about/stats
     * Protected — replace seluruh array stats sekaligus
     * Body: { "stats": [{"label":"...","value":"...","icon_key":"..."},...] }
     */
    public function updateStats(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'stats'              => 'required|array|max:10',
            'stats.*.label'      => 'required|string|max:60',
            'stats.*.value'      => 'required|string|max:20',
            'stats.*.icon_key'   => 'required|string|max:30',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $about = AboutProfile::first() ?? new AboutProfile();
        $about->stats = $request->stats;
        $about->save();

        return response()->json(['ok' => true, 'stats' => $about->stats]);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // FEATURED STACKS
    // ═══════════════════════════════════════════════════════════════════════

    public function featuredStacks(): JsonResponse
    {
        $about = AboutProfile::first();
        $ids   = $about?->featured_stack_ids ?? [];

        if (empty($ids)) {
            return response()->json(TechStack::where('is_visible', true)->get());
        }

        $stacks = TechStack::whereIn('id', $ids)
            ->get()
            ->sortBy(fn($s) => array_search($s->id, $ids))
            ->values();

        return response()->json($stacks);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // AVAILABILITY
    // ═══════════════════════════════════════════════════════════════════════

    public function getAvailability(): JsonResponse
    {
        $about = AboutProfile::first();

        return response()->json([
            'status'        => $about?->avail_status        ?? 'Open to Work',
            'freelance'     => (bool) ($about?->avail_freelance     ?? true),
            'remote'        => (bool) ($about?->avail_remote        ?? true),
            'collaboration' => (bool) ($about?->avail_collaboration ?? true),
            'timezone'      => $about?->avail_timezone      ?? 'WIB (UTC+7)',
        ]);
    }

    public function updateAvailability(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'status'        => 'nullable|string|max:100',
            'freelance'     => 'nullable|boolean',
            'remote'        => 'nullable|boolean',
            'collaboration' => 'nullable|boolean',
            'timezone'      => 'nullable|string|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $about = AboutProfile::first() ?? new AboutProfile();

        $about->avail_status        = $request->status   ?? $about->avail_status   ?? 'Open to Work';
        $about->avail_freelance     = $request->has('freelance')     ? (bool) $request->freelance     : (bool) ($about->avail_freelance     ?? true);
        $about->avail_remote        = $request->has('remote')        ? (bool) $request->remote        : (bool) ($about->avail_remote        ?? true);
        $about->avail_collaboration = $request->has('collaboration') ? (bool) $request->collaboration : (bool) ($about->avail_collaboration ?? true);
        $about->avail_timezone      = $request->timezone ?? $about->avail_timezone ?? 'WIB (UTC+7)';

        $about->save();
        return response()->json(['ok' => true]);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // EXPERIENCES
    // ═══════════════════════════════════════════════════════════════════════

    public function indexExperiences(): JsonResponse
    {
        return response()->json(
            Experience::orderBy('sort_order')->orderByDesc('start_date')->get()
        );
    }

    public function storeExperience(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title'        => 'required|string|max:150',
            'type'         => 'required|string|in:internship,freelance,learning,project,fulltime,parttime',
            'company'      => 'nullable|string|max:150',
            'description'  => 'nullable|string|max:1000',
            'start_date'   => 'nullable|string|max:7',
            'end_date'     => 'nullable|string|max:7',
            'highlights'   => 'nullable|array',
            'highlights.*' => 'string|max:100',
            'sort_order'   => 'nullable|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        return response()->json(Experience::create([
            'title'       => $request->title,
            'type'        => $request->type,
            'company'     => $request->company     ?? '',
            'description' => $request->description ?? '',
            'start_date'  => $request->start_date  ?? null,
            'end_date'    => $request->end_date     ?: null,
            'highlights'  => $request->highlights  ?? [],
            'sort_order'  => $request->sort_order  ?? 0,
        ]), 201);
    }

    public function updateExperience(Request $request, int $id): JsonResponse
    {
        $exp = Experience::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'title'        => 'required|string|max:150',
            'type'         => 'required|string|in:internship,freelance,learning,project,fulltime,parttime',
            'company'      => 'nullable|string|max:150',
            'description'  => 'nullable|string|max:1000',
            'start_date'   => 'nullable|string|max:7',
            'end_date'     => 'nullable|string|max:7',
            'highlights'   => 'nullable|array',
            'highlights.*' => 'string|max:100',
            'sort_order'   => 'nullable|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $exp->update([
            'title'       => $request->title,
            'type'        => $request->type,
            'company'     => $request->company     ?? $exp->company,
            'description' => $request->description ?? $exp->description,
            'start_date'  => $request->start_date  ?? $exp->start_date,
            'end_date'    => $request->end_date     ?: null,
            'highlights'  => $request->highlights  ?? $exp->highlights,
            'sort_order'  => $request->sort_order  ?? $exp->sort_order,
        ]);

        return response()->json($exp);
    }

    public function destroyExperience(int $id): JsonResponse
    {
        Experience::findOrFail($id)->delete();
        return response()->json(['ok' => true]);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // CASE STUDIES
    // ═══════════════════════════════════════════════════════════════════════

    public function indexCaseStudies(): JsonResponse
    {
        return response()->json(CaseStudy::orderBy('sort_order')->orderBy('id')->get());
    }

    public function storeCaseStudy(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title'       => 'required|string|max:150',
            'short_story' => 'nullable|string|max:1000',
            'sort_order'  => 'nullable|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        return response()->json(CaseStudy::create([
            'title'       => $request->title,
            'short_story' => $request->short_story ?? '',
            'sort_order'  => $request->sort_order  ?? 0,
        ]), 201);
    }

    public function updateCaseStudy(Request $request, int $id): JsonResponse
    {
        $cs = CaseStudy::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'title'       => 'required|string|max:150',
            'short_story' => 'nullable|string|max:1000',
            'sort_order'  => 'nullable|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $cs->update([
            'title'       => $request->title,
            'short_story' => $request->short_story ?? $cs->short_story,
            'sort_order'  => $request->sort_order  ?? $cs->sort_order,
        ]);

        return response()->json($cs);
    }

    public function destroyCaseStudy(int $id): JsonResponse
    {
        CaseStudy::findOrFail($id)->delete();
        return response()->json(['ok' => true]);
    }
}