<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ColorPalette extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'colors',
        'source_image',
    ];

    protected $casts = [
        'colors' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
