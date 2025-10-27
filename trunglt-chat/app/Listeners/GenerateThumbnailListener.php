<?php
namespace App\Listeners;

use App\Events\AttachmentUploaded;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Storage;

class GenerateThumbnailListener implements ShouldQueue
{
    public function handle(AttachmentUploaded $event)
    {
        $attachment = $event->attachment;

        if (str_contains($attachment->file_type, 'image')) {
            // TODO: sinh thumbnail bằng Image Intervention hoặc queue chuyên dụng
            $thumbPath = str_replace('attachments/', 'attachments/thumbs/', $attachment->file_path);
            Storage::disk('s3')->copy($attachment->file_path, $thumbPath);
        }
    }
}
