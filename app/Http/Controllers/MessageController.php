<?php
// app/Http/Controllers/MessageController.php

namespace App\Http\Controllers;

use App\Mail\NewMessageMail;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MessageController extends Controller
{
    /**
     * POST /api/messages
     * Public — kirim pesan dari contact form
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:100',
            'email'   => 'required|email|max:255',
            'subject' => 'nullable|string|max:200',
            'message' => 'required|string|max:3000',
        ]);

        $message = Message::create([
            ...$validated,
            'ip_address' => $request->ip(),
        ]);

        // Kirim email notifikasi
        try {
            Mail::to('naooolaf@gmail.com')->send(new NewMessageMail($message));
        } catch (\Exception $e) {
            // Tetap return success meskipun email gagal
            \Log::error('Mail failed: ' . $e->getMessage());
        }

        return response()->json([
            'success' => true,
            'message' => 'Pesan berhasil terkirim!',
        ]);
    }

    /**
     * GET /api/messages
     * Protected — list semua pesan (dashboard)
     */
    public function index(Request $request)
    {
        $query = Message::latest();

        if ($request->has('unread') && $request->boolean('unread')) {
            $query->where('is_read', false);
        }

        return response()->json($query->paginate(20));
    }

    /**
     * PATCH /api/messages/{id}/read
     * Protected — tandai pesan sudah dibaca
     */
    public function markRead(Message $message)
    {
        $message->update([
            'is_read' => true,
            'read_at' => now(),
        ]);

        return response()->json($message);
    }

    /**
     * PATCH /api/messages/read-all
     * Protected — tandai semua pesan sudah dibaca
     */
    public function markAllRead()
    {
        Message::where('is_read', false)->update([
            'is_read' => true,
            'read_at' => now(),
        ]);

        return response()->json(['success' => true]);
    }

    /**
     * DELETE /api/messages/{id}
     * Protected — hapus pesan
     */
    public function destroy(Message $message)
    {
        $message->delete();
        return response()->json(['success' => true]);
    }

    /**
     * GET /api/messages/stats
     * Protected — statistik pesan
     */
    public function stats()
    {
        return response()->json([
            'total'  => Message::count(),
            'unread' => Message::where('is_read', false)->count(),
            'today'  => Message::whereDate('created_at', today())->count(),
        ]);
    }
    public function reply(Request $request, Message $message)
{
    $request->validate([
        'body' => 'required|string|min:1|max:5000',
    ]);

    try {
        Mail::to($message->email, $message->name)
            ->send(new ReplyMail($message, $request->body));

        if (!$message->is_read) {
            $message->update(['is_read' => true, 'read_at' => now()]);
        }

        return response()->json(['success' => true, 'message' => 'Balasan berhasil dikirim']);
    } catch (\Exception $e) {
        return response()->json(['success' => false, 'message' => 'Gagal mengirim: ' . $e->getMessage()], 500);
    }
}









}