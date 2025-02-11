<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SiswaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $siswa = [
            [
                'nisn' => 1234567890,
                'nama' => 'Ahmad Pratama',
                'kelas_id' => 1,
                // RPL
                'user_id' => null,
            ],
            [
                'nisn' => 1234567891,
                'nama' => 'Siti Aisyah',
                'kelas_id' => 2,
                // TKJ
                'user_id' => null,
            ],
            [
                'nisn' => 1234567892,
                'nama' => 'Budi Santoso',
                'kelas_id' => 3,
                // Multimedia
                'user_id' => null,
            ],
            [
                'nisn' => 1234567893,
                'nama' => 'Dewi Lestari',
                'kelas_id' => 1,
                // Teknik Elektro
                'user_id' => null,
            ],
            [
                'nisn' => 1234567894,
                'nama' => 'Rahmat Hidayat',
                'kelas_id' => 2,
                // Teknik Mesin
                'user_id' => null,
            ],
            [
                'nisn' => 1234567895,
                'nama' => 'Fauzan Alfarizi',
                'kelas_id' => 3,
                // Teknik Kendaraan Ringan
                'user_id' => null,
            ],
            [
                'nisn' => 1234567896,
                'nama' => 'Intan Permata',
                'kelas_id' => 1,
                // Akuntansi
                'user_id' => null,
            ],
            [
                'nisn' => 1234567897,
                'nama' => 'Rizki Ramadhan',
                'kelas_id' => 2,
                // Bisnis Daring
                'user_id' => null,
            ],
            [
                'nisn' => 1234567898,
                'nama' => 'Melati Anggraini',
                'kelas_id' => 3,
                // Tata Boga
                'user_id' => null,
            ],
            [
                'nisn' => 1234567899,
                'nama' => 'Bayu Setiawan',
                'kelas_id' => 1, // Perhotelan
                'user_id' => null,
            ],
        ];

        DB::table('siswa')->insert($siswa);
    }
}
