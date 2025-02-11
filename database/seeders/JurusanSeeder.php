<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JurusanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jurusan = [
            ['nama_jurusan' => 'Teknik Komputer dan Jaringan'],
            ['nama_jurusan' => 'Rekayasa Perangkat Lunak'],
            ['nama_jurusan' => 'Multimedia'],
            ['nama_jurusan' => 'Teknik Elektro'],
            ['nama_jurusan' => 'Teknik Mesin'],
            ['nama_jurusan' => 'Teknik Kendaraan Ringan'],
            ['nama_jurusan' => 'Akuntansi dan Keuangan Lembaga'],
            ['nama_jurusan' => 'Bisnis Daring dan Pemasaran'],
            ['nama_jurusan' => 'Tata Boga'],
            ['nama_jurusan' => 'Perhotelan'],
        ];

        DB::table('jurusan')->insert($jurusan);
    }
}
