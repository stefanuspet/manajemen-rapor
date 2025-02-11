<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kelas extends Model
{
    protected $table = 'kelas';
    protected $fillable = ['nama_kelas', 'wali_kelas_id', 'jurusan_id'];
    public $timestamps = true;

    public function siswa()
    {
        return $this->hasMany(Siswa::class, 'kelas_id', 'id');
    }

    public function waliKelas()
    {
        return $this->belongsTo(Guru::class, 'wali_kelas_id', 'id');
    }

    public function jurusan()
    {
        return $this->belongsTo(Jurusan::class);
    }

    public function kelasMapelSemester()
    {
        return $this->hasMany(KelasMapelSemester::class, 'kelas_id', 'id');
    }
}
