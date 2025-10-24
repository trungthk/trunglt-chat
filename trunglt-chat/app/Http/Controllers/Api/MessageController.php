<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Models\Channel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Events\MessageSent;

class MessageController extends Controller
{
    public function index(Channel $channel)
    {
        $messages = $channel->messages()->with('user')->latest()->paginate(50);
        return response()->json($messages);
    }

    public function store(Request $request, Channel $channel)
    {
        $validated = $request->validate([
            'content' => 'nullable|string',
            'type' => 'required|string|in:text,image,file,video',
            'media_url' => 'nullable|string',
        ]);

        $message = Message::create([
            'channel_id' => $channel->id,
            'user_id' => Auth::id(),
            'content' => $validated['content'] ?? '',
            'type' => $validated['type'],
            'media_url' => $validated['media_url'] ?? null,
        ]);

        broadcast(new MessageSent($message))->toOthers();

        return response()->json($message, 201);
    }

    public function update(Request $request, Message $message)
    {
        $this->authorize('update', $message);
        $message->update($request->only('content'));
        return response()->json($message);
    }

    public function destroy(Message $message)
    {
        $this->authorize('delete', $message);
        $message->delete();
        return response()->json(['message' => 'Message deleted']);
    }
}
