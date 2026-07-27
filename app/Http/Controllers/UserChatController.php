<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserChat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserChatController extends Controller
{
    // List user terdaftar untuk diajak chat
    public function users()
    {
        $currentUserId = Auth::id();
        $users = User::where('id', '!=', $currentUserId)
            ->select('id', 'name', 'email', 'role', 'avatar', 'created_at')
            ->orderBy('name', 'asc')
            ->get();

        return response()->json($users);
    }

    // Ambil histori pesan 1-on-1 dengan user tertentu
    public function index($receiverId)
    {
        $currentUserId = Auth::id();

        // Tandai pesan terbaca
        UserChat::where('sender_id', $receiverId)
            ->where('receiver_id', $currentUserId)
            ->where('is_read', false)
            ->update(['is_read' => true]);

        $messages = UserChat::where(function ($q) use ($currentUserId, $receiverId) {
            $q->where('sender_id', $currentUserId)->where('receiver_id', $receiverId);
        })->orWhere(function ($q) use ($currentUserId, $receiverId) {
            $q->where('sender_id', $receiverId)->where('receiver_id', $currentUserId);
        })
        ->with(['sender:id,name,avatar', 'receiver:id,name,avatar'])
        ->orderBy('created_at', 'asc')
        ->get();

        return response()->json($messages);
    }

    // Kirim pesan direct 1-on-1 ke user lain
    public function store(Request $request)
    {
        $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'message' => 'required|string|max:1000',
        ]);

        $chat = UserChat::create([
            'sender_id' => Auth::id(),
            'receiver_id' => $request->receiver_id,
            'message' => trim($request->message),
        ]);

        $chat->load(['sender:id,name,avatar', 'receiver:id,name,avatar']);

        return response()->json($chat, 201);
    }
}
