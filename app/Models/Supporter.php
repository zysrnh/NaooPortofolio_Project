<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Supporter extends Model
{
    protected $fillable = ['name', 'role', 'description', 'image', 'photo2', 'is_visible'];

    protected $casts = [
        'is_visible' => 'boolean',
    ];
}
