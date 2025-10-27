<?php

namespace App\Events;

use App\Models\ConversationUser;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class UserJoinedConversation implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $conversationUser;

    public function __construct(ConversationUser $conversationUser)
    {
        $this->conversationUser = $conversationUser;
    }

    public function broadcastOn()
    {
        return new Channel('conversation.' . $this->conversationUser->conversation_id);
    }
}
