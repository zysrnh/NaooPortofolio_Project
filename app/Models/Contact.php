<?php
// app/Models/Contact.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $fillable = [
        'platform',
        'label',
        'value',
        'url',
        'is_visible',
        'sort_order',
        'icon_color',
    ];

    protected $casts = [
        'is_visible'  => 'boolean',
        'sort_order'  => 'integer',
    ];
}