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
        Schema::create('extra', function (Blueprint $table) {
            $table->id();
            $table->string("nama_extra");
            $table->unsignedBigInteger("guru_id");

            $table->foreign("guru_id")->references("id")->on("guru");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('extra');
    }
};
