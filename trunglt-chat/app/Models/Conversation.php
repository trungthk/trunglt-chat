<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    protected $fillable = ['name', 'type', 'created_by'];

    public function users() {
        return $this->belongsToMany(User::class)->withPivot('role', 'joined_at')->withTimestamps();
    }

    public function messages() {
        return $this->hasMany(Message::class);
    }

    public function attachments() {
        return $this->hasManyThrough(Attachment::class, Message::class);
    }

    public function readReceipts() {
        return $this->hasMany(ReadReceipt::class);
    }
}
