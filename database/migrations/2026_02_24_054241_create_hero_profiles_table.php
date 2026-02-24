<?php
// database/migrations/xxxx_xx_xx_create_hero_profiles_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hero_profiles', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('title')->default('IT Programmer');
            $table->text('bio')->nullable();
            $table->string('photo')->nullable(); // base64 atau URL
            $table->timestamps();
        });

        // Seed data default supaya langsung ada isinya
        DB::table('hero_profiles')->insert([
            'name'       => 'Yusron',
            'title'      => 'IT Programmer',
            'bio'        => 'Saya membangun aplikasi web modern, dashboard, dan tools internal dengan fokus pada UI yang rapi, performa, dan pengalaman pengguna.',
            'photo'      => null,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('hero_profiles');
    }
};