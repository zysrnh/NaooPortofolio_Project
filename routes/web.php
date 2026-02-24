<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Controllers\TechStackController;

// ── Public Pages ─────────────────────────────────────────────────────────────
Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/login', function () {
    return Inertia::render('Login');
})->middleware('guest')->name('login');

Route::get('/projects', function () {
    return Inertia::render('Projects');
})->name('projects.index');

Route::get('/projects/{projectId}', function ($projectId) {
    return Inertia::render('ProjectDetail', ['projectId' => $projectId]);
})->name('projects.show');

// ── Protected Pages ───────────────────────────────────────────────────────────
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
});

// ── Auth Actions ──────────────────────────────────────────────────────────────
Route::post('/logout', function () {
    Auth::logout();
    request()->session()->invalidate();
    request()->session()->regenerateToken();
    return redirect('/');
})->middleware('auth')->name('logout');

// ── API: Tech Stack ───────────────────────────────────────────────────────────
Route::prefix('api')->group(function () {
    // Public — homepage bisa fetch tanpa login
    Route::get('/tech-stacks', [TechStackController::class, 'index']);

    // Protected — create, update, delete butuh login
    Route::middleware(['auth'])->group(function () {
        Route::post  ('/tech-stacks',             [TechStackController::class, 'store']);
        Route::put   ('/tech-stacks/{techStack}', [TechStackController::class, 'update']);
        Route::delete('/tech-stacks/{techStack}', [TechStackController::class, 'destroy']);
    });
});

require __DIR__.'/settings.php';