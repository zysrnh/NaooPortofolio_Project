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
use App\Http\Controllers\MessageController;
use App\Http\Controllers\VisitorController;
use App\Http\Controllers\GuestbookController;
use App\Http\Controllers\SupporterController;

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

Route::get('/resume', function () {
    return Inertia::render('Resume');
})->name('resume');

// Public API for Supporters
Route::get('/api/supporters', [SupporterController::class, 'index']);

// ── NEW: Contact Page ─────────────────────────────────────────────────────────
Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact.page');

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

    // ── NEW: Messages (public — kirim pesan) ──────────────────────────────────
    Route::post('/messages', [MessageController::class, 'store']);

    // ── Visitor Tracking (public — called from frontend) ─────────────────────
    Route::post('/track', [VisitorController::class, 'track']);

    // ── Guestbook (public) ────────────────────────────────────────────────────
    Route::get ('/guestbook', [GuestbookController::class, 'index']);
    Route::post('/guestbook', [GuestbookController::class, 'store']);

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

        // Messages (admin) — urutan penting: static routes dulu sebelum {message}
        Route::get   ('/messages/stats',              [MessageController::class, 'stats']);
        Route::patch ('/messages/read-all',           [MessageController::class, 'markAllRead']);
        Route::get   ('/messages',                    [MessageController::class, 'index']);
        Route::patch ('/messages/{message}/read',     [MessageController::class, 'markRead']);
        Route::post  ('/messages/{message}/reply',    [MessageController::class, 'reply']);
        Route::delete('/messages/{message}',          [MessageController::class, 'destroy']);

        // Projects (admin CRUD)
        Route::get   ('/admin/projects',                  [ProjectController::class, 'adminIndex']);
        Route::post  ('/admin/projects',                  [ProjectController::class, 'store']);
        Route::post  ('/admin/projects/upload-image',     [ProjectController::class, 'uploadImage']);
        Route::put   ('/admin/projects/{project}',        [ProjectController::class, 'update']);
        Route::delete('/admin/projects/{project}',        [ProjectController::class, 'destroy']);
        Route::patch ('/admin/projects/{project}/toggle', [ProjectController::class, 'toggleVisibility']);

        // Visitors (admin only)
        Route::get   ('/visitors/stats',  [VisitorController::class, 'stats']);
        Route::delete('/visitors/clear',  [VisitorController::class, 'clear']);

        // Guestbook (admin only)
        Route::get   ('/admin/guestbook',                [GuestbookController::class, 'adminIndex']);
        Route::patch ('/admin/guestbook/{guestbook}',    [GuestbookController::class, 'toggleVisibility']);
        Route::delete('/admin/guestbook/{guestbook}',    [GuestbookController::class, 'destroy']);

        // Supporters (admin only)
        Route::get   ('/admin/supporters',               [SupporterController::class, 'adminIndex']);
        Route::post  ('/admin/supporters',               [SupporterController::class, 'store']);
        Route::post  ('/admin/supporters/{supporter}',   [SupporterController::class, 'update']); // Use POST for multipart update
        Route::delete('/admin/supporters/{supporter}',   [SupporterController::class, 'destroy']);
    });
});

require __DIR__.'/settings.php';