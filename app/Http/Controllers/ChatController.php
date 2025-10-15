<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Events\MessageSent;

class ChatController extends Controller
{
    public function getMyMessages()
    {
        $user = auth('api')->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $messages = Chat::where('user_id', $user->id)
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json($messages);
    }

    public function getConversationWithUser($userId)
    {
        $admin = auth('admin')->user();
        if (!$admin) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $messages = Chat::where('user_id', $userId)
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json($messages);
    }

    public function sendMessage(Request $request)
    {
        $request->validate([
            'message' => 'required|string',
            'user_id' => 'nullable|exists:users,id',
        ]);

        $user = auth('api')->user() ?? auth('admin')->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $isAdmin = $user instanceof \App\Models\Admin;

        if ($isAdmin && !$request->user_id) {
            return response()->json(['message' => 'user_id is required for admin messages'], 422);
        }

        $chat = Chat::create([
            'user_id'  => $isAdmin ? $request->user_id : $user->id,
            'admin_id' => $isAdmin ? $user->id : null,
            'message'  => $request->message,
            'is_admin' => $isAdmin ? 1 : 0,
        ]);

        event(new MessageSent(
            $isAdmin ? 'Admin' : $user->name,
            $chat->message
        ));

        return response()->json([
            'status' => 'success',
            'data' => $chat,
        ], 201);
    }

    public function usersWithChats()
    {
        $users = User::whereHas('chats')->with(['chats' => function ($query) {
            $query->latest()->limit(1);
        }])->get();

        return response()->json($users);
    }

    public function conversations()
    {
        $latestPerUser = Chat::select('user_id', DB::raw('MAX(created_at) as last_at'))
            ->whereNotNull('user_id')
            ->groupBy('user_id')
            ->orderByDesc('last_at')
            ->get()
            ->map(function ($c) {
                $last = Chat::where('user_id', $c->user_id)
                    ->latest('created_at')
                    ->first();

                return [
                    'user_id' => $c->user_id,
                    'last_message' => $last->message ?? '',
                    'last_at' => $last->created_at ?? null,
                    'user' => $last->user ? [
                        'id' => $last->user->id,
                        'name' => $last->user->name
                    ] : null
                ];
            });

        return response()->json($latestPerUser);
    }

    public function getMessages($userId)
    {
        try {
            $messages = Chat::where('user_id', $userId)
                ->orderBy('created_at', 'asc')
                ->get();

            return response()->json($messages);
        } catch (\Exception $e) {
            Log::error('Error fetching messages: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to load messages'], 500);
        }
    }

    public function recentChats()
    {
        $recent = Chat::select('user_id', DB::raw('MAX(created_at) as latest_time'))
            ->groupBy('user_id')
            ->orderByDesc('latest_time')
            ->get()
            ->map(function ($chat) {
                $lastMessage = Chat::where('user_id', $chat->user_id)
                    ->latest('created_at')
                    ->first();
                return [
                    'user' => $lastMessage->user,
                    'last_message' => $lastMessage->message ?? '',
                    'time' => $lastMessage->created_at ?? null,
                ];
            });

        return response()->json($recent);
    }
}
