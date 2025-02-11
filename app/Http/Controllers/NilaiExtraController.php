<?php

namespace App\Http\Controllers;

use App\Models\Extra;
use App\Models\Guru;
use App\Models\Kelas;
use App\Models\NilaiExtra;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class NilaiExtraController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $waliKelas = Kelas::where('wali_kelas_id', $user->id)->first();

        $kelas = Kelas::find($waliKelas->id);

        $siswas = Siswa::where('kelas_id', $kelas->id)->get();

        $nilaiExtra = NilaiExtra::with(['siswa', 'extra'])->get();

        $formatedValue = $nilaiExtra->map(function ($item) use ($siswas) {
            $siswa = $siswas->where('id', $item->siswa_id)->first();
            $item->siswa = $siswa;
            return $item;
        });




        return Inertia::render('WaliKelas/Extra/Index', [
            "extra" => $formatedValue,
        ]);
    }


    // update
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'keterangan' => 'required',
        ]);

        $nilaiExtra = NilaiExtra::findOrFail($id);
        $nilaiExtra->keterangan = $validatedData['keterangan']; // Update keterangan
        $nilaiExtra->save();

        return redirect()->route('wali.extra')->with('success', 'Nilai extra berhasil diperbarui.');
    }
}
