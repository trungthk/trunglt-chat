<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ConversationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ConversationController extends Controller
{
    public function __construct(protected ConversationService $conversationService) {}

    /**
     * Get all conversations for the authenticated user.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        return response()->json($this->conversationService->getAll($request->user()->id));
    }

    /**
     * Get a single conversation by its ID.
     *
     * @param [type] $id
     * @return JsonResponse
     */
    public function show($id): JsonResponse
    {
        return response()->json($this->conversationService->getById($id));
    }

    /**
     * Create a new conversation.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => 'nullable|string',
            'type' => 'required|string|in:private,group',
            'user_ids' => 'array'
        ]);
        return response()->json($this->conversationService->create($request->user()->id, $data));
    }

    /**
     * Add a user to a conversation.
     *
     * @param Request $request
     * @param [type] $id
     * @return JsonResponse
     */
    public function update(Request $request, $id): JsonResponse
    {
        $data = $request->validate(['name' => 'string|nullable']);
        return response()->json($this->conversationService->update($id, $data));
    }

    /**
     * Remove a conversation.
     *
     * @param [type] $id
     * @return JsonResponse
     */
    public function destroy($id): JsonResponse
    {
        $this->conversationService->delete($id);
        return response()->json(['message' => 'Deleted']);
    }
}
