<?php

use App\Http\Controllers\AbsensiController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ExtraController;
use App\Http\Controllers\GuruController;
use App\Http\Controllers\JurusanController;
use App\Http\Controllers\KelasController;
use App\Http\Controllers\KelasMapelSemesterController;
use App\Http\Controllers\KepalaSekolahController;
use App\Http\Controllers\MapelController;
use App\Http\Controllers\NilaiController;
use App\Http\Controllers\NilaiExtraController;
use App\Http\Controllers\RaporController;
use App\Http\Controllers\SemesterController;
use App\Http\Controllers\SiswaController;
use App\Http\Controllers\WaliKelasController;
use App\Models\NilaiExtra;
use App\Models\Siswa;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('Auth/Login'); // Render langsung halaman login
});

Route::middleware(['auth'])->group(function () {
    Route::get('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});


Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');

    Route::get('/admin/guru', [GuruController::class, "index"])->name('admin.guru');
    Route::post('/admin/guru/store', [GuruController::class, "store"])->name('admin.guru.store');
    Route::put('/admin/guru/update/{id}', [GuruController::class, "update"])->name('admin.guru.update');
    Route::delete('/admin/guru/delete/{id}', [GuruController::class, "destroy"])->name('admin.guru.destroy');
    Route::post('/admin/guru/add-account', [GuruController::class, "addAccount"])->name('admin.guru.add-account');
    Route::delete('/admin/guru/delete-account/{id}', [GuruController::class, "deleteAccount"])->name('admin.guru.delete-account');

    Route::get('/admin/siswa', [SiswaController::class, "index"])->name('admin.siswa');
    Route::post('/admin/siswa/store', [SiswaController::class, "store"])->name('admin.siswa.store');
    Route::put('/admin/siswa/update/{id}', [SiswaController::class, "update"])->name('admin.siswa.update');
    Route::delete('/admin/siswa/delete/{id}', [SiswaController::class, "destroy"])->name('admin.siswa.destroy');
    Route::post('/admin/siswa/add-account', [SiswaController::class, "addAccount"])->name('admin.siswa.add-account');
    Route::delete('/admin/siswa/delete-account/{id}', [SiswaController::class, "deleteAccount"])->name('admin.siswa.delete-account');


    Route::get('/admin/kelas', [KelasController::class, "index"])->name('admin.kelas');
    Route::post('/admin/kelas/store', [KelasController::class, "store"])->name('admin.kelas.store');
    Route::put('/admin/kelas/update/{id}', [KelasController::class, "update"])->name('admin.kelas.update');
    Route::delete('/admin/kelas/delete/{id}', [KelasController::class, "destroy"])->name('admin.kelas.destroy');

    Route::get('/admin/jurusan', [JurusanController::class, "index"])->name('admin.jurusan');
    Route::post('/admin/jurusan/store', [JurusanController::class, "store"])->name('admin.jurusan.store');
    Route::put('/admin/jurusan/update/{id}', [JurusanController::class, "update"])->name('admin.jurusan.update');
    Route::delete('/admin/jurusan/delete/{id}', [JurusanController::class, "destroy"])->name('admin.jurusan.destroy');

    Route::get('/admin/mapel', [MapelController::class, "index"])->name('admin.mapel');
    Route::post('/admin/mapel/store', [MapelController::class, "store"])->name('admin.mapel.store');
    Route::put('/admin/mapel/update/{id}', [MapelController::class, "update"])->name('admin.mapel.update');
    Route::delete('/admin/mapel/delete/{id}', [MapelController::class, "destroy"])->name('admin.mapel.destroy');

    Route::get('/admin/extra', [ExtraController::class, "index"])->name('admin.extra');
    Route::post('/admin/extra/store', [ExtraController::class, "store"])->name('admin.extra.store');
    Route::put('/admin/extra/update/{id}', [ExtraController::class, "update"])->name('admin.extra.update');
    Route::delete('/admin/extra/delete/{id}', [ExtraController::class, "destroy"])->name('admin.extra.destroy');

    Route::get('/admin/semester', [SemesterController::class, "index"])->name('admin.semester');
    Route::post('/admin/semester/store', [SemesterController::class, "store"])->name('admin.semester.store');
    Route::put('/admin/semester/update/{id}', [SemesterController::class, "update"])->name('admin.semester.update');
});

Route::middleware(['auth', 'role:wali_kelas'])->group(function () {
    Route::get('/wali/dashboard', [WaliKelasController::class, 'index'])->name('wali.dashboard');

    Route::get('/wali/absensi', [AbsensiController::class, 'index'])->name('wali.absensi');
    Route::post('/wali/absensi/store', [AbsensiController::class, 'store'])->name('wali.absensi.store');
    Route::delete('/wali/absensi/delete/{id}', [AbsensiController::class, 'destroy'])->name('wali.absensi.destroy');

    Route::get('/wali/nilai', [NilaiController::class, 'index'])->name('wali.nilai');
    Route::post('/wali/nilai/store', [NilaiController::class, 'store'])->name('wali.nilai.store');
    Route::put('/wali/nilai/update/{id}', [NilaiController::class, 'update'])->name('wali.nilai.update');

    Route::get('/wali/extra', [NilaiExtraController::class, 'index'])->name('wali.extra');
    Route::put('/wali/extra/update/{id}', [NilaiExtraController::class, 'update'])->name('wali.extra.update');

    Route::get('/wali/rapor', [WaliKelasController::class, 'raporIndex'])->name('wali.rapor');
});
Route::get('/wali/rapor/cetak/{id}', [RaporController::class, 'cetak'])->name('wali.rapor.cetak');

Route::middleware(['auth', 'role:kepala_sekolah'])->group(function () {
    Route::get('/kepala/dashboard', [KepalaSekolahController::class, 'index'])->name('kepala.dashboard');
    Route::get('/kepala/kurikulum', [KelasMapelSemesterController::class, 'index'])->name('kepala.kurikulum');
    Route::post('/kepala/kurikulum/store', [KelasMapelSemesterController::class, 'store'])->name('kepala.kurikulum.store');
    Route::put('/kepala/kurikulum/update/{id}', [KelasMapelSemesterController::class, 'update'])->name('kepala.kurikulum.update');
    Route::delete('/kepala/kurikulum/delete/{id}', [KelasMapelSemesterController::class, 'destroy'])->name('kepala.kurikulum.destroy');
    Route::delete('/kepala/kurikulum/delete-mapel/{id}', [KelasMapelSemesterController::class, 'deleteMapel'])->name('kepala.kurikulum.destroy.mapel');
    Route::post('/kepala/kurikulum/add-mapel', [KelasMapelSemesterController::class, 'addMapel'])->name('kepala.kurikulum.store.mapel');

    Route::get('/kepala/rapor', [KepalaSekolahController::class, 'raporIndex'])->name('kepala.rapor');
});

Route::middleware(['auth', 'role:siswa'])->group(function () {
    Route::get('/siswa/dashboard', [SiswaController::class, 'dashboardsiswa'])->name('siswa.dashboard');

    Route::get('/siswa/extra', [ExtraController::class, 'Siswaindex'])->name('siswa.extra');
    Route::post('/siswa/extra/store/{id}', [ExtraController::class, 'Regisextra'])->name('siswa.extra.store');
});

require __DIR__ . '/auth.php';
