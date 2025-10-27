<?php

namespace App\Providers;

use App\Events\AttachmentUploaded;
use App\Events\ConversationCreated;
use App\Events\MessageRead;
use App\Events\MessageSent;
use App\Listeners\GenerateThumbnailListener;
use App\Listeners\NotifyMembersListener;
use App\Listeners\SendMessageNotification;
use App\Listeners\UpdateUnreadListener;
use Illuminate\Support\ServiceProvider;

class EventServiceProvider extends ServiceProvider
{

    protected $listen = [
        AttachmentUploaded::class => [
            GenerateThumbnailListener::class,
        ],
        ConversationCreated::class => [
            NotifyMembersListener::class,
        ],
        MessageRead::class => [
            UpdateUnreadListener::class,
        ],
        MessageSent::class => [
            SendMessageNotification::class,
        ],
    ];

    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
