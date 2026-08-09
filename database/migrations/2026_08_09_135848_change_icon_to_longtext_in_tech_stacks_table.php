<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('tech_stacks', function (Blueprint $table) {
            $table->longText('icon')->change(); // from text → longText for base64 images
        });
    }

    public function down(): void
    {
        Schema::table('tech_stacks', function (Blueprint $table) {
            $table->text('icon')->change();
        });
    }
};
