<?php

namespace App\Http\Controllers;

use App\Models\Guru;
use App\Models\Jurusan;
use App\Models\Kelas;
use App\Models\KelasMapelSemester;
use App\Models\Mapel;
use App\Models\Siswa;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class SiswaController extends Controller
{
    // index
    public function index()
    {
        return Inertia::render('Admin/Siswa/Index', [
            'siswas' => Siswa::with(['kelas', 'user'])->get(),
            'kelas' => Kelas::all(),
        ]);
    }

    public function dashboardsiswa()
    {
        $user = Auth::user();
        $siswa = Siswa::where('user_id', $user->id)->first();

        // Ambil kelas
        $kelas = Kelas::find($siswa->kelas_id);

        // Ambil kelasMapelSemester
        $kelasMapelSemester = KelasMapelSemester::where('kelas_id', $kelas->id)->get();

        // Menghitung jumlah Mapel, jika kelasMapelSemester tidak kosong
        $countMapel = $kelasMapelSemester->isEmpty()
            ? 0
            : Mapel::whereIn('id', $kelasMapelSemester->pluck('mapel_id'))->count();


        return Inertia::render('Siswa/Dashboard', [
            'countMapel' => $countMapel,
            "id" => $siswa->id,
        ]);
    }


    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'nisn' => 'required', // Validasi NIS
                'nama' => 'required', // Validasi Nama
                'kelas_id' => 'required', // Validasi Kelas
                // 'user_id' => 'nullable', // Validasi user_id jika ada
            ]);

            $siswa = new Siswa();
            $siswa->nisn = $validatedData['nisn'];
            $siswa->nama = $validatedData['nama'];
            $siswa->kelas_id = $validatedData['kelas_id'];
            // $siswa->user_id = $validatedData['user_id']; // Opsional jika ada user_id
            $siswa->save();

            return redirect()->route('admin.siswa')->with('success', 'Data siswa berhasil disimpan.');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Terjadi kesalahan: ' . $e->getMessage()]);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'nisn' => 'required',
                'nama' => 'required',
                'kelas_id' => 'required',
                // 'user_id' => 'nullable',
            ]);

            $siswa = Siswa::findOrFail($id);
            $siswa->nisn = $validatedData['nisn'];
            $siswa->nama = $validatedData['nama'];
            $siswa->kelas_id = $validatedData['kelas_id'];
            // $siswa->user_id = $validatedData['user_id'];
            $siswa->save();

            return redirect()->route('admin.siswa')->with('success', 'Data siswa berhasil diperbarui.');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Terjadi kesalahan: ' . $e->getMessage()]);
        }
    }

    public function destroy($id)
    {
        try {
            $siswa = Siswa::findOrFail($id);
            $siswa->delete();

            return redirect()->route('admin.siswa')->with('success', 'Data siswa berhasil dihapus.');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Terjadi kesalahan: ' . $e->getMessage()]);
        }
    }

    public function addAccount(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email|unique:users,email',
                'password' => 'required|min:6',
                'siswa_id' => 'required',
            ]);

            $user = User::create([
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'siswa',
            ]);

            $siswa = Siswa::find($request->siswa_id);
            $siswa->user_id = $user->id;
            $siswa->save();

            return redirect()->route('admin.siswa')->with('success', 'Akun Siswa berhasil ditambahkan!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Terjadi kesalahan saat menambahkan Account!');
        }
    }

    public function deleteAccount($id)
    {
        try {
            $siswa = Siswa::find($id);
            if (!$siswa) {
                return redirect()->back()->with('error', 'Data siswa tidak ditemukan!');
            }

            $user = User::find($siswa->user_id);
            if ($user) {
                $user->delete();
            }

            $siswa->update(['user_id' => null]);

            return redirect()->route('admin.siswa')->with('success', 'Account Siswa berhasil dihapus!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Terjadi kesalahan saat menghapus Account! ' . $e->getMessage());
        }
    }
}
