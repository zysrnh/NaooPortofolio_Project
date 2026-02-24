<?php
// app/Http/Controllers/HeroProfileController.php

namespace App\Http\Controllers;

use App\Models\HeroProfile;
use Illuminate\Http\Request;

class HeroProfileController extends Controller
{
    /**
     * GET /api/hero
     * Public — dipakai Home.tsx untuk nampilin data hero
     */
    public function show()
    {
        // Selalu ambil row pertama (hanya ada 1 profil)
        $hero = HeroProfile::first();

        if (!$hero) {
            return response()->json([
                'name'  => 'Yusron',
                'title' => 'IT Programmer',
                'bio'   => '',
                'photo' => null,
            ]);
        }

        return response()->json($hero);
    }

    /**
     * PUT /api/hero
     * Protected — dipakai HomepageManager untuk update profil
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'name'  => 'required|string|max:100',
            'title' => 'required|string|max:100',
            'bio'   => 'nullable|string|max:500',
            'photo' => 'nullable|string', // base64 atau URL
        ]);

        $hero = HeroProfile::first();

        if ($hero) {
            $hero->update($validated);
        } else {
            $hero = HeroProfile::create($validated);
        }

        return response()->json($hero);
    }
}