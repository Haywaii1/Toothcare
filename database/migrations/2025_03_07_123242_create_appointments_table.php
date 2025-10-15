<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('name'); // Add this
            $table->string('email'); // Add this
            $table->string('phone'); // Add this
            $table->date('date');
            $table->string('ailment')->nullable();
            $table->text('message')->nullable();
            $table->timestamps();
        });

    }

    public function down()
    {
        Schema::dropIfExists('appointments');
    }
};
