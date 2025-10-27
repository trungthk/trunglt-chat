<?php
namespace App\Repositories;

use App\Models\ReadReceipt;

class ReadReceiptRepository
{
    public function markAsRead($messageId, $userId)
    {
        return ReadReceipt::updateOrCreate(
            ['message_id' => $messageId, 'user_id' => $userId],
            ['read_at' => now()]
        );
    }

    public function getReaders($messageId)
    {
        return ReadReceipt::where('message_id', $messageId)->with('user')->get();
    }
}
