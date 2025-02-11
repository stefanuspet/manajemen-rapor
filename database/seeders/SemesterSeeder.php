<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SemesterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('semester')->insert([
            ['nama_semester' => 'Genap', 'tahun_ajaran' => "2024/2025", 'status' => "aktif", 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
