<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use App\Models\HeroProfile;

class HeroProfileController extends Controller
{
    /**
     * GET /api/hero
     * Public — dipakai Home.tsx dan About.tsx
     */
    public function show(): JsonResponse
    {
        $hero = HeroProfile::first();

        if (!$hero) {
            return response()->json([
                'name'   => 'Yusron',
                'title'  => 'IT Programmer',
                'bio'    => '',
                'photo'  => '/profile/Mboy.jpeg',
                'photo2' => null,
            ]);
        }

        return response()->json([
            'name'   => $hero->name   ?? 'Yusron',
            'title'  => $hero->title  ?? 'IT Programmer',
            'bio'    => $hero->bio    ?? '',
            'photo'  => $hero->photo  ?? '/profile/Mboy.jpeg',
            'photo2' => $hero->photo2 ?? null,
        ]);
    }

    /**
     * PUT /api/hero
     * Protected — update name, title, bio (JSON)
     */
    public function update(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name'  => 'required|string|max:100',
            'title' => 'required|string|max:100',
            'bio'   => 'nullable|string|max:500',
            'photo' => 'nullable|string', // base64 atau URL (legacy support)
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $hero = HeroProfile::first();

        if ($hero) {
            $hero->update($request->only('name', 'title', 'bio'));
        } else {
            $hero = HeroProfile::create($request->only('name', 'title', 'bio'));
        }

        return response()->json([
            'name'   => $hero->name,
            'title'  => $hero->title,
            'bio'    => $hero->bio,
            'photo'  => $hero->photo,
            'photo2' => $hero->photo2 ?? null,
        ]);
    }

    /**
     * POST /api/hero/photo
     * Protected — upload foto primary (photo) dan/atau secondary (photo2)
     * Content-Type: multipart/form-data
     */
    public function uploadPhoto(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'photo'  => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'photo2' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $hero = HeroProfile::first() ?? new HeroProfile([
            'name'  => 'Yusron',
            'title' => 'IT Programmer',
            'bio'   => '',
        ]);

        // Foto primary
        if ($request->hasFile('photo') && $request->file('photo')->isValid()) {
            $this->deleteOldFile($hero->photo);
            $path        = $request->file('photo')->store('public/profile');
            $hero->photo = Storage::url($path);
        }

        // Foto secondary / decorative
        if ($request->hasFile('photo2') && $request->file('photo2')->isValid()) {
            $this->deleteOldFile($hero->photo2);
            $path         = $request->file('photo2')->store('public/profile');
            $hero->photo2 = Storage::url($path);
        }

        $hero->save();

        return response()->json([
            'ok'     => true,
            'photo'  => $hero->photo,
            'photo2' => $hero->photo2,
        ]);
    }

    /**
     * Hapus file lama dari storage jika path-nya di /storage/
     */
    private function deleteOldFile(?string $url): void
    {
        if ($url && str_starts_with($url, '/storage/')) {
            Storage::delete(str_replace('/storage/', 'public/', $url));
        }
    }
}