<?php
// routes/web.php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Controllers\TechStackController;
use App\Http\Controllers\HeroProfileController;
use App\Http\Controllers\ProjectController;

// ── Public Pages ──────────────────────────────────────────────────────────────
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

// ── API ───────────────────────────────────────────────────────────────────────
Route::prefix('api')->group(function () {

    // ── Public ──
    Route::get('/tech-stacks/visible', [TechStackController::class, 'indexVisible']);
    Route::get('/tech-stacks',         [TechStackController::class, 'index']);
    Route::get('/hero',                [HeroProfileController::class, 'show']);

    // Projects publik
    Route::get('/projects',        [ProjectController::class, 'index']);
    Route::get('/projects/{slug}', [ProjectController::class, 'show']);

    // ── Protected ──
    Route::middleware(['auth'])->group(function () {
        // Tech Stack
        Route::post  ('/tech-stacks',                    [TechStackController::class, 'store']);
        Route::put   ('/tech-stacks/{techStack}',        [TechStackController::class, 'update']);
        Route::delete('/tech-stacks/{techStack}',        [TechStackController::class, 'destroy']);
        Route::patch ('/tech-stacks/{techStack}/toggle', [TechStackController::class, 'toggleVisibility']);

        // Hero
        Route::put('/hero', [HeroProfileController::class, 'update']);

        // Projects (admin CRUD)
        Route::get   ('/admin/projects',                  [ProjectController::class, 'adminIndex']);
        Route::post  ('/admin/projects',                  [ProjectController::class, 'store']);
        Route::post  ('/admin/projects/upload-image',     [ProjectController::class, 'uploadImage']);
        Route::put   ('/admin/projects/{project}',        [ProjectController::class, 'update']);
        Route::delete('/admin/projects/{project}',        [ProjectController::class, 'destroy']);
        Route::patch ('/admin/projects/{project}/toggle', [ProjectController::class, 'toggleVisibility']);
    });
});

require __DIR__.'/settings.php';