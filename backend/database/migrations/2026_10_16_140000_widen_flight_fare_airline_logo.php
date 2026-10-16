<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('flight_fares', function (Blueprint $table) {
            $table->string('airline_logo', 2048)->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('flight_fares', function (Blueprint $table) {
            $table->string('airline_logo', 64)->nullable()->change();
        });
    }
};
