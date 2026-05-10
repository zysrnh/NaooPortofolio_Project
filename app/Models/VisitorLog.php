<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VisitorLog extends Model
{
    protected $fillable = [
        'ip_address', 'country', 'city', 'device', 'os', 'browser',
        'page', 'referrer', 'user_agent', 'session_id', 'is_bot',
    ];

    protected $casts = [
        'is_bot' => 'boolean',
    ];
}
