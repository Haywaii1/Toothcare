<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\DoctorController;
use App\Models\User;
use Carbon\Carbon;
use App\Notifications\VerifyEmailNotification;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminAuthController;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::get('/doctors', [DoctorController::class, 'search']);
Route::get('/doctors-by-service', [DoctorController::class, 'getDoctorsByService']);
Route::post('/contact', [ContactController::class, 'store']);
Route::get('/team', [TeamController::class, 'index']); // Get all members
Route::get('/team/{id}', [TeamController::class, 'show']); // Get single member by ID
Route::get('/seed-team', [TeamController::class, 'seedTeamMembers']);
Route::post('/subscribe', [NewsletterController::class, 'subscribe']);
// Route::get('/doctors', [DoctorController::class, 'index']);
Route::get('/api/seed-team', [TeamController::class, 'seedTeamMembers']);



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
Route::middleware(['auth:api'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/chat/messages', [ChatController::class, 'getMessages']);
    Route::post('/chat/send', [ChatController::class, 'sendMessage']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/admin/messages', [ChatController::class, 'getAllMessages'])
        ->middleware('admin');
});


Route::post('/admin/register', [AdminAuthController::class, 'register']);
Route::post('/admin/login', [AdminAuthController::class, 'login']);

// For users
Route::middleware('auth:sanctum')->get('/chat/messages', [ChatController::class, 'getMyMessages']);

// For admin
Route::middleware('auth:admin')->get('/chat/user/{userId}', [ChatController::class, 'getConversationWithUser']);

Route::middleware('auth:admin')->get('/chat/users', [ChatController::class, 'getAllUsersWithChats']);

Route::middleware('auth:sanctum')->group(function () {
    // Admin: list all conversations (latest message per user)
    Route::get('/chat/conversations', [ChatController::class, 'conversations']); // admin only in practice

    // Get conversation messages for a user (admin or that user)
    Route::get('/chat/{userId}/messages', [ChatController::class, 'getMessages']);

    // Send message (user or admin authenticated)
    Route::post('/chat/send', [ChatController::class, 'sendMessage']);
});

Route::middleware('auth:admin')->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');
});

Route::middleware('auth:admin')->get('/admin/chats', [ChatController::class, 'getAllUsersWithChats']);

Route::middleware('auth:api')->group(function () {
    Route::get('/chat/messages', [ChatController::class, 'getMyMessages']);
    Route::post('/chat/send', [ChatController::class, 'sendMessage']);
});

// For admin
Route::middleware('auth:admin')->group(function () {
    Route::get('/admin/chats', [ChatController::class, 'usersWithChats']);
    Route::get('/admin/chats/{userId}', [ChatController::class, 'getConversationWithUser']);
    Route::post('/admin/chats/send', [ChatController::class, 'sendMessage']);
});

Route::prefix('admin')->middleware('auth:sanctum')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');

    // Chats
    Route::get('/chats', [ChatController::class, 'usersWithChats']); // list users admin chatted with
    Route::get('/chats/{userId}', [ChatController::class, 'getConversationWithUser']);
    Route::post('/chats/send', [ChatController::class, 'sendMessage']);
    Route::get('/chat/{userId}/messages', [ChatController::class, 'getMessages']);
    Route::get('/chat/recent', [ChatController::class, 'recentChats']);
});



