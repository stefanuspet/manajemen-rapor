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
        Schema::create('nilai', function (Blueprint $table) {
            $table->id();
            $table->integer("nilai")->default(0);
            $table->string("capaian_kompetensi");
            $table->unsignedBigInteger("siswa_id");
            $table->unsignedBigInteger("mapel_id");
            $table->unsignedBigInteger("semester_id");

            $table->foreign("siswa_id")->references("id")->on("siswa");
            $table->foreign("mapel_id")->references("id")->on("mapel");
            $table->foreign("semester_id")->references("id")->on("semester");

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nilai');
    }
};
