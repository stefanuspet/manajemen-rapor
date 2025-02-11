<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('absensi', function (Blueprint $table) {
            $table->id();
            $table->enum("status", ["sakit", "izin", "Alfa"]);
            $table->unsignedBigInteger("siswa_id");
            $table->unsignedBigInteger("semester_id");
            $table->date("tanggal_absensi");

            $table->foreign("siswa_id")->references("id")->on("siswa");
            $table->foreign("semester_id")->references("id")->on("semester");

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('absensi');
    }
};
