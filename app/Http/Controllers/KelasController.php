<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use App\Models\Jurusan;
use App\Models\Kelas;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KelasController extends Controller
{
    // index
    public function index()
    {
        return Inertia::render('Admin/Kelas/Index', [
            'kelas' => Kelas::with(['waliKelas', 'jurusan'])->get(),
            "walikelases" => Guru::all(),
            'jurusans' => Jurusan::all()
        ]);
    }

    public function store(Request $request)
    {
        try {
            // Validasi input
            $validatedData = $request->validate([
                'nama_kelas' => 'required', // Validasi Nama
                'wali_kelas_id' => 'required', // Validasi Wali Kelas
                'jurusan_id' => 'required', // Validasi Jurusan
            ]);

            // Membuat instance Kelas dan menyimpan data
            $kelas = new Kelas();
            $kelas->nama_kelas = $validatedData['nama_kelas'];
            $kelas->wali_kelas_id = $validatedData['wali_kelas_id'];
            $kelas->jurusan_id = $validatedData['jurusan_id'];
            $kelas->save();

            // Jika berhasil, redirect dengan pesan sukses
            return redirect()->route('admin.kelas')->with('success', 'Kelas berhasil ditambahkan!');
        } catch (\Exception $e) {
            // Menangkap error dan mengembalikan pesan error
            return redirect()->route('admin.kelas')->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'nama_kelas' => 'required', // Validasi Nama
                'wali_kelas_id' => 'required', // Validasi Tingkat
                'jurusan_id' => 'required', // Validasi Jurusan
            ]);

            $kelas = Kelas::find($id);
            $kelas->nama_kelas = $validatedData['nama_kelas'];
            $kelas->wali_kelas_id = $validatedData['wali_kelas_id'];
            $kelas->jurusan_id = $validatedData['jurusan_id'];
            $kelas->save();

            return redirect()->route('admin.kelas')->with('success', 'Kelas berhasil diubah!');
        } catch (\Exception $e) {
            return redirect()->route('admin.kelas')->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    public function destroy($id)
    {
        $kelas = Kelas::find($id);
        $kelas->delete();

        return redirect()->route('admin.kelas');
    }
}
