<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use App\Models\Kelas;
use App\Models\Mapel;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    // index
    public function index()
    {
        $countGuru = Guru::count();
        $countSiswa = Siswa::count();
        $countKelas = Kelas::count();
        $coundMapel = Mapel::count();
        return Inertia::render('Admin/Dashboard', [
            'countGuru' => $countGuru,
            'countSiswa' => $countSiswa,
            'countKelas' => $countKelas,
            'countMapel' => $coundMapel,
        ]);
    }
}
