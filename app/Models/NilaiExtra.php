<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NilaiExtra extends Model
{
    protected $table = 'nilai_extra';

    protected $fillable = [
        'extra_id',
        'siswa_id',
        'semester_id',
        'keterangan',
    ];

    public function siswa()
    {
        return $this->belongsTo(Siswa::class, 'siswa_id');
    }

    public function semester()
    {
        return $this->belongsTo(Semester::class, 'semester_id');
    }

    public function extra()
    {
        return $this->belongsTo(Extra::class, 'extra_id');
    }
}
