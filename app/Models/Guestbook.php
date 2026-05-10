<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Guestbook extends Model
{
    protected $fillable = ['name', 'message', 'avatar_color', 'is_visible', 'ip_address'];

    protected $casts = [
        'is_visible' => 'boolean',
    ];
}
