<?php

namespace App\Http\Controllers;

use App\Models\Kelas;
use App\Models\KelasMapelSemester;
use App\Models\Mapel;
use App\Models\Semester;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KelasMapelSemesterController extends Controller
{
    /**
     * Menampilkan semua data kepala.kurikulum.
     */
    public function index()
    {
        // Ambil semua data dengan relasi
        $kelasMapelSemesters = KelasMapelSemester::with(['kelas', 'mapel', 'semester'])->get();

        // Kelompokkan berdasarkan semester dan kelas
        $formattedData = $kelasMapelSemesters->groupBy(function ($item) {
            return $item->semester->nama_semester . ' - ' . $item->kelas->nama_kelas;
        })->map(function ($items, $key) {
            $firstItem = $items->first(); // Ambil satu item untuk mendapatkan semester dan kelas

            // Ubah daftar mapel menjadi array of objects
            $mapelList = $items->map(function ($item) {
                return ['nama' => $item->mapel->nama_mapel, 'id' => $item->mapel_id];
            })->toArray();

            return [
                'id' => $firstItem->id,
                'semester' => $firstItem->semester->nama_semester,
                'kelas' => $firstItem->kelas->nama_kelas,
                'kelas_id' => $firstItem->kelas_id,
                'semester_id' => $firstItem->semester_id,
                'mapels' => $mapelList,

            ];
        })->values();

        return Inertia::render('KepalaSekolah/ManajemenKelas/index', [
            'kelasMapelSemesters' => $formattedData,
            'kelas' => Kelas::all(),
            'mapels' => Mapel::all(),
            'semesters' => Semester::all()
        ]);
    }



    /**
     * Menyimpan data kepala.kurikulum baru.
     */
    public function store(Request $request)
    {
        $request->validate([
            'kelas_id' => 'required|exists:kelas,id',
            'mapel_id' => 'required|exists:mapel,id',
            'semester_id' => 'required|exists:semester,id',
        ]);

        try {
            $kelasMapelSemester = KelasMapelSemester::create([
                'kelas_id' => $request->kelas_id,
                'mapel_id' => $request->mapel_id,
                'semester_id' => $request->semester_id,
            ]);

            return redirect()->route('kepala.kurikulum')->with('success', 'Data berhasil disimpan');
        } catch (\Exception $e) {
            return redirect()->route('kepala.kurikulum')->with('error', 'Terjadi kesalahan saat menyimpan data');
        }
    }

    /**
     * Menampilkan detail data kepala.kurikulum berdasarkan ID.
     */
    public function show($id)
    {
        $kelasMapelSemester = KelasMapelSemester::find($id);

        if (!$kelasMapelSemester) {
            return redirect()->route('kepala.kurikulum.index')->with('error', 'Data tidak ditemukan');
        }

        return Inertia::render('Admin/KelasMapelSemester/Show', [
            'kelasMapelSemester' => $kelasMapelSemester,
            'kelas' => Kelas::all(),
            'mapels' => Mapel::all(),
            'semesters' => Semester::all()
        ]);
    }

    /**
     * Mengupdate data kepala.kurikulum.
     */

    //  this function is buggy
    public function update(Request $request, $id)
    {

        $request->validate([
            'kelas_id' => 'required|exists:kelas,id',
            'semester_id' => 'required|exists:semester,id',
        ]);

        // find kelasMapelSemester by semster id
        $kelasMapelSemester = KelasMapelSemester::where('kelas', $id)->get();


        if (!$kelasMapelSemester) {
            return redirect()->route('kepala.kurikulum')->with('error', 'Data tidak ditemukan');
        }


        try {
            foreach ($kelasMapelSemester as $item) {
                $item->update([
                    'kelas_id' => $request->kelas_id,
                    'semester_id' => $request->semester_id,
                ]);
            }

            return redirect()->route('kepala.kurikulum')->with('success', 'Data berhasil diperbarui');
        } catch (\Exception $e) {
            return redirect()->route('kepala.kurikulum')->with('error', 'Terjadi kesalahan saat memperbarui data');
        }
    }

    /**
     * Menghapus data kepala.kurikulum.
     */
    public function destroy($id)
    {
        try {
            $kelasMapelSemesters = KelasMapelSemester::where('kelas_id', $id)->get();

            if ($kelasMapelSemesters->isEmpty()) {
                return redirect()->route('kepala.kurikulum')->with('error', 'Data tidak ditemukan');
            }

            // Hapus semua data
            foreach ($kelasMapelSemesters as $kelasMapelSemester) {
                $kelasMapelSemester->delete();
            }

            return redirect()->route('kepala.kurikulum')->with('success', 'Data berhasil dihapus');
        } catch (\Exception $e) {
            return redirect()->route('kepala.kurikulum')->with('error', 'Terjadi kesalahan saat menghapus data');
        }
    }

    public function deleteMapel($id)
    {
        $mapel = KelasMapelSemester::where('mapel_id', $id)->first();

        if (!$mapel) {
            return back()->with('error', 'Mata pelajaran tidak ditemukan.');
        }

        $mapel->delete();

        return back()->with('success', 'Mata pelajaran berhasil dihapus.');
    }

    public function addMapel(Request $request)
    {
        $request->validate([
            'kelas_id' => 'required|exists:kelas,id',
            'mapel_id' => 'required|exists:mapel,id',
            'semester_id' => 'required|exists:semester,id',
        ]);

        try {
            $kelasMapelSemester = KelasMapelSemester::create([
                'kelas_id' => $request->kelas_id,
                'mapel_id' => $request->mapel_id,
                'semester_id' => $request->semester_id,
            ]);

            return back()->with('success', 'Mata pelajaran berhasil ditambahkan.');
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan saat menambahkan mata pelajaran.');
        }
    }
}
