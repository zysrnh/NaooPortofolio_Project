<?php
// app/Models/HeroProfile.php  — REPLACE file lama

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroProfile extends Model
{
    protected $fillable = [
        'name',
        'title',
        'bio',
        'photo',
        'photo2', // New: foto secondary / decorative
    ];
}