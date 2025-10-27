<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\ChannelService;
use Illuminate\Support\Facades\Log;

class ChannelController extends Controller
{
    protected $channelService;

    public function __construct(ChannelService $channelService)
    {
        $this->channelService = $channelService;
    }

    /**
     * Lấy danh sách tất cả channel
     */
    public function index(Request $request)
    {
        $channels = $this->channelService->getAll($request->user()->id);
        return response()->json($channels);
    }

    /**
     * Lấy chi tiết 1 channel
     */
    public function show($id)
    {
        $channel = $this->channelService->getById($id);
        return response()->json($channel);
    }

    /**
     * Tạo mới channel
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|in:public,private',
            'created_by' => 'required|exists:users,id',
        ]);

        $channel = $this->channelService->create($data);
        return response()->json(['message' => 'Channel created', 'data' => $channel], 201);
    }

    /**
     * Cập nhật channel
     */
    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'type' => 'in:public,private',
        ]);

        $channel = $this->channelService->update($id, $data);
        return response()->json(['message' => 'Channel updated', 'data' => $channel]);
    }

    /**
     * Xóa channel
     */
    public function destroy($id)
    {
        try {
            $this->channelService->delete($id);
            return response()->json(['message' => 'Channel deleted']);
        } catch (\Exception $e) {
            Log::error('ChannelController@destroy: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to delete channel'], 500);
        }
    }
}
