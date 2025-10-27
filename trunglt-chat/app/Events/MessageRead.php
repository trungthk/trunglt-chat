<?php
namespace App\Events;

use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageRead
{
    use Dispatchable, SerializesModels;

    public function __construct(public int $messageId, public int $userId) {}
}
