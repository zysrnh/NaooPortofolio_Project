<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->string('subtitle');
            $table->text('desc');
            $table->longText('long_desc');
            $table->enum('status', ['Hosted', 'In Progress', 'Planning'])->default('Planning');
            $table->string('date');
            $table->string('duration');
            $table->json('images')->nullable();       // array of image paths/urls
            $table->json('tech_stack_ids')->nullable(); // array of tech_stack id
            $table->json('features')->nullable();     // [{title, desc}]
            $table->string('demo_url')->nullable();
            $table->string('github_url')->nullable();
            $table->integer('order')->default(0);
            $table->boolean('visible')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};