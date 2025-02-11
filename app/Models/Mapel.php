<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Mapel extends Model
{
    protected $table = 'mapel';
    protected $fillable = ['nama_mapel', 'guru_id'];

    public function guru()
    {
        return $this->belongsTo(Guru::class);
    }

    public function kelasMapelSemester()
    {
        return $this->hasMany(KelasMapelSemester::class, 'mapel_id', 'id');
    }

    public function nilai()
    {
        return $this->hasMany(Nilai::class);
    }
}
