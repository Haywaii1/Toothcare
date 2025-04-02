<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('doctors', function (Blueprint $table) {
            $table->integer('experience')->after('service');
            $table->string('availability')->after('experience');
            $table->decimal('rating', 2, 1)->after('availability');
        });
    }

    public function down(): void
    {
        Schema::table('doctors', function (Blueprint $table) {
            $table->dropColumn(['experience', 'availability', 'rating']);
        });
    }
};
