<?php

namespace App\Services;

use App\Repositories\MessageRepository;
use App\Events\MessageSent;

class MessageService
{
    protected $messages;

    public function __construct(MessageRepository $messages)
    {
        $this->messages = $messages;
    }

    public function sendMessage(array $data)
    {
        $message = $this->messages->create($data);
        broadcast(new MessageSent($message))->toOthers();

        return $message;
    }
}
