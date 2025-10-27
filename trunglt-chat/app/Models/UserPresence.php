<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserPresence extends Model
{
    protected $table = 'user_presence';
    protected $fillable = ['user_id', 'status', 'last_seen_at'];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
