<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Events\MessageSent;
use App\Events\ChatEnded;


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
            ->get()
            ->map(function ($msg) {
                return [
                    'id' => $msg->id,
                    'message' => $msg->message,
                    'sender_type' => $msg->is_admin ? 'admin' : 'user',
                    'sender_name' => $msg->is_admin ? 'Admin' : optional($msg->user)->name,
                    'created_at' => $msg->created_at,
                ];
            });

        return response()->json(['data' => $messages]);
    }



    public function getConversationWithUser($userId)
    {
        $admin = auth('admin')->user();
        if (!$admin) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $messages = Chat::where('user_id', $userId)
            ->orderBy('created_at', 'asc')
            ->get()
            ->map(function ($msg) {
                return [
                    'id' => $msg->id,
                    'message' => $msg->message,
                    'sender_type' => $msg->is_admin ? 'admin' : 'user',
                    'sender_name' => $msg->is_admin ? 'Admin' : optional($msg->user)->name,
                    'created_at' => $msg->created_at,
                ];
            });

        return response()->json(['data' => $messages]);
    }



    public function sendMessage(Request $request)
    {
        $request->validate([
            'message' => 'required|string',
            'user_id' => 'nullable|exists:users,id',
        ]);

        // Detect if admin or user is sending
        $admin = auth('admin')->user();
        $user  = auth('api')->user();

        if (!$admin && !$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $isAdmin = (bool) $admin;

        if ($isAdmin && !$request->user_id) {
            return response()->json(['message' => 'user_id is required for admin messages'], 422);
        }

        $chat = Chat::create([
            'user_id'  => $isAdmin ? $request->user_id : $user->id,
            'admin_id' => $isAdmin ? $admin->id : null,
            'message'  => $request->message,
            'is_admin' => $isAdmin ? 1 : 0,
        ]);

        event(new MessageSent(
            $isAdmin ? 'Admin' : $user->name,
            $chat->message,
            $chat->user_id,
            $isAdmin
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
                    'user' => [
                        'id' => $lastMessage->user->id ?? null,
                        'name' => $lastMessage->user->name ?? 'Unknown',
                    ],
                    'last_message' => $lastMessage->message ?? '',
                    'time' => $lastMessage->created_at ?? null,
                ];
            });

        return response()->json(['data' => $recent]);
    }

    public function endChat($userId)
{
    try {
        // Make sure admin is authenticated
        $admin = auth('admin')->user();
        if (!$admin) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        event(new ChatEnded($userId));


        // Delete all messages belonging to that user
        Chat::where('user_id', $userId)->delete();

        return response()->json(['message' => 'Chat ended and deleted successfully.']);
    } catch (\Exception $e) {
        Log::error('Error ending chat: ' . $e->getMessage());
        return response()->json(['error' => 'Failed to end chat.'], 500);
    }
}


public function aiHandler(Request $request)
{
    $userId = $request->user_id;
    $message = $request->message;

    // Simulated AI logic:
    $nextQuestion = $this->getNextAiQuestion($userId, $message);

    // Save user's reply
    Chat::create([
        'user_id' => $userId,
        'sender' => 'user',
        'message' => $message
    ]);

    // Save AI response
    Chat::create([
        'user_id' => $userId,
        'sender' => 'ai',
        'message' => $nextQuestion
    ]);

    return response()->json([
        'reply' => $nextQuestion
    ]);
}


}
