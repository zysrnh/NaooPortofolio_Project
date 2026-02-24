<?php
// database/migrations/xxxx_xx_xx_change_photo_to_longtext_in_hero_profiles.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('hero_profiles', function (Blueprint $table) {
            // Ubah kolom photo dari VARCHAR(255) → LONGTEXT
            // supaya bisa menampung base64 foto (bisa ratusan ribu karakter)
            $table->longText('photo')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('hero_profiles', function (Blueprint $table) {
            // Rollback ke string — WARNING: data base64 akan terpotong!
            $table->string('photo')->nullable()->change();
        });
    }
};