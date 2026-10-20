<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LearningController;
Route::middleware('throttle:api')->group(function () {
    Route::get('/catalog', [LearningController::class, 'catalog']);
    Route::middleware('throttle:credentials')->group(function () {
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/login', [AuthController::class, 'login']);
    });
    Route::middleware('api.token')->group(function () {
        Route::get('/progress', [LearningController::class, 'progress']);
        Route::put('/progress', [LearningController::class, 'updateProgress']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });
});
