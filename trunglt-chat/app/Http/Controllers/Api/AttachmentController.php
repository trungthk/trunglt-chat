<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\AttachmentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AttachmentController extends Controller
{
    public function __construct(protected AttachmentService $attachmentService) {}

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'file' => 'required|file|max:20480', // 20MB
            'message_id' => 'required|integer'
        ]);
        return response()->json($this->attachmentService->upload($request->file('file'), $request->message_id));
    }

    /**
     * Display the specified resource.
     *
     * @param [type] $id
     * @return JsonResponse
     */
    public function show($id): JsonResponse
    {
        return response()->json($this->attachmentService->getById($id));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param [type] $id
     * @return JsonResponse
     */
    public function destroy($id): JsonResponse
    {
        $this->attachmentService->delete($id);
        return response()->json(['message' => 'Deleted']);
    }
}
