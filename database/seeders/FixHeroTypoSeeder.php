<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\HeroProfile;

class FixHeroTypoSeeder extends Seeder
{
    public function run(): void
    {
        $hero = HeroProfile::first();
        if ($hero && stripos($hero->title, 'DEVELOPHER') !== false) {
            $hero->title = str_ireplace('DEVELOPHER', 'DEVELOPER', $hero->title);
            $hero->save();
        }
    }
}
