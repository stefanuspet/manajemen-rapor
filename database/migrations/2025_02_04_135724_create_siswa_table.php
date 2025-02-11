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
        Schema::create('siswa', function (Blueprint $table) {
            $table->id();
            $table->integer("nisn")->unique();
            $table->string("nama");
            $table->unsignedBigInteger("kelas_id");
            $table->unsignedBigInteger("user_id")->nullable(true);

            $table->foreign("kelas_id")->references("id")->on("kelas");
            $table->foreign("user_id")->references("id")->on("users")->onDelete("set null");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('siswa');
    }
};
