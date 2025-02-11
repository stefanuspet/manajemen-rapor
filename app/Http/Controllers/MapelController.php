<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use App\Models\Mapel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MapelController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Mapel/Index', [
            'mapels' => Mapel::with('guru')->get(),
            'guru' => Guru::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nama_mapel' => 'required', // Validasi Nama Mapel
            'guru_id' => 'required', // Validasi Guru ID
        ]);

        $mapel = new Mapel();
        $mapel->nama_mapel = $validatedData['nama_mapel'];
        $mapel->guru_id = $validatedData['guru_id'];
        $mapel->save();

        return redirect()->route('admin.mapel')->with('success', 'Mapel berhasil ditambahkan!');
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'nama_mapel' => 'required', // Validasi Nama Mapel
            'guru_id' => 'required', // Validasi Guru ID
        ]);

        $mapel = Mapel::find($id);
        $mapel->nama_mapel = $validatedData['nama_mapel'];
        $mapel->guru_id = $validatedData['guru_id'];
        $mapel->save();

        return redirect()->route('admin.mapel')->with('success', 'Mapel berhasil diubah!');
    }

    public function destroy($id)
    {
        $mapel = Mapel::find($id);
        $mapel->delete();

        return redirect()->route('admin.mapel')->with('success', 'Mapel berhasil dihapus');
    }
}
