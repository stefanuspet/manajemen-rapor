<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Guru extends Model
{
    protected $table = 'guru';
    protected $fillable = ['nip', 'nama', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function kelas()
    {
        return $this->hasOne(Kelas::class, 'wali_kelas_id', 'id');
    }

    public function mapel()
    {
        return $this->hasMany(Mapel::class);
    }

    public function extra()
    {
        return $this->hasMany(Extra::class);
    }
}
