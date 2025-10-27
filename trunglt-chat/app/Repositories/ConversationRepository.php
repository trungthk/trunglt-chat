<?php
namespace App\Repositories;

use App\Models\Conversation;

class ConversationRepository
{
    public function allForUser($userId)
    {
        return Conversation::whereHas('users', fn($q) => $q->where('user_id', $userId))
                ->with(['latestMessage', 'users'])
                ->orderByDesc('updated_at')
                ->get();
    }

    public function find($id, array $relations = [])
    {
        return Conversation::with($relations)->findOrFail($id);
    }

    public function create(array $data)
    {
        $conversation = Conversation::create($data);
        $conversation->users()->attach($data['user_ids'], ['joined_at' => now()]);
        return $conversation;
    }

    public function update($id, array $data)
    {
        $conv = $this->find($id);
        $conv->update($data);
        return tap($conv);
    }

    public function delete($id)
    {
        return Conversation::destroy($id);
    }

    public function addUser(Conversation $conversation, int $userId, string $role = 'member')
    {
        $conversation->users()->syncWithoutDetaching([$userId => ['role' => $role, 'joined_at' => now()]]);
    }
}
