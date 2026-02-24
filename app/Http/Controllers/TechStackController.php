<?php
// app/Http/Controllers/TechStackController.php

namespace App\Http\Controllers;

use App\Models\TechStack;
use Illuminate\Http\Request;

class TechStackController extends Controller
{
    // ── Public: semua stack (untuk HomepageManager preview) ──────────────────
    public function index()
    {
        return response()->json(TechStack::latest()->get());
    }

    // ── Public: hanya visible (untuk Homepage fetch) ─────────────────────────
    public function indexVisible()
    {
        return response()->json(
            TechStack::where('is_visible', true)->latest()->get()
        );
    }

    // ── Protected: create ─────────────────────────────────────────────────────
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'       => 'required|string|max:100',
            'category'   => 'required|string',
            'icon'       => 'required|string',
            'is_visible' => 'boolean',
        ]);

        $validated['is_visible'] = $validated['is_visible'] ?? true;
        $stack = TechStack::create($validated);
        return response()->json($stack, 201);
    }

    // ── Protected: update ─────────────────────────────────────────────────────
    public function update(Request $request, TechStack $techStack)
    {
        $validated = $request->validate([
            'name'       => 'required|string|max:100',
            'category'   => 'required|string',
            'icon'       => 'required|string',
            'is_visible' => 'boolean',
        ]);

        $techStack->update($validated);
        return response()->json($techStack);
    }

    // ── Protected: toggle visibility only ────────────────────────────────────
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