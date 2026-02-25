<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutProfile extends Model
{
    protected $table = 'about_profiles';

    protected $fillable = [
        'tagline',
        'extra_bio',
        'info_cards',
        'highlights',
    ];

    protected $casts = [
        'info_cards' => 'array',
        'highlights' => 'array',
    ];
}