<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\PrivateChannel;

class MessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $user;
    public $message;
    public $user_id;
    public $is_admin;

    public function __construct($user, $message, $user_id = null, $is_admin = false)
    {
        $this->user = $user;
        $this->message = $message;
        $this->user_id = $user_id;
        $this->is_admin = $is_admin;
    }

    public function broadcastOn()
    {
        return new PrivateChannel('chat');
    }

    public function broadcastAs()
    {
        return 'message.sent';
    }

    public function broadcastWith()
    {
        return [
            'user' => $this->user,
            'message' => $this->message,
            'user_id' => $this->user_id,
            'is_admin' => $this->is_admin,
        ];
    }
}
