<?php

namespace App\Http\Controllers;

use App\Models\Absensi;
use App\Models\Guru;
use App\Models\Kelas;
use App\Models\KelasMapelSemester;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AbsensiController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $walikelas = Guru::where('user_id', $user->id)->first();

        $kelas = Kelas::where("wali_kelas_id", $walikelas->id)->first();

        $siswa = Siswa::where("kelas_id", $kelas->id)->get();

        $formatedSiswa = [];

        foreach ($siswa as $s) {
            $absensi = Absensi::where("siswa_id", $s->id)->get();

            $izin = 0;
            $alfa = 0;
            $sakit = 0;
            $semesterId = KelasMapelSemester::where('kelas_id', $kelas->id)->value('semester_id');

            foreach ($absensi as $a) {
                if ($a->status == "izin") {
                    $izin++;
                } elseif ($a->status == "Alfa") {
                    $alfa++;
                } elseif ($a->status == "sakit") {
                    $sakit++;
                }
                $semesterId = $a->semester_id; // Assuming all absensi records have the same semester_id
            }

            $formatedSiswa[] = [
                "id" => $s->id,
                "nisn" => $s->nisn,
                "nama" => $s->nama,
                "kelas" => $s->kelas->nama_kelas,
                "countIzin" => $izin,
                "countAlfa" => $alfa,
                "countSakit" => $sakit,
                "semester_id" => $semesterId,
                'absensi' => $absensi,
            ];
        }

        return Inertia::render('WaliKelas/Absensi/Index', [
            'siswa' => $formatedSiswa,
        ]);
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                "siswa_id" => "required",
                "status" => "required",
                'semester_id' => 'required',
                "tanggal_absensi" => "required",
            ]);

            Absensi::create($request->all());

            return redirect()->back()->with('success', 'Absensi berhasil ditambahkan.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Terjadi kesalahan saat menambahkan absensi: ' . $e->getMessage());
        }
    }

    public function destroy($id)
    {
        // Memastikan bahwa absensi yang ingin dihapus adalah milik siswa yang ada di kelas wali kelas yang sedang login
        $user = Auth::user();
        $walikelas = Guru::where('user_id', $user->id)->first();
        $kelas = Kelas::where("wali_kelas_id", $walikelas->id)->first();

        // Mencari absensi berdasarkan ID
        $absensi = Absensi::find($id);

        if (!$absensi) {
            return redirect()->route('absensi.index')->with('error', 'Absensi tidak ditemukan.');
        }

        // Mengecek apakah absensi milik siswa yang ada di kelas yang diampu oleh wali kelas
        $siswa = Siswa::where('id', $absensi->siswa_id)->first();

        if (!$siswa || $siswa->kelas_id !== $kelas->id) {
            return redirect()->route('absensi.index')->with('error', 'Anda tidak memiliki hak untuk menghapus absensi ini.');
        }

        // Menghapus absensi yang salah input
        $absensi->delete();

        return redirect()->route('wali.absensi')->with('success', 'Absensi berhasil dihapus.');
    }
}
