<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->string('work_type')->default('Solo')->after('duration');
            $table->string('solo_role')->default('Fullstack Developer')->after('work_type');
            $table->json('collaborators')->nullable()->after('solo_role');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn(['work_type', 'solo_role', 'collaborators']);
        });
    }
};
