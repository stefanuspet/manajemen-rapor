<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // create admin user
        User::insert([
            [
                // "name" => "Admin",
                "email" => "admin@example.com",
                "password" => Hash::make("admin"),
                "role"  => "admin",
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                // "name" => "Wali Kelas",
                "email" => "wali_kelas@example.com",
                "password" => Hash::make("walikelas"),
                "role"  => "wali_kelas",
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                // "name" => "Kepala Sekolah",
                "email" => "kepala_sekolah@example.com",
                "password" => Hash::make("kepalasekolah"),
                "role"  => "kepala_sekolah",
                "created_at" => now(),
                "updated_at" => now(),
            ],
            [
                // "name" => "Siswa",
                "email" => "siswa@example.com",
                "password" => Hash::make("siswa"),
                "role"  => "siswa",
                "created_at" => now(),
                "updated_at" => now(),
            ],
        ]);
    }
}
