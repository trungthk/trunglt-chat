<?php

use App\Http\Controllers\Api\AttachmentController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\ChannelController;
use App\Http\Controllers\Api\ConversationController;
use App\Http\Controllers\Api\ConversationUserController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\PresenceController;
use App\Http\Controllers\Api\ReadReceiptController;

Route::middleware(['auth:api'])->group(function () {
    // CHANNEL
    Route::apiResource('channels', ChannelController::class);

    // MESSAGE
    Route::get('channels/{channel}/messages', [MessageController::class, 'index']);
    Route::post('channels/{channel}/messages', [MessageController::class, 'store']);
    Route::put('messages/{message}', [MessageController::class, 'update']);
    Route::delete('messages/{message}', [MessageController::class, 'destroy']);

    // NOTIFICATION
    Route::get('notifications', [NotificationController::class, 'index']);
    Route::post('notifications/read', [NotificationController::class, 'markAsRead']);

    // Conversations
    Route::get('/conversations', [ConversationController::class, 'index']);
    Route::get('/conversations/{id}', [ConversationController::class, 'show']);
    Route::post('/conversations', [ConversationController::class, 'store']);
    Route::put('/conversations/{id}', [ConversationController::class, 'update']);
    Route::delete('/conversations/{id}', [ConversationController::class, 'destroy']);

    // Conversation Users
    Route::post('/conversations/{id}/users', [ConversationUserController::class, 'addUser']);
    Route::delete('/conversations/{id}/users/{userId}', [ConversationUserController::class, 'removeUser']);
    Route::get('/conversations/{id}/users', [ConversationUserController::class, 'list']);

    // Attachments
    Route::post('/attachments', [AttachmentController::class, 'store']);
    Route::get('/attachments/{id}', [AttachmentController::class, 'show']);
    Route::delete('/attachments/{id}', [AttachmentController::class, 'destroy']);

    // Read Receipts
    Route::post('/messages/{messageId}/read', [ReadReceiptController::class, 'markAsRead']);
    Route::get('/messages/{messageId}/reads', [ReadReceiptController::class, 'listReaders']);

    // Presence (Trạng thái online/offline)
    Route::get('/presence', [PresenceController::class, 'index']);
    Route::post('/presence/update', [PresenceController::class, 'update']);
});
