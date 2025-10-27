<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ConversationCreated
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $conversation;

    public function __construct($conversation)
    {
        $this->conversation = $conversation;
    }
}
