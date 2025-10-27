<?php
namespace App\Listeners;

use App\Events\UserPresenceUpdated;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class BroadcastPresenceListener implements ShouldBroadcast
{
    public function __construct(public UserPresenceUpdated $event) {}

    public function broadcastOn()
    {
        return ['presence'];
    }

    public function broadcastWith()
    {
        return [
            'user_id' => $this->event->userId,
            'status' => $this->event->status,
        ];
    }
}
