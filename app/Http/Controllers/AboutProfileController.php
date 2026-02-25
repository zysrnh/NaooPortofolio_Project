<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\AboutProfile;

class AboutProfileController extends Controller
{
    public function show()
    {
        $about = AboutProfile::first();
        if (!$about) {
            // Return sensible defaults if not set yet
            return response()->json([
                'id'             => null,
                'tagline'        => 'Who am I',
                'info_cards'     => [
                    ['label' => 'Role',   'value' => 'IT Programmer'],
                    ['label' => 'Focus',  'value' => 'Fullstack Web'],
                    ['label' => 'Stack',  'value' => 'React + Laravel'],
                    ['label' => 'Status', 'value' => 'Open to Work'],
                ],
                'highlights'     => [],
                'extra_bio'      => '',
            ]);
        }

        return response()->json([
            'id'         => $about->id,
            'tagline'    => $about->tagline    ?? 'Who am I',
            'info_cards' => $about->info_cards ?? [
                ['label' => 'Role',   'value' => 'IT Programmer'],
                ['label' => 'Focus',  'value' => 'Fullstack Web'],
                ['label' => 'Stack',  'value' => 'React + Laravel'],
                ['label' => 'Status', 'value' => 'Open to Work'],
            ],
            'highlights' => $about->highlights ?? [],
            'extra_bio'  => $about->extra_bio  ?? '',
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'tagline'          => 'nullable|string|max:80',
            'extra_bio'        => 'nullable|string|max:1000',
            'info_cards'       => 'nullable|array|max:8',
            'info_cards.*.label' => 'required|string|max:40',
            'info_cards.*.value' => 'required|string|max:80',
            'highlights'       => 'nullable|array|max:10',
            'highlights.*'     => 'string|max:100',
        ]);

        $about = AboutProfile::first();
        if (!$about) {
            $about = new AboutProfile();
        }

        $about->tagline    = $validated['tagline']    ?? 'Who am I';
        $about->extra_bio  = $validated['extra_bio']  ?? '';
        $about->info_cards = $validated['info_cards'] ?? [];
        $about->highlights = $validated['highlights'] ?? [];
        $about->save();

        return response()->json($about);
    }
}