<?php
namespace App\Repositories;

use App\Models\Channel;

class ChannelRepository
{
    public function allByUser($userId)
    {
        return Channel::where('user_id', $userId)->get();
    }

    public function create(array $data)
    {
        return Channel::create($data);
    }

    public function update(Channel $channel, array $data)
    {
        $channel->update($data);
        return $channel;
    }

    public function delete(Channel $channel)
    {
        return $channel->delete();
    }
}
