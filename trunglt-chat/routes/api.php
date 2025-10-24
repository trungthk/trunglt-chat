<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\ChannelController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\NotificationController;

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
});
