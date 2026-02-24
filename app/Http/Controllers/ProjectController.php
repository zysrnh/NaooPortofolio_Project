<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\TechStack;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    // ── Public ────────────────────────────────────────────────────────────────

    public function index()
    {
        $projects = Project::where('visible', true)
            ->orderBy('order')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(fn($p) => $this->formatProject($p));

        return response()->json($projects);
    }

    public function show(string $slug)
    {
        $project = Project::where('slug', $slug)->where('visible', true)->firstOrFail();
        return response()->json($this->formatProject($project));
    }

    // ── Protected ─────────────────────────────────────────────────────────────

    public function adminIndex()
    {
        $projects = Project::orderBy('order')->orderBy('created_at', 'desc')->get()
            ->map(fn($p) => $this->formatProject($p));

        return response()->json($projects);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title'              => 'required|string|max:255',
            'subtitle'           => 'required|string|max:255',
            'desc'               => 'required|string',
            'long_desc'          => 'required|string',
            'status'             => 'required|in:Hosted,In Progress,Planning',
            'date'               => 'required|string|max:50',
            'duration'           => 'required|string|max:50',
            'images'             => 'nullable|array',
            'images.*'           => 'nullable|string',
            'tech_stack_ids'     => 'nullable|array',
            'tech_stack_ids.*'   => 'nullable|integer|exists:tech_stacks,id',
            'features'           => 'nullable|array',
            'features.*.title'   => 'required_with:features|string',
            'features.*.desc'    => 'required_with:features|string',
            'demo_url'           => 'nullable|string|max:500',
            'github_url'         => 'nullable|string|max:500',
            'order'              => 'nullable|integer',
            'visible'            => 'nullable|boolean',
        ]);

        $slug = $this->uniqueSlug(Str::slug($data['title']));

        $project = Project::create([
            ...$data,
            'slug'    => $slug,
            'order'   => $data['order']   ?? 0,
            'visible' => $data['visible'] ?? true,
        ]);

        return response()->json($this->formatProject($project), 201);
    }

    public function update(Request $request, Project $project)
    {
        $data = $request->validate([
            'title'              => 'sometimes|string|max:255',
            'subtitle'           => 'sometimes|string|max:255',
            'desc'               => 'sometimes|string',
            'long_desc'          => 'sometimes|string',
            'status'             => 'sometimes|in:Hosted,In Progress,Planning',
            'date'               => 'sometimes|string|max:50',
            'duration'           => 'sometimes|string|max:50',
            'images'             => 'nullable|array',
            'images.*'           => 'nullable|string',
            'tech_stack_ids'     => 'nullable|array',
            'tech_stack_ids.*'   => 'nullable|integer|exists:tech_stacks,id',
            'features'           => 'nullable|array',
            'features.*.title'   => 'required_with:features|string',
            'features.*.desc'    => 'required_with:features|string',
            'demo_url'           => 'nullable|string|max:500',
            'github_url'         => 'nullable|string|max:500',
            'order'              => 'nullable|integer',
            'visible'            => 'nullable|boolean',
        ]);

        if (isset($data['title'])) {
            $data['slug'] = $this->uniqueSlug(Str::slug($data['title']), $project->id);
        }

        $project->update($data);

        return response()->json($this->formatProject($project->fresh()));
    }

    public function destroy(Project $project)
    {
        $project->delete();
        return response()->json(['message' => 'Project deleted']);
    }

    public function toggleVisibility(Project $project)
    {
        $project->update(['visible' => !$project->visible]);
        return response()->json($this->formatProject($project->fresh()));
    }

    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:3072',
        ]);

        $path = $request->file('image')->store('projects', 'public');
        return response()->json(['url' => '/storage/' . $path]);
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    private function uniqueSlug(string $slug, ?int $excludeId = null): string
    {
        $original = $slug;
        $count    = 1;
        $query    = Project::where('slug', $slug);
        if ($excludeId) $query->where('id', '!=', $excludeId);

        while ($query->exists()) {
            $slug  = $original . '-' . $count++;
            $query = Project::where('slug', $slug);
            if ($excludeId) $query->where('id', '!=', $excludeId);
        }

        return $slug;
    }

    private function formatProject(Project $p): array
    {
        $ids    = $p->tech_stack_ids ?? [];
        $stacks = empty($ids) ? [] : TechStack::whereIn('id', $ids)->get()->map(fn($s) => [
            'id'    => $s->id,
            'label' => $s->name,
            'icon'  => $s->icon,
        ])->toArray();

        return [
            'id'             => $p->id,
            'slug'           => $p->slug,
            'title'          => $p->title,
            'subtitle'       => $p->subtitle,
            'desc'           => $p->desc,
            'longDesc'       => $p->long_desc,
            'status'         => $p->status,
            'date'           => $p->date,
            'duration'       => $p->duration,
            'images'         => $p->images ?? [],
            'stacks'         => $stacks,
            'tech_stack_ids' => $ids,
            'features'       => $p->features ?? [],
            'demoUrl'        => $p->demo_url,
            'githubUrl'      => $p->github_url,
            'order'          => $p->order,
            'visible'        => $p->visible,
        ];
    }
}