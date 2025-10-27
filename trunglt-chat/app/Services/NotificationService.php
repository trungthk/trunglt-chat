<?php

namespace App\Services;

use App\Repositories\NotificationRepository;
use App\Jobs\SendNotificationJob;

class NotificationService
{
    protected $notifications;

    public function __construct(NotificationRepository $notifications)
    {
        $this->notifications = $notifications;
    }

    public function notify(array $data)
    {
        $notification = $this->notifications->create($data);
        dispatch(new SendNotificationJob($notification));
        return $notification;
    }
}
