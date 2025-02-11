<?php

namespace App\Http\Controllers;

use App\Models\Extra;
use App\Models\Guru;
use App\Models\Kelas;
use App\Models\KelasMapelSemester;
use App\Models\NilaiExtra;
use App\Models\Semester;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ExtraController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Extra/Index', [
            'extras' => Extra::with('guru')->get(),
            'guru' => Guru::all(),
        ]);
    }

    public function Siswaindex()
    {
        $user = Auth::user();
        $siswa = Siswa::where('user_id', $user->id)->first();

        // Ambil kelas dan kelasMapelSemester
        $kelas = Kelas::find($siswa->kelas_id);
        $kelasMapelSemester = KelasMapelSemester::where('kelas_id', $kelas->id)->first();

        // Ambil nilai extra yang sudah terdaftar oleh siswa
        $nilaiExtra = NilaiExtra::where('siswa_id', $siswa->id)->pluck('extra_id')->toArray(); // Mendapatkan daftar extra_id yang sudah terdaftar

        // Ambil semua ekstra dengan relasi guru
        $extras = Extra::with('guru')->get();

        // Tambahkan informasi apakah siswa sudah terdaftar di masing-masing ekstra
        $extras = $extras->map(function ($extra) use ($nilaiExtra) {
            $extra->is_registered = in_array($extra->id, $nilaiExtra); // Menambahkan field is_registered
            return $extra;
        });

        return Inertia::render('Siswa/Extra/Index', [
            'extras' => $extras, // Kirim ekstra yang sudah ditambahkan status terdaftar
            'guru' => Guru::all(),
            'kelasmapelsemester' => $kelasMapelSemester,
        ]);
    }


    public function Regisextra(Request $request, $id)
    {
        $user = Auth::user();
        $siswa = Siswa::where('user_id', $user->id)->first();

        // Ambil semester terbaru
        $semester = Semester::orderBy('id', 'desc')->first();

        if (!$semester) {
            return redirect()->route('siswa.extra')->with('error', 'Semester tidak ditemukan!');
        }

        NilaiExtra::create([
            'extra_id' => $id,
            'siswa_id' => $siswa->id,
            'semester_id' => $semester->id,
        ]);

        return redirect()->route('siswa.extra')->with('success', 'Extra berhasil ditambahkan!');
    }



    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nama_extra' => 'required', // Validasi Nama Extra
            'guru_id' => 'required', // Validasi Guru ID
        ]);

        $extra = new Extra();
        $extra->nama_extra = $validatedData['nama_extra'];
        $extra->guru_id = $validatedData['guru_id'];
        $extra->save();

        return redirect()->route('admin.extra')->with('success', 'Extra berhasil ditambahkan!');
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'nama_extra' => 'required', // Validasi Nama Extra
            'guru_id' => 'required', // Validasi Guru ID
        ]);

        $extra = Extra::find($id);
        $extra->nama_extra = $validatedData['nama_extra'];
        $extra->guru_id = $validatedData['guru_id'];
        $extra->save();

        return redirect()->route('admin.extra')->with('success', 'Extra berhasil diubah!');
    }

    public function destroy($id)
    {
        $extra = Extra::find($id);
        $extra->delete();

        return redirect()->route('admin.extra')->with('success', 'Extra berhasil dihapus');
    }
}
