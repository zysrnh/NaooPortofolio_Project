<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Project extends Model
{
    protected $fillable = [
        'slug',
        'title',
        'subtitle',
        'desc',
        'long_desc',
        'status',
        'date',
        'duration',
        'images',
        'tech_stack_ids',
        'features',
        'demo_url',
        'github_url',
        'order',
        'visible',
    ];

    protected $casts = [
        'images'         => 'array',
        'tech_stack_ids' => 'array',
        'features'       => 'array',
        'visible'        => 'boolean',
    ];

    public function techStacks()
    {
        $ids = $this->tech_stack_ids ?? [];
        if (empty($ids)) return collect();
        return TechStack::whereIn('id', $ids)->get();
    }

    public static function generateSlug(string $title): string
    {
        return Str::slug($title);
    }
}