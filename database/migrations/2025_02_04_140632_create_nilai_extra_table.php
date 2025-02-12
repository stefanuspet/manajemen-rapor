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
        Schema::create('nilai_extra', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("extra_id");
            $table->unsignedBigInteger("siswa_id");
            $table->unsignedBigInteger("semester_id");
            $table->String("Keterangan")->nullable(true);

            $table->foreign("extra_id")->references("id")->on("extra");
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
        Schema::dropIfExists('nilai_extra');
    }
};
