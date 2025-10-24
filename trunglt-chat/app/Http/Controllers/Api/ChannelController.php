<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Channel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChannelController extends Controller
{
    public function index()
    {
        return response()->json(Channel::where('user_id', Auth::id())->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|in:group,private',
        ]);

        $channel = Channel::create([
            'name' => $validated['name'],
            'type' => $validated['type'],
            'user_id' => Auth::id(),
        ]);

        return response()->json($channel, 201);
    }

    public function show(Channel $channel)
    {
        $this->authorize('view', $channel);
        return response()->json($channel);
    }

    public function update(Request $request, Channel $channel)
    {
        $this->authorize('update', $channel);
        $channel->update($request->only('name', 'type'));
        return response()->json($channel);
    }

    public function destroy(Channel $channel)
    {
        $this->authorize('delete', $channel);
        $channel->delete();
        return response()->json(['message' => 'Channel deleted']);
    }
}
