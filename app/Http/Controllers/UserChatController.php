<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserChat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserChatController extends Controller
{
    // List user terdaftar untuk diajak chat
    public function users(Request $request)
    {
        $currentUserId = Auth::id() ?? $request->input('sender_id');
        $users = User::when($currentUserId, function ($q) use ($currentUserId) {
                $q->where('id', '!=', $currentUserId);
            })
            ->select('id', 'name', 'email', 'role', 'avatar', 'created_at')
            ->orderBy('name', 'asc')
            ->get();

        return response()->json($users);
    }

    // Ambil histori pesan 1-on-1 dengan user tertentu
    public function index(Request $request, $receiverId)
    {
        $currentUserId = Auth::id() ?? $request->input('sender_id') ?? 1;

        if ($currentUserId) {
            UserChat::where('sender_id', $receiverId)
                ->where('receiver_id', $currentUserId)
                ->where('is_read', false)
                ->update(['is_read' => true]);
        }

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

    // Kirim pesan direct 1-on-1 ke user lain (bisa kirim pesan & lampiran foto/file)
    public function store(Request $request)
    {
        $all = $request->all();
        $receiverId = $all['receiver_id'] ?? $request->input('receiver_id') ?? $request->json('receiver_id');
        $message = trim(($all['message'] ?? $request->input('message') ?? $request->json('message')) ?: '');
        $senderId = Auth::id() ?? $all['sender_id'] ?? $request->input('sender_id') ?? $request->json('sender_id') ?? 1;

        if (empty($receiverId)) {
            return response()->json(['message' => 'Receiver ID is required.', 'errors' => ['receiver_id' => ['Receiver ID is required.']]], 422);
        }

        if (empty($message) && !$request->hasFile('file')) {
            return response()->json(['message' => 'Pesan atau file wajib diisi.'], 422);
        }

        $attachment = null;
        $attachmentType = null;
        $attachmentName = null;

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $attachmentName = $file->getClientOriginalName();
            $mime = $file->getMimeType();

            if (str_starts_with($mime, 'image/')) {
                $attachmentType = 'image';
            } else {
                $attachmentType = 'file';
            }

            $base64 = 'data:' . $mime . ';base64,' . base64_encode(file_get_contents($file->getRealPath()));
            $attachment = $base64;
        }

        $chat = UserChat::create([
            'sender_id' => $senderId,
            'receiver_id' => $receiverId,
            'message' => $message,
            'attachment' => $attachment,
            'attachment_type' => $attachmentType,
            'attachment_name' => $attachmentName,
        ]);

        $chat->load(['sender:id,name,avatar', 'receiver:id,name,avatar']);

        return response()->json($chat, 201);
    }

    // Total pesan unread untuk user saat ini
    public function unreadCount()
    {
        $count = UserChat::where('receiver_id', Auth::id())
            ->where('is_read', false)
            ->count();

        return response()->json(['unread' => $count]);
    }
}
