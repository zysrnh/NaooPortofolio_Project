<?php

namespace App\Http\Controllers;

use App\Models\Guestbook;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GuestbookController extends Controller
{
    // List pesan untuk publik (hanya yang is_visible)
    public function index()
    {
        return response()->json(
            Guestbook::where('is_visible', true)
                ->orderByDesc('created_at')
                ->paginate(12)
        );
    }

    // Simpan pesan dari publik
    public function store(Request $request)
    {
        if (!auth()->check()) {
            return response()->json(['message' => 'Kamu harus login dulu untuk kirim testimonial!'], 401);
        }

        $validator = Validator::make($request->all(), [
            'name'    => 'nullable|string|max:50',
            'message' => 'required|string|max:500',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Cek limit: 1 IP cuma boleh kirim 1 pesan setiap 5 menit (anti-spam simpel)
        $lastPost = Guestbook::where('ip_address', $request->ip())
            ->where('created_at', '>=', now()->subMinutes(5))
            ->first();

        if ($lastPost) {
            return response()->json([
                'message' => 'Sabar ya! Kamu baru aja ngirim pesan. Tunggu 5 menit lagi.'
            ], 429);
        }

        $colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7D794'];
        $user   = auth()->user();

        $guestbook = Guestbook::create([
            'name'         => $user->name ?? $request->name ?? 'Anonymous',
            'message'      => $request->message,
            'avatar_color' => $colors[array_rand($colors)],
            'ip_address'   => $request->ip(),
            'is_visible'   => true, // Default tampil, admin bisa hide nanti
        ]);

        return response()->json($guestbook, 201);
    }

    // --- Admin Functions ---

    public function adminIndex()
    {
        return response()->json(Guestbook::orderByDesc('created_at')->paginate(20));
    }

    public function toggleVisibility(Guestbook $guestbook)
    {
        $guestbook->update(['is_visible' => !$guestbook->is_visible]);
        return response()->json(['ok' => true, 'is_visible' => $guestbook->is_visible]);
    }

    public function destroy(Guestbook $guestbook)
    {
        $guestbook->delete();
        return response()->json(['ok' => true]);
    }
}
