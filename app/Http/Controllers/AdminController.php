<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Chat;

class AdminController extends Controller
{
    public function index(Request $request)
    {
        $admin = $request->user();

        if (!$admin) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized. Please log in as an admin.',
            ], 401);
        }

        // Dashboard stats
        $userCount = \App\Models\User::count();
        $chatCount = \App\Models\Chat::count();

        // ✅ Get the latest message for each user
        $recentMessages = \App\Models\Chat::select('id', 'user_id', 'message', 'created_at')
            ->with('user:id,name')
            ->latest('created_at')
            ->get()
            ->unique('user_id')
            ->values();

        return response()->json([
            'status' => 'success',
            'data' => [
                'admin' => [
                    'id' => $admin->id,
                    'name' => $admin->name,
                    'email' => $admin->email,
                ],
                'total_users' => $userCount,
                'total_messages' => $chatCount,
                'recent_messages' => $recentMessages,
            ],
        ]);
    }
}
