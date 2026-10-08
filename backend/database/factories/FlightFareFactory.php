<?php

namespace Database\Factories;

use App\Models\FlightFare;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<FlightFare>
 */
class FlightFareFactory extends Factory
{
    protected $model = FlightFare::class;

    public function definition(): array
    {
        return [
            'origin' => 'Erbil',
            'origin_code' => 'EBL',
            'destination' => fake()->city(),
            'destination_code' => strtoupper(fake()->lexify('???')),
            'airline' => 'Turkish Airlines',
            'airline_logo' => 'turkishAirline',
            'price' => fake()->randomFloat(2, 120, 900),
            'currency' => 'USD',
            'trip_type' => 'round_trip',
            'cabin' => 'economy',
            'notes' => null,
            'is_active' => true,
            'sort_order' => 0,
        ];
    }
}
