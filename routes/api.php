<?php

use App\Http\Controllers\MessageController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// ── Public ────────────────────────────────────────────────────────────────────
// Contact form dari homepage
Route::post('/messages', [MessageController::class, 'store']);

// ── Protected (harus login) ───────────────────────────────────────────────────
Route::middleware(['auth'])->group(function () {

    // Stats badge sidebar
    Route::get('/messages/stats', [MessageController::class, 'stats']);

    // Tandai semua terbaca — harus SEBELUM /{message} agar tidak konflik
    Route::patch('/messages/read-all', [MessageController::class, 'markAllRead']);

    // List pesan
    Route::get('/messages', [MessageController::class, 'index']);

    // Tandai satu pesan terbaca
    Route::patch('/messages/{message}/read', [MessageController::class, 'markRead']);

    // Balas pesan via SMTP
    Route::post('/messages/{message}/reply', [MessageController::class, 'reply']);

    // Hapus pesan
    Route::delete('/messages/{message}', [MessageController::class, 'destroy']);

});