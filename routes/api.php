<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\DoctorController;
use App\Models\User;
use Carbon\Carbon;
use App\Notifications\VerifyEmailNotification;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::get('/doctors', [DoctorController::class, 'search']);
Route::get('/doctors-by-service', [DoctorController::class, 'getDoctorsByService']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/appointments', [AppointmentController::class, 'appointment']);

});

// Custom Email Verification Route
Route::get('/email/verify/{id}', function ($id) {
    $user = User::findOrFail($id);

    if (!$user->email_verified_at) {
        $user->email_verified_at = Carbon::now();
        $user->save();
    }

    return response()->json(['message' => 'Email verified successfully. You can now log in.']);
})->name('verification.verify');

// Resend Verification Email
Route::post('/email/resend', function (Request $request) {
    $user = $request->user();

    if ($user) {
        $user->notify(new VerifyEmailNotification());
        return response()->json(['message' => 'Verification email resent!']);
    }

    return response()->json(['error' => 'User not found'], 404);
})->middleware(['auth:sanctum', 'throttle:6,1'])->name('verification.resend');

// Protect routes for verified users
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

