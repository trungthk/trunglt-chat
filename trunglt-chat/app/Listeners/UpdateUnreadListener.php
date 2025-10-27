<?php
namespace App\Listeners;

use App\Events\MessageRead;
use App\Models\Conversation;
use Illuminate\Contracts\Queue\ShouldQueue;

class UpdateUnreadListener implements ShouldQueue
{
    public function handle(MessageRead $event)
    {
        $conversation = Conversation::whereHas('messages', function ($q) use ($event) {
            $q->where('id', $event->messageId);
        })->first();

        if ($conversation) {
            // Cập nhật số lượng chưa đọc (có thể lưu cache hoặc DB)
            cache()->forget("conversation_{$conversation->id}_unread_count");
        }
    }
}
