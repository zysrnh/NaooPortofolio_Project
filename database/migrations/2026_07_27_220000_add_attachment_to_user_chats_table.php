<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('user_chats', function (Blueprint $table) {
            $table->longText('attachment')->nullable()->after('message');
            $table->string('attachment_type')->nullable()->after('attachment'); // 'image' | 'file'
            $table->string('attachment_name')->nullable()->after('attachment_type');
        });
    }

    public function down(): void
    {
        Schema::table('user_chats', function (Blueprint $table) {
            $table->dropColumn(['attachment', 'attachment_type', 'attachment_name']);
        });
    }
};
