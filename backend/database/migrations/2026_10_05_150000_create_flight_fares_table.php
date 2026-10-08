<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('flight_fares', function (Blueprint $table) {
            $table->id();
            $table->string('origin')->default('Erbil');
            $table->string('origin_code', 8)->default('EBL');
            $table->string('destination');
            $table->string('destination_code', 8)->nullable();
            $table->string('airline');
            $table->string('airline_logo', 64)->nullable();
            $table->decimal('price', 12, 2);
            $table->string('currency', 8)->default('USD');
            $table->string('trip_type', 16)->default('round_trip');
            $table->string('cabin', 24)->default('economy');
            $table->string('notes')->nullable();
            $table->boolean('is_active')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();

            $table->index(['is_active', 'destination']);
            $table->index(['is_active', 'airline']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('flight_fares');
    }
};
