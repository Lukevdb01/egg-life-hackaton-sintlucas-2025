<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EggController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'overview'])->name('dashboard');
    Route::post('/update-love', [EggController::class, 'updateLove'])->name('update-love');
    Route::post('/click-increase-update-love', [EggController::class, 'clickIncreaseUpdateLove'])->name('click-update-love');
    Route::post('/decrease-update-love', [EggController::class, 'decreaseUpdateLove'])->name('decrease-update-love');
    Route::post('/decrease-update-temperature', [EggController::class, 'decreaseUpdateTemperature'])->name('decrease-update-temperature');
    Route::post('/click-increase-update-temperature', [EggController::class, 'clickIncreaseUpdateTemp'])->name('click-increase-update-temperature');
    Route::post('/stage-one', [EggController::class, 'stageOne'])->name('stage-one');
    Route::post('/stage-two', [EggController::class, 'stageTwo'])->name('stage-two');
});

//require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
