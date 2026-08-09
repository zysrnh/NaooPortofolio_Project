<?php
// app/Http/Controllers/TechStackController.php

namespace App\Http\Controllers;

use App\Models\TechStack;
use Illuminate\Http\Request;

class TechStackController extends Controller
{
    // ── Public: semua stack (untuk HomepageManager & TechStackCRUD) ──────────
    public function index()
    {
        return response()->json(TechStack::latest()->get());
    }

    // ── Public: hanya visible (untuk Homepage fetch) ──────────────────────────
    public function indexVisible()
    {
        return response()->json(
            TechStack::where('is_visible', true)
                ->orderBy('category')
                ->orderBy('name')
                ->get()
        );
    }

    // ── Protected: upload icon (file → storage) ───────────────────────────────
    public function uploadIcon(Request $request)
    {
        $request->validate([
            'icon' => 'required|file|mimes:jpeg,png,jpg,webp,gif,svg,bmp|max:5120',
        ]);

        $path = $request->file('icon')->store('tech-stacks', 'public');
        return response()->json(['url' => '/storage/' . $path]);
    }

    // ── Protected: create ─────────────────────────────────────────────────────
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'     => 'required|string|max:100',
            'category' => 'required|string',
            'icon'     => 'required|string',
        ]);

        $validated['is_visible'] = false;

        $stack = TechStack::create($validated);
        return response()->json($stack, 201);
    }

    // ── Protected: update ─────────────────────────────────────────────────────
    public function update(Request $request, TechStack $techStack)
    {
        $validated = $request->validate([
            'name'     => 'required|string|max:100',
            'category' => 'required|string',
            'icon'     => 'required|string',
        ]);

        $techStack->update($validated);
        return response()->json($techStack);
    }

    // ── Protected: toggle visibility (untuk HomepageManager) ─────────────────
    public function toggleVisibility(TechStack $techStack)
    {
        $techStack->update(['is_visible' => !$techStack->is_visible]);
        return response()->json($techStack);
    }

    // ── Protected: delete ─────────────────────────────────────────────────────
    public function destroy(TechStack $techStack)
    {
        $techStack->delete();
        return response()->json(['message' => 'Deleted']);
    }
}