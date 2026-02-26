<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    protected $fillable = [
        'title', 'type', 'company', 'description',
        'start_date', 'end_date', 'highlights', 'sort_order',
    ];

    protected $casts = [
        'highlights' => 'array',
    ];
}