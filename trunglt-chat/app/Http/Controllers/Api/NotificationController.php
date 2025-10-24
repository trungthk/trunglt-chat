<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index()
    {
        $notifications = Notification::where('user_id', Auth::id())
            ->orderByDesc('created_at')
            ->paginate(30);

        return response()->json($notifications);
    }

    public function markAsRead(Request $request)
    {
        $ids = $request->input('ids', []);

        Notification::where('user_id', Auth::id())
            ->whereIn('id', $ids)
            ->update(['read_at' => now()]);

        return response()->json(['message' => 'Marked as read']);
    }
}
