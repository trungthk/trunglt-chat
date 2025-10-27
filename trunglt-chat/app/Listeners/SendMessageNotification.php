<?php

namespace App\Listeners;

use App\Events\MessageSent;
use App\Services\NotificationService;

class SendMessageNotification
{
    protected $service;

    public function __construct(NotificationService $service)
    {
        $this->service = $service;
    }

    public function handle(MessageSent $event)
    {
        $this->service->notify([
            'user_id' => $event->message->channel->user_id,
            'type' => 'message_received',
            'data' => [
                'message_id' => $event->message->id,
                'content' => $event->message->content,
            ],
        ]);
    }
}
