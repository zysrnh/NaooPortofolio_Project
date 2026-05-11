<?php

namespace App\Http\Controllers;

use App\Models\ColorPalette;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ColorPaletteController extends Controller
{
    public function index()
    {
        return ColorPalette::where('user_id', Auth::id())->latest()->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'nullable|string|max:255',
            'colors' => 'required|array|min:1',
            'source_image' => 'nullable|string',
        ]);

        $palette = ColorPalette::create([
            'user_id' => Auth::id(),
            'name' => $request->name,
            'colors' => $request->colors,
            'source_image' => $request->source_image,
        ]);

        return response()->json($palette, 201);
    }

    public function destroy($id)
    {
        $palette = ColorPalette::where('user_id', Auth::id())->findOrFail($id);
        $palette->delete();

        return response()->json(['message' => 'Palette deleted successfully']);
    }
}
