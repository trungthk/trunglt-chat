<?php

namespace App\Jobs;

use App\Services\AttachmentService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class ProcessMessageAttachments implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $messageId;
    protected $attachments;

    /**
     * @param int $messageId
     * @param array $attachments
     */
    public function __construct($messageId, array $attachments)
    {
        $this->messageId = $messageId;
        $this->attachments = $attachments;
    }

    public function handle(AttachmentService $attachmentService)
    {
        try {
            foreach ($this->attachments as $file) {
                $attachmentService->store($this->messageId, $file);
            }
        } catch (\Exception $e) {
            Log::error('ProcessMessageAttachments@handle: ' . $e->getMessage());
        }
    }
}
