<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use App\Models\Kelas;
use App\Models\KelasMapelSemester;
use App\Models\Nilai;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class NilaiController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $waliKelas = Guru::where('user_id', $user->id)->first();

        $kelas = Kelas::where("wali_kelas_id", $waliKelas->id)->first();

        $siswa = Siswa::where("kelas_id", $kelas->id)->get();

        $formatedSiswa = [];

        foreach ($siswa as $s) {
            $mapel = KelasMapelSemester::where("kelas_id", $kelas->id)->get();
            $formatedMapel = [];

            foreach ($mapel as $m) {
                $nilai = Nilai::where("siswa_id", $s->id)
                    ->where("mapel_id", $m->mapel_id)
                    ->first();

                $formatedMapel[] = [
                    "mapel_id" => $m->mapel_id,
                    "nama_mapel" => $m->mapel->nama_mapel,
                    "nilai" => $nilai ? $nilai->nilai : null,
                    'nilai_id' => $nilai ? $nilai->id : null,
                    'capaian_kompetensi' => $nilai ? $nilai->capaian_kompetensi : null,
                    'semester_id' => $m->semester_id,
                ];
            }

            $formatedSiswa[] = [
                "id" => $s->id,
                "nisn" => $s->nisn,
                "nama" => $s->nama,
                "kelas" => $s->kelas->nama_kelas,
                "mapel" => $formatedMapel,
            ];
        }

        return Inertia::render('WaliKelas/Nilai/Index', [
            "siswa" => $formatedSiswa,
        ]);
    }

    // store method
    public function store(Request $request)
    {
        // dd($request->all());
        // Validasi input
        $validatedData = $request->validate([
            'nilai' => 'required|numeric|min:0|max:100',
            'capaian_kompetensi' => 'nullable|string|max:255',
            'siswa_id' => 'required|exists:siswa,id',
            'mapel_id' => 'required|exists:mapel,id',
            'semester_id' => 'required|exists:semester,id',
        ]);

        try {

            Nilai::create($validatedData);

            return redirect()->route('wali.nilai')->with('success', 'Data berhasil disimpan.');
        } catch (\Exception $e) {
            return redirect()->route('wali.nilai')->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    // edit method

    // update method
    public function update(Request $request, $id)
    {
        try {
            // Validasi input
            $validatedData = $request->validate([
                'nilai' => 'required|numeric|min:0|max:100',
                'capaian_kompetensi' => 'nullable|string|max:255',
            ]);

            // Cari data Nilai berdasarkan ID
            $nilai = Nilai::find($id);

            // Pastikan data ditemukan
            if (!$nilai) {
                return redirect()->route('wali.nilai')->with('error', 'Data nilai tidak ditemukan.');
            }

            // Update data
            $nilai->update($validatedData);

            return redirect()->route('wali.nilai')->with('success', 'Data berhasil diperbarui.');
        } catch (\Exception $e) {
            return redirect()->route('wali.nilai')->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }
}
