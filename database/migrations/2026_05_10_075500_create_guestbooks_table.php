<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('guestbooks', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->text('message');
            $table->string('avatar_color', 20)->nullable(); // Simpan warna random buat avatar
            $table->boolean('is_visible')->default(true);   // Admin bisa hide pesan kasar/spam
            $table->string('ip_address', 45)->nullable();   // Untuk mencegah spam
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('guestbooks');
    }
};
