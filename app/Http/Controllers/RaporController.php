<?php

namespace App\Http\Controllers;

use App\Models\Absensi;
use App\Models\Guru;
use App\Models\Kelas;
use App\Models\KelasMapelSemester;
use App\Models\Nilai;
use App\Models\NilaiExtra;
use App\Models\Semester;
use App\Models\Siswa;
use Barryvdh\DomPDF\Facade\Pdf;

class RaporController extends Controller
{
    public function cetak($id)
    {
        // Ambil data siswa beserta nilai dari database
        $siswa = Siswa::where('id', $id)->with('nilai')->first();
        $nilai = Nilai::where('siswa_id', $siswa->id)->get();
        $kelas = Kelas::where('id', $siswa->kelas_id)->first();
        $nilaiExtra = NilaiExtra::where('siswa_id', $id)->get();
        $walikelas = Guru::where('id', $kelas->wali_kelas_id)->first();
        $absensi = Absensi::where('siswa_id', $siswa->id)->get();
        // get current semeste
        $semester = Semester::where('status', 'aktif')
            ->orderBy('created_at', 'desc') // Mengurutkan berdasarkan tanggal terbaru
            ->first();

        // dd($semester);

        // Hitung jumlah berdasarkan status
        $jumlahHadir = $absensi->where('status', 'hadir')->count();
        $jumlahSakit = $absensi->where('status', 'sakit')->count();
        $jumlahIzin = $absensi->where('status', 'izin')->count();
        $jumlahAlpa = $absensi->where('status', 'alpa')->count();

        // dd($kelas);

        // dd($absensi);


        // dd($formatedValue);

        // Load view dengan data siswa
        $pdf = Pdf::loadView('rapor/pdf', compact('siswa', 'nilai', 'kelas', 'nilaiExtra', 'absensi', 'jumlahSakit', 'jumlahIzin', 'jumlahAlpa', 'walikelas', 'semester'));

        $pdf->stream();

        // Kembalikan PDF sebagai response
        return $pdf->stream("Rapor-{$siswa->nama}.pdf");
    }
}
