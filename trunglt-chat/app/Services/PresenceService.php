<?php
namespace App\Services;

use App\Models\UserPresence;

class PresenceService
{
    public function getOnlineUsers()
    {
        return UserPresence::where('status', 'online')->get();
    }

    public function updateStatus($userId, $status)
    {
        $presence = UserPresence::updateOrCreate(['user_id' => $userId], [
            'status' => $status,
            'last_seen_at' => now(),
        ]);

        broadcast(new \App\Events\UserPresenceUpdated($userId, $status))->toOthers();
        return $presence;
    }
}
