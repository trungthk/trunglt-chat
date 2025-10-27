<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\ConversationUserService;
use Illuminate\Http\JsonResponse;

class ConversationUserController extends Controller
{
    protected $conversationUserService;

    public function __construct(ConversationUserService $conversationUserService)
    {
        $this->conversationUserService = $conversationUserService;
    }

    /**
     * Lấy danh sách user trong conversation
     *
     * @param [type] $conversationId
     * @return JsonResponse
     */
    public function index($conversationId): JsonResponse
    {
        $users = $this->conversationUserService->getUsers($conversationId);
        return response()->json($users);
    }

    /**
     * Thêm user vào conversation
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'conversation_id' => 'required|exists:conversations,id',
            'user_id' => 'required|exists:users,id',
        ]);

        $user = $this->conversationUserService->addUser($data);
        return response()->json(['message' => 'User added to conversation', 'data' => $user]);
    }

    /**
     * Xóa user khỏi conversation
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function destroy(Request $request): JsonResponse
    {
        $data = $request->validate([
            'conversation_id' => 'required|exists:conversations,id',
            'user_id' => 'required|exists:users,id',
        ]);

        $this->conversationUserService->removeUser($data);
        return response()->json(['message' => 'User removed from conversation']);
    }
}
