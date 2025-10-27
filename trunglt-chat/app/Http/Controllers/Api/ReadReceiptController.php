<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ReadReceiptService;
use Illuminate\Http\Request;

class ReadReceiptController extends Controller
{
    public function __construct(protected ReadReceiptService $service) {}

    public function markAsRead($messageId, Request $request)
    {
        $this->service->markAsRead($messageId, $request->user()->id);
        return response()->json(['message' => 'Marked as read']);
    }

    public function listReaders($messageId)
    {
        return response()->json($this->service->getReaders($messageId));
    }
}
