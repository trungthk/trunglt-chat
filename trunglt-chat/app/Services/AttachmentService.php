<?php
namespace App\Services;

use App\Repositories\AttachmentRepository;
use Illuminate\Support\Facades\Storage;
use App\Events\AttachmentUploaded;

class AttachmentService
{
    protected string $disk;
    public function __construct(protected AttachmentRepository $repo) {
        $this->disk = config('filesystems.default');
    }

    public function upload($file, $messageId)
    {
        $path = $file->store('attachments', $this->disk);
        $attachment = $this->repo->create([
            'message_id' => $messageId,
            'file_name' => $file->getClientOriginalName(),
            'file_path' => $path,
            'file_type' => $file->getMimeType(),
            'file_size' => $file->getSize(),
        ]);
        event(new AttachmentUploaded($attachment));
        return $attachment;
    }

    public function getById($id) { return $this->repo->getById($id); }

    public function delete($id)
    {
        $attachment = $this->repo->getById($id);
        Storage::disk($this->disk)->delete($attachment->file_path);
        $this->repo->delete($id);
        return true;
    }
}
