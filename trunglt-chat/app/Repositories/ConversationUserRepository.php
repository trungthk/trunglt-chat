<?php

namespace App\Repositories;

use App\Models\ConversationUser;

class ConversationUserRepository
{
    public function create(array $data)
    {
        return ConversationUser::create($data);
    }

    public function deleteByConversation($conversationId)
    {
        return ConversationUser::where('conversation_id', $conversationId)->delete();
    }
}
