<?php

use App\Http\Controllers\Api\AdminFlightFareController;
use App\Http\Controllers\Api\AdminOfferController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\FlightFareController;
use App\Http\Controllers\Api\OfferController;
use Illuminate\Support\Facades\Route;

Route::get('/offers', [OfferController::class, 'index']);
Route::get('/offers/{offer:slug}', [OfferController::class, 'show']);
Route::get('/fares', [FlightFareController::class, 'index']);

Route::post('/admin/login', [AuthController::class, 'login']);

Route::middleware('auth.api')->prefix('admin')->group(function (): void {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/offers', [AdminOfferController::class, 'index']);
    Route::post('/offers', [AdminOfferController::class, 'store']);
    Route::get('/offers/{id}', [AdminOfferController::class, 'show'])->whereNumber('id');
    Route::match(['put', 'post'], '/offers/{id}', [AdminOfferController::class, 'update'])->whereNumber('id');
    Route::delete('/offers/{id}', [AdminOfferController::class, 'destroy'])->whereNumber('id');

    Route::get('/fares', [AdminFlightFareController::class, 'index']);
    Route::post('/fares', [AdminFlightFareController::class, 'store']);
    Route::get('/fares/{id}', [AdminFlightFareController::class, 'show'])->whereNumber('id');
    Route::put('/fares/{id}', [AdminFlightFareController::class, 'update'])->whereNumber('id');
    Route::delete('/fares/{id}', [AdminFlightFareController::class, 'destroy'])->whereNumber('id');
});
