<?php
namespace App\Repositories;

use App\Models\Attachment;

class AttachmentRepository
{
    public function create(array $data) { return Attachment::create($data); }
    public function getById($id) { return Attachment::findOrFail($id); }
    public function delete($id) { return Attachment::destroy($id); }

    public function getByMessage($messageId)
    {
        return Attachment::where('message_id', $messageId)->get();
    }
}
