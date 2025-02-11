<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Extra extends Model
{
    protected $table = 'extra';
    protected $fillable = ['nama_extra', 'guru_id'];

    public function guru()
    {
        return $this->belongsTo(Guru::class);
    }

    public function nilaiExtra()
    {
        return $this->hasMany(NilaiExtra::class);
    }
}
