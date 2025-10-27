<?php

namespace App\Jobs;

use App\Notifications\ConversationNotification;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class NotifyConversationUsers implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $conversation;
    protected $message;

    public function __construct($conversation, $message)
    {
        $this->conversation = $conversation;
        $this->message = $message;
    }

    public function handle()
    {
        foreach ($this->conversation->users as $user) {
            if ($user->id !== $this->message->sender_id) {
                $user->notify(new ConversationNotification($this->conversation, $this->message));
            }
        }
    }
}
