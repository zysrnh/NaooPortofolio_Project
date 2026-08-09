<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Hapus semua user lama
        User::truncate();

        // Buat akun admin utama
        User::create([
            'name'     => 'Zaki Yusron Hasyimmi',
            'email'    => 'naooolaf@gmail.com',
            'password' => Hash::make('Zakiyh782782?'),
            'role'     => 'admin',
        ]);
    }
}