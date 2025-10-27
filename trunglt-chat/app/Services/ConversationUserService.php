<?php

namespace App\Services;

use App\Models\ConversationUser;
use App\Models\User;
use App\Events\UserJoinedConversation;
use App\Events\UserLeftConversation;
use Illuminate\Support\Facades\Log;

class ConversationUserService
{
    /**
     * Lấy danh sách user trong 1 conversation
     */
    public function getUsers($conversationId)
    {
        return ConversationUser::with('user')
            ->where('conversation_id', $conversationId)
            ->get()
            ->pluck('user');
    }

    /**
     * Thêm user vào conversation
     */
    public function addUser(array $data)
    {
        $exists = ConversationUser::where('conversation_id', $data['conversation_id'])
            ->where('user_id', $data['user_id'])
            ->exists();

        if ($exists) {
            throw new \Exception('User already in conversation');
        }

        $conversationUser = ConversationUser::create([
            'conversation_id' => $data['conversation_id'],
            'user_id' => $data['user_id'],
        ]);

        // Bắn event realtime
        broadcast(new UserJoinedConversation($conversationUser))->toOthers();

        return $conversationUser;
    }

    /**
     * Xóa user khỏi conversation
     */
    public function removeUser(array $data)
    {
        $conversationUser = ConversationUser::where('conversation_id', $data['conversation_id'])
            ->where('user_id', $data['user_id'])
            ->first();

        if (!$conversationUser) {
            throw new \Exception('User not found in conversation');
        }

        $conversationUser->delete();

        // Event khi user rời nhóm
        broadcast(new UserLeftConversation($conversationUser))->toOthers();

        return true;
    }
}
