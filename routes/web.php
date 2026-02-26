<?php
// routes/web.php  — FULL (replace file lama)

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Controllers\TechStackController;
use App\Http\Controllers\HeroProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\AboutProfileController;

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

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

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

    // ── Public ────────────────────────────────────────────────────────────────
    Route::get('/tech-stacks/visible', [TechStackController::class,     'indexVisible']);
    Route::get('/tech-stacks',         [TechStackController::class,     'index']);
    Route::get('/hero',                [HeroProfileController::class,   'show']);
    Route::get('/about',               [AboutProfileController::class,  'show']);

    // About public sub-routes
    Route::get('/about/featured-stacks',      [AboutProfileController::class, 'featuredStacks']);
    Route::get('/about/experiences',          [AboutProfileController::class, 'indexExperiences']);
    Route::get('/about/case-studies',         [AboutProfileController::class, 'indexCaseStudies']);
    Route::get('/about/availability',         [AboutProfileController::class, 'getAvailability']);
    Route::get('/about/stats',                [AboutProfileController::class, 'getStats']);

    Route::get('/contact',             [ContactController::class,       'index']);
    Route::get('/contact/visible',     [ContactController::class,       'indexVisible']);

    Route::get('/projects',            [ProjectController::class,       'index']);
    Route::get('/projects/{slug}',     [ProjectController::class,       'show']);

    // ── Protected ─────────────────────────────────────────────────────────────
    Route::middleware(['auth'])->group(function () {

        // Tech Stack
        Route::post  ('/tech-stacks',                    [TechStackController::class, 'store']);
        Route::put   ('/tech-stacks/{techStack}',        [TechStackController::class, 'update']);
        Route::delete('/tech-stacks/{techStack}',        [TechStackController::class, 'destroy']);
        Route::patch ('/tech-stacks/{techStack}/toggle', [TechStackController::class, 'toggleVisibility']);

        // Hero (text = PUT, photo upload = POST /hero/photo)
        Route::put  ('/hero',        [HeroProfileController::class, 'update']);
        Route::post ('/hero/photo',  [HeroProfileController::class, 'uploadPhoto']);

        // About — capabilities + featured stacks
        Route::put('/about', [AboutProfileController::class, 'update']);

        // About — experiences CRUD
        Route::post  ('/about/experiences',        [AboutProfileController::class, 'storeExperience']);
        Route::put   ('/about/experiences/{id}',   [AboutProfileController::class, 'updateExperience']);
        Route::delete('/about/experiences/{id}',   [AboutProfileController::class, 'destroyExperience']);

        // About — case studies CRUD
        Route::post  ('/about/case-studies',       [AboutProfileController::class, 'storeCaseStudy']);
        Route::put   ('/about/case-studies/{id}',  [AboutProfileController::class, 'updateCaseStudy']);
        Route::delete('/about/case-studies/{id}',  [AboutProfileController::class, 'destroyCaseStudy']);

        // About — availability
        Route::put('/about/availability', [AboutProfileController::class, 'updateAvailability']);

        // About — stats (By the Numbers)
        Route::put('/about/stats',        [AboutProfileController::class, 'updateStats']);

        // Contact
        Route::put('/contact', [ContactController::class, 'bulkUpdate']);

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