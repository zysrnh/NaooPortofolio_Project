<?php
// database/migrations/xxxx_xx_xx_create_contacts_table.php
// Jalankan: php artisan make:migration create_contacts_table
// Lalu isi dengan konten ini

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('contacts', function (Blueprint $table) {
            $table->id();
            $table->string('platform', 50);          // whatsapp, email, github, dst
            $table->string('label', 100);             // "WhatsApp", "Email", dll (bisa custom)
            $table->string('value', 255);             // nomor/username/email yang tampil
            $table->string('url', 500);               // full URL link
            $table->boolean('is_visible')->default(true);
            $table->integer('sort_order')->default(0);
            $table->string('icon_color', 20)->default('#9ECCFA');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contacts');
    }
};