<?php
namespace App\Repositories;

use App\Models\Notification;

class NotificationRepository
{
    public function allForUser($userId)
    {
        return Notification::where('user_id', $userId)->latest()->paginate(30);
    }

    public function create(array $data)
    {
        return Notification::create($data);
    }

    public function markAsRead(array $ids, $userId)
    {
        return Notification::where('user_id', $userId)->whereIn('id', $ids)->update(['read_at' => now()]);
    }
}
