<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Semester extends Model
{
    protected $table = 'semester';
    protected $fillable = ['nama_semester', 'tahun_ajaran', 'status'];

    public function kelas()
    {
        return $this->hasMany(Kelas::class);
    }

    public function kelasMapelSemester()
    {
        return $this->hasMany(KelasMapelSemester::class);
    }

    public function absensi()
    {
        return $this->hasMany(Absensi::class);
    }

    public function nilai()
    {
        return $this->hasMany(Nilai::class);
    }

    public function nilaiExtra()
    {
        return $this->hasMany(NilaiExtra::class);
    }
}
