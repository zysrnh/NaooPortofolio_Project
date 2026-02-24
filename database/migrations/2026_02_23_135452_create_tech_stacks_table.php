<?php
// database/migrations/xxxx_xx_xx_create_tech_stacks_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('tech_stacks', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('category');
            $table->text('icon'); // base64 atau URL
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('tech_stacks');
    }
};