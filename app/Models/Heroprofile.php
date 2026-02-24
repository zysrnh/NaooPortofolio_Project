<?php
// app/Models/HeroProfile.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroProfile extends Model
{
    protected $fillable = ['name', 'title', 'bio', 'photo'];
}