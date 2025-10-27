<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\PresenceService;
use Illuminate\Http\Request;

class PresenceController extends Controller
{
    public function __construct(protected PresenceService $service) {}

    public function index()
    {
        return response()->json($this->service->getOnlineUsers());
    }

    public function update(Request $request)
    {
        $this->service->updateStatus($request->user()->id, $request->input('status', 'online'));
        return response()->json(['message' => 'Presence updated']);
    }
}
