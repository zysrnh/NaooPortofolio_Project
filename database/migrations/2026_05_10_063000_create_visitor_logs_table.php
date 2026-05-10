<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('visitor_logs', function (Blueprint $table) {
            $table->id();
            $table->string('ip_address', 45)->nullable();
            $table->string('country', 100)->nullable();
            $table->string('city', 100)->nullable();
            $table->string('device', 20)->nullable();          // desktop / mobile / tablet
            $table->string('os', 60)->nullable();              // Windows / Android / iOS ...
            $table->string('browser', 60)->nullable();         // Chrome / Firefox / Safari ...
            $table->string('page', 255)->default('/');         // URL path visited
            $table->string('referrer', 500)->nullable();       // where they came from
            $table->text('user_agent')->nullable();
            $table->string('session_id', 100)->nullable();     // group page-views per session
            $table->boolean('is_bot')->default(false);
            $table->timestamps();

            $table->index('created_at');
            $table->index('ip_address');
            $table->index('session_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('visitor_logs');
    }
};
