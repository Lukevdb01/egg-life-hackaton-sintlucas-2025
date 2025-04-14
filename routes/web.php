<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    //hier komt alle authenticated routes
    Route::get('dashboard', [DashboardController::class, 'overview'])->name('dashboard');
});

//require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
