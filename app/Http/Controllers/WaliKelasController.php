<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use App\Models\Kelas;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WaliKelasController extends Controller
{
    // index
    public function index()
    {
        $user = Auth::user();
        $guru = Guru::where('user_id', $user->id)->first();
        $kelas = Kelas::where('wali_kelas_id', $guru->id)->first();
        $countSiswa = Siswa::where('kelas_id', $kelas->id)->count();


        return Inertia::render('WaliKelas/Dashboard', [
            'countSiswa' => $countSiswa,
        ]);
    }

    public function raporIndex()
    {
        $user = Auth::user();
        $guru = Guru::where('user_id', $user->id)->first();
        $kelas = Kelas::where('wali_kelas_id', $guru->id)->first();
        $siswa = Siswa::where('kelas_id', $kelas->id)->get();

        return Inertia::render('WaliKelas/Rapor/Index', [
            'siswa' => $siswa,
        ]);
    }
}
