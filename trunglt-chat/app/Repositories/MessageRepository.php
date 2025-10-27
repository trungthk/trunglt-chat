<?php
namespace App\Repositories;

use App\Models\Message;
use App\Models\Channel;

class MessageRepository
{
    public function getMessages(Channel $channel, int $limit = 50)
    {
        return $channel->messages()->with('user')->latest()->paginate($limit);
    }

    public function create(array $data)
    {
        return Message::create($data);
    }

    public function update(Message $message, array $data)
    {
        $message->update($data);
        return $message;
    }

    public function delete(Message $message)
    {
        return $message->delete();
    }
}
