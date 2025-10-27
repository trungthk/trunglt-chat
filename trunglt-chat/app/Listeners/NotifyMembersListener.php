<?php
namespace App\Listeners;

use App\Events\ConversationCreated;
use App\Services\NotificationService;

class NotifyMembersListener
{
    public function __construct(protected NotificationService $notifyService) {}

    public function handle(ConversationCreated $event)
    {
        $conversation = $event->conversation;
        $users = $conversation->users()->pluck('id');
        $this->notifyService->sendToUsers($users, [
            'title' => 'New Conversation',
            'body' => $conversation->name ?? 'You have been added to a new chat group.',
        ]);
    }
}
