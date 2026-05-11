<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SavedColor extends Model
{
    protected $fillable = [
        'user_id',
        'hex',
        'label',
        'source_image',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
