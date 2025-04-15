<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('teams', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('role');
            $table->integer('experience');
            $table->string('specialty');
            $table->string('availability');
            $table->text('bio');
            $table->string('image')->nullable(); // Add this line for image
            $table->timestamps();
        });
    }



    public function down(): void
    {
        Schema::dropIfExists('teams');
    }
};
