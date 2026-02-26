<?php
// database/migrations/xxxx_add_columns_to_about_and_hero_profiles.php
// Rename ke format timestamp, contoh: 2025_06_01_000001_add_columns_to_about_and_hero_profiles.php
// Jalankan: php artisan migrate

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // ── about_profiles — tambah kolom baru ───────────────────────────────
        Schema::table('about_profiles', function (Blueprint $table) {
            if (!Schema::hasColumn('about_profiles', 'featured_stack_ids')) {
                $table->json('featured_stack_ids')->nullable()->after('highlights');
            }
            if (!Schema::hasColumn('about_profiles', 'avail_status')) {
                $table->string('avail_status', 100)->default('Open to Work')->after('featured_stack_ids');
            }
            if (!Schema::hasColumn('about_profiles', 'avail_freelance')) {
                $table->boolean('avail_freelance')->default(true)->after('avail_status');
            }
            if (!Schema::hasColumn('about_profiles', 'avail_remote')) {
                $table->boolean('avail_remote')->default(true)->after('avail_freelance');
            }
            if (!Schema::hasColumn('about_profiles', 'avail_collaboration')) {
                $table->boolean('avail_collaboration')->default(true)->after('avail_remote');
            }
            if (!Schema::hasColumn('about_profiles', 'avail_timezone')) {
                $table->string('avail_timezone', 50)->default('WIB (UTC+7)')->after('avail_collaboration');
            }
            // NEW: By the Numbers stats
            if (!Schema::hasColumn('about_profiles', 'stats')) {
                $table->json('stats')->nullable()->after('avail_timezone');
            }
        });

        // ── hero_profiles — tambah kolom photo2 ──────────────────────────────
        Schema::table('hero_profiles', function (Blueprint $table) {
            if (!Schema::hasColumn('hero_profiles', 'photo2')) {
                $table->string('photo2')->nullable()->after('photo');
            }
        });

        // ── experiences ───────────────────────────────────────────────────────
        if (!Schema::hasTable('experiences')) {
            Schema::create('experiences', function (Blueprint $table) {
                $table->id();
                $table->string('title');
                $table->string('type', 30)->default('freelance');
                $table->string('company')->nullable();
                $table->text('description')->nullable();
                $table->string('start_date', 7)->nullable();
                $table->string('end_date',   7)->nullable();
                $table->json('highlights')->nullable();
                $table->integer('sort_order')->default(0);
                $table->timestamps();
            });
        }

        // ── case_studies ──────────────────────────────────────────────────────
        if (!Schema::hasTable('case_studies')) {
            Schema::create('case_studies', function (Blueprint $table) {
                $table->id();
                $table->string('title');
                $table->text('short_story')->nullable();
                $table->integer('sort_order')->default(0);
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::table('about_profiles', function (Blueprint $table) {
            $cols = [
                'featured_stack_ids','avail_status','avail_freelance',
                'avail_remote','avail_collaboration','avail_timezone','stats',
            ];
            foreach ($cols as $col) {
                if (Schema::hasColumn('about_profiles', $col)) {
                    $table->dropColumn($col);
                }
            }
        });

        Schema::table('hero_profiles', function (Blueprint $table) {
            if (Schema::hasColumn('hero_profiles', 'photo2')) {
                $table->dropColumn('photo2');
            }
        });

        Schema::dropIfExists('experiences');
        Schema::dropIfExists('case_studies');
    }
};