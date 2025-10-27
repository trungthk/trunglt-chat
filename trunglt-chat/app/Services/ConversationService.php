<?php
namespace App\Services;

use App\Repositories\ConversationRepository;
use App\Repositories\ConversationUserRepository;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ConversationService
{
    protected $conversationRepo;
    protected $conversationUserRepo;

    public function __construct(
        ConversationRepository $conversationRepo,
        ConversationUserRepository $conversationUserRepo
    ) {
        $this->conversationRepo = $conversationRepo;
        $this->conversationUserRepo = $conversationUserRepo;
    }

    public function createConversation(array $data)
    {
        return $this->conversationRepo->create($data);
    }

    public function addMember($conversation, $userId)
    {
        $this->conversationRepo->addUser($conversation, $userId);
    }

    public function getAll($userId)
    {
        try {
            return $this->conversationRepo->allForUser($userId);
        } catch (Exception $e) {
            Log::error("ConversationService@getAll: " . $e->getMessage());
            return collect();
        }
    }

    public function getById($id)
    {
        try {
            return $this->conversationRepo->find($id, ['users', 'messages.attachments']);
        } catch (Exception $e) {
            Log::error("ConversationService@getById: " . $e->getMessage());
            return null;
        }
    }

    public function create(array $data)
    {
        DB::beginTransaction();

        try {
            // Tạo conversation
            $conversation = $this->conversationRepo->create([
                'name' => $data['name'] ?? null,
                'type' => $data['type'] ?? 'private', // private hoặc group
                'created_by' => $data['created_by'] ?? null,
            ]);

            // Gắn user vào conversation
            if (!empty($data['user_ids'])) {
                foreach ($data['user_ids'] as $userId) {
                    $this->conversationUserRepo->create([
                        'conversation_id' => $conversation->id,
                        'user_id' => $userId,
                    ]);
                }
            }

            DB::commit();
            return $conversation;
        } catch (Exception $e) {
            DB::rollBack();
            Log::error("ConversationService@create: " . $e->getMessage());
            throw $e;
        }
    }

    public function update($id, array $data)
    {
        try {
            return $this->conversationRepo->update($id, $data);
        } catch (Exception $e) {
            Log::error("ConversationService@update: " . $e->getMessage());
            return null;
        }
    }
    
    public function delete($id)
    {
        DB::beginTransaction();

        try {
            // Xóa user liên kết
            $this->conversationUserRepo->deleteByConversation($id);

            // Xóa conversation
            $this->conversationRepo->delete($id);

            DB::commit();
            return true;
        } catch (Exception $e) {
            DB::rollBack();
            Log::error("ConversationService@delete: " . $e->getMessage());
            return false;
        }
    }
}
