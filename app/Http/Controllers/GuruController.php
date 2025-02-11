<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use App\Models\Kelas;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;

class GuruController extends Controller
{
    // index
    public function index()
    {
        $gurus = Guru::with(['kelas', 'user'])->get();
        // dd($gurus->toSql());
        return Inertia::render('Admin/Guru/Index', [
            'gurus' => $gurus,
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nip' => 'required', // Validasi NIP
            'nama' => 'required', // Validasi Nama
            'user_id' => 'nullable', // Validasi user_id jika ada
        ]);


        $guru = new Guru();
        $guru->nip = $validatedData['nip'];
        $guru->nama = $validatedData['nama'];
        $guru->user_id = $validatedData['user_id']; // Opsional jika ada user_id
        $guru->save();

        return redirect()->route('admin.guru')->with('success', 'Guru berhasil ditambahkan!');
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'nip' => 'required', // Validasi NIP
            'nama' => 'required', // Validasi Nama
            'user_id' => 'nullable', // Validasi user_id jika ada
        ]);

        $guru = Guru::find($id);
        $guru->nip = $validatedData['nip'];
        $guru->nama = $validatedData['nama'];
        // $guru->user_id = $validatedData['user_id']; // Opsional jika ada user_id
        $guru->save();

        return redirect()->route('admin.guru')->with('success', 'Guru berhasil diubah!');
    }

    public function destroy($id)
    {
        // Mencari guru berdasarkan ID
        try {
            // Logika untuk menghapus guru
            $guru = Guru::find($id);
            $guru->delete();

            return redirect()->route('admin.guru')->with('success', 'Guru berhasil dihapus!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Guru Terintegrasi dengan data lain!');
        }
    }

    public function addAccount(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email|unique:users,email',
                'password' => 'required|min:6',
                'guru_id' => 'required',
            ]);

            $kelas = Kelas::all();
            // cek apakah id guru ada di kelas jika tidak maka gagal proses
            $kelas = $kelas->where('wali_kelas_id', $request->guru_id)->first();
            if (!$kelas) {
                return redirect()->back()->with('error', 'Guru tidak terdaftar sebagai wali kelas!');
            }

            $user = User::create([
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'wali_kelas',
            ]);

            $guru = Guru::find($request->guru_id);
            $guru->user_id = $user->id;
            $guru->save();

            return redirect()->route('admin.guru')->with('success', 'Wali Kelas berhasil ditambahkan!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Terjadi kesalahan saat menambahkan Account!');
        }
    }

    public function deleteAccount($id)
    {
        try {
            $guru = Guru::find($id);
            if (!$guru) {
                return redirect()->back()->with('error', 'Data guru tidak ditemukan!');
            }

            $user = User::find($guru->user_id);
            if ($user) {
                $user->delete();
            }

            $guru->update(['user_id' => null]);

            return redirect()->route('admin.guru')->with('success', 'Account Wali Kelas berhasil dihapus!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Terjadi kesalahan saat menghapus Account! ' . $e->getMessage());
        }
    }
}
