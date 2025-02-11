<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KelasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $kelas = [
            ['nama_kelas' => 'X TKJ 1', 'wali_kelas_id' => 1,  'jurusan_id' => 1],
            ['nama_kelas' => 'X TKJ 2', 'wali_kelas_id' => 2,  'jurusan_id' => 1],
            ['nama_kelas' => 'X RPL 1', 'wali_kelas_id' => 3,  'jurusan_id' => 2],
            ['nama_kelas' => 'X RPL 2', 'wali_kelas_id' => 4,  'jurusan_id' => 2],
            ['nama_kelas' => 'XI TKJ 1', 'wali_kelas_id' => 5,  'jurusan_id' => 1],
            ['nama_kelas' => 'XI TKJ 2', 'wali_kelas_id' => 6,  'jurusan_id' => 1],
            ['nama_kelas' => 'XI RPL 1', 'wali_kelas_id' => 7,  'jurusan_id' => 2],
            ['nama_kelas' => 'XI RPL 2', 'wali_kelas_id' => 8,  'jurusan_id' => 2],
            ['nama_kelas' => 'XII TKJ 1', 'wali_kelas_id' => 9,  'jurusan_id' => 1],
            ['nama_kelas' => 'XII TKJ 2', 'wali_kelas_id' => 10,  'jurusan_id' => 1],
            ['nama_kelas' => 'XII RPL 1', 'wali_kelas_id' => 1,  'jurusan_id' => 2],
            ['nama_kelas' => 'XII RPL 2', 'wali_kelas_id' => 2,  'jurusan_id' => 2],
        ];

        DB::table('kelas')->insert($kelas);
    }
}
