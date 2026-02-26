<?php
// app/Models/AboutProfile.php  — REPLACE

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutProfile extends Model
{
    protected $fillable = [
        'tagline',
        'extra_bio',
        'info_cards',
        'highlights',
        'featured_stack_ids',
        'avail_status',
        'avail_freelance',
        'avail_remote',
        'avail_collaboration',
        'avail_timezone',
        'stats', // NEW: By the Numbers
    ];

    protected $casts = [
        'info_cards'          => 'array',
        'highlights'          => 'array',
        'featured_stack_ids'  => 'array',
        'avail_freelance'     => 'boolean',
        'avail_remote'        => 'boolean',
        'avail_collaboration' => 'boolean',
        'stats'               => 'array',  // [{label, value, icon_key}]
    ];
}