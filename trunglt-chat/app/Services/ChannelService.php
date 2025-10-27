<?php

namespace App\Services;

use App\Models\Channel;
use Illuminate\Support\Collection;

class ChannelService
{
    /**
     * Get all channels
     *
     * @return Collection
     */
    public function getAll(): Collection
    {
        return Channel::query()
            ->orderByDesc('created_at')
            ->get();
    }

    /**
     * Get channel by ID
     *
     * @param [type] $id
     * @return Channel
     */
    public function getById($id): Channel
    {
        return Channel::findOrFail($id);
    }

    /**
     * Update channel information
     *
     * @param [type] $id
     * @param array $data
     * @return Channel
     */
    public function update($id, array $data): Channel
    {
        $channel = Channel::findOrFail($id);
        $channel->update($data);
        return $channel;
    }
}
