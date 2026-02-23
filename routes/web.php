<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

// ✅ Tambahan: redirect ke dashboard kalau sudah login
Route::get('/login', function () {
    return Inertia::render('Login');
})->middleware('guest')->name('login');

// ✅ Fix: 'Dashboard' kapital agar Inertia nemu Pages/Dashboard.tsx
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/settings.php';