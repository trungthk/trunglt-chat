<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\MessageService;
use App\Events\MessageSent;
use App\Jobs\ProcessMessageAttachments;
use Illuminate\Support\Facades\Log;

class MessageController extends Controller
{
    protected $messageService;

    public function __construct(MessageService $messageService)
    {
        $this->messageService = $messageService;
    }

    /**
     * Lấy danh sách tin nhắn trong 1 conversation
     */
    public function index($conversationId)
    {
        $messages = $this->messageService->getByConversation($conversationId);
        return response()->json($messages);
    }

    /**
     * Gửi tin nhắn mới
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'conversation_id' => 'required|exists:conversations,id',
            'sender_id' => 'required|exists:users,id',
            'content' => 'nullable|string',
            'attachments' => 'array',
        ]);

        $message = $this->messageService->create($data);

        // Gửi event socket
        broadcast(new MessageSent($message))->toOthers();

        // Đưa vào queue xử lý file đính kèm (nếu có)
        if (!empty($data['attachments'])) {
            ProcessMessageAttachments::dispatch($message->id, $data['attachments']);
        }

        return response()->json([
            'message' => 'Message sent successfully',
            'data' => $message
        ], 201);
    }

    /**
     * Xóa 1 tin nhắn
     */
    public function destroy($id)
    {
        try {
            $this->messageService->delete($id);
            return response()->json(['message' => 'Message deleted']);
        } catch (\Exception $e) {
            Log::error('MessageController@destroy: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to delete message'], 500);
        }
    }
}
