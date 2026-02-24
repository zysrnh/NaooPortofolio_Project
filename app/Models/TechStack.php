<?php
// app/Models/TechStack.php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class TechStack extends Model {
    protected $fillable = ['name', 'category', 'icon', 'is_visible'];

    protected $casts = [
        'is_visible' => 'boolean',
    ];
}