<?php
// app/Http/Controllers/TechStackController.php

namespace App\Http\Controllers;

use App\Models\TechStack;
use Illuminate\Http\Request;

class TechStackController extends Controller
{
    public function index() {
        return response()->json(TechStack::latest()->get());
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'name'     => 'required|string|max:100',
            'category' => 'required|string',
            'icon'     => 'required|string',
        ]);
        $stack = TechStack::create($validated);
        return response()->json($stack, 201);
    }

    public function update(Request $request, TechStack $techStack) {
        $validated = $request->validate([
            'name'     => 'required|string|max:100',
            'category' => 'required|string',
            'icon'     => 'required|string',
        ]);
        $techStack->update($validated);
        return response()->json($techStack);
    }

    public function destroy(TechStack $techStack) {
        $techStack->delete();
        return response()->json(['message' => 'Deleted']);
    }
}