<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class KelasMapelSemester extends Pivot
{
    // Nama tabel pivot, karena Laravel secara default mencari tabel dengan format "model1_model2"
    protected $table = 'kelas_mapel_semester';

    // Jika perlu, bisa tambahkan fillable atau guarded jika ingin mengatur kolom mana yang bisa diisi
    protected $fillable = ['kelas_id', 'mapel_id', 'semester_id'];

    // Jika pivot memiliki timestamp, kamu bisa menambahkan ini
    public $timestamps = true;

    // Menambahkan relasi, jika diperlukan
    public function kelas()
    {
        return $this->belongsTo(Kelas::class);
    }

    public function mapel()
    {
        return $this->belongsTo(Mapel::class);
    }

    public function semester()
    {
        return $this->belongsTo(Semester::class);
    }
}
