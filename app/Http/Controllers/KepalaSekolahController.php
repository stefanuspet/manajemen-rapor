<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use App\Models\Kelas;
use App\Models\Mapel;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KepalaSekolahController extends Controller
{
    // index
    public function index()
    {
        $countGuru = Guru::count();
        $countSiswa = Siswa::count();
        $countKelas = Kelas::count();
        $coundMapel = Mapel::count();
        return Inertia::render('KepalaSekolah/Dashboard', [
            'countGuru' => $countGuru,
            'countSiswa' => $countSiswa,
            'countKelas' => $countKelas,
            'countMapel' => $coundMapel,
        ]);
    }

    public function raporIndex()
    {
        $siswa = Siswa::all();
        return Inertia::render('KepalaSekolah/Rapor/index', [
            'siswa' => $siswa,
        ]);
    }
}
