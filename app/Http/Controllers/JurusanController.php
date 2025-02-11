<?php

namespace App\Http\Controllers;

use App\Models\Jurusan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JurusanController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Jurusan/Index', [
            'jurusans' => Jurusan::all()
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nama_jurusan' => 'required', // Validasi Nama Jurusan
        ]);

        $jurusan = new Jurusan();
        $jurusan->nama_jurusan = $validatedData['nama_jurusan'];
        $jurusan->save();

        return redirect()->route('admin.jurusan')->with('success', 'Jurusan berhasil ditambahkan!');
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'nama_jurusan' => 'required', // Validasi Nama Jurusan
        ]);

        $jurusan = Jurusan::find($id);
        $jurusan->nama_jurusan = $validatedData['nama_jurusan'];
        $jurusan->save();

        return redirect()->route('admin.jurusan')->with('success', 'Jurusan berhasil diubah!');
    }

    public function destroy($id)
    {
        $jurusan = Jurusan::find($id);
        $jurusan->delete();

        return redirect()->route('admin.jurusan')->with('success', 'Jurusan berhasil dihapus');
    }
}
