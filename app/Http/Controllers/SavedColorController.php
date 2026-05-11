<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SavedColor;
use Illuminate\Support\Facades\Auth;

class SavedColorController extends Controller
{
    public function index()
    {
        return SavedColor::where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'hex' => 'required|string',
            'label' => 'nullable|string',
            'source_image' => 'nullable|string',
        ]);

        return SavedColor::create([
            'user_id' => Auth::id(),
            'hex' => $request->hex,
            'label' => $request->label,
            'source_image' => $request->source_image,
        ]);
    }

    public function destroy($id)
    {
        $color = SavedColor::where('user_id', Auth::id())->findOrFail($id);
        $color->delete();

        return response()->json(['message' => 'Color deleted successfully']);
    }
}
