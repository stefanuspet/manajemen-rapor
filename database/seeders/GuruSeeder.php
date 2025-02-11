<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GuruSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $gurus = [
            ['nip' => 197801152022011001, 'nama' => 'Budi Santoso', 'user_id' => 2],
            ['nip' => 198503102022011002, 'nama' => 'Siti Nurhaliza', 'user_id' => null],
            ['nip' => 197912202022011003, 'nama' => 'Agus Saputra', 'user_id' => null],
            ['nip' => 198205052022011004, 'nama' => 'Dewi Kartika', 'user_id' => null],
            ['nip' => 198701172022011005, 'nama' => 'Rizky Pratama', 'user_id' => null],
            ['nip' => 199005102022011006, 'nama' => 'Indah Lestari', 'user_id' => null],
            ['nip' => 198412052022011007, 'nama' => 'Eko Wijaya', 'user_id' => null],
            ['nip' => 199307222022011008, 'nama' => 'Putri Maharani', 'user_id' => null],
            ['nip' => 197601132022011009, 'nama' => 'Hendra Kusuma', 'user_id' => null],
            ['nip' => 198908252022011010, 'nama' => 'Fitriani Sari', 'user_id' => null],
        ];

        DB::table('guru')->insert($gurus);
    }
}
