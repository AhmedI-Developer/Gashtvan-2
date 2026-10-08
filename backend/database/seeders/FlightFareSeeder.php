<?php

namespace Database\Seeders;

use App\Models\FlightFare;
use Illuminate\Database\Seeder;

class FlightFareSeeder extends Seeder
{
    public function run(): void
    {
        $fares = [
            [
                'destination' => 'Istanbul',
                'destination_code' => 'IST',
                'airline' => 'Turkish Airlines',
                'airline_logo' => 'turkishAirline',
                'price' => 289,
                'sort_order' => 1,
            ],
            [
                'destination' => 'Istanbul',
                'destination_code' => 'IST',
                'airline' => 'Pegasus via partner',
                'airline_logo' => 'turkishAirline',
                'price' => 249,
                'trip_type' => 'one_way',
                'sort_order' => 2,
            ],
            [
                'destination' => 'Dubai',
                'destination_code' => 'DXB',
                'airline' => 'Flydubai / partner',
                'airline_logo' => 'airArabia',
                'price' => 310,
                'sort_order' => 3,
            ],
            [
                'destination' => 'Amman',
                'destination_code' => 'AMM',
                'airline' => 'Royal Jordanian',
                'airline_logo' => 'royalJordanian',
                'price' => 210,
                'sort_order' => 4,
            ],
            [
                'destination' => 'Cairo',
                'destination_code' => 'CAI',
                'airline' => 'EgyptAir',
                'airline_logo' => 'egyptAir',
                'price' => 265,
                'sort_order' => 5,
            ],
            [
                'destination' => 'Doha',
                'destination_code' => 'DOH',
                'airline' => 'Qatar Airways',
                'airline_logo' => 'qatarAirline',
                'price' => 420,
                'cabin' => 'economy',
                'sort_order' => 6,
            ],
            [
                'destination' => 'Riyadh',
                'destination_code' => 'RUH',
                'airline' => 'Saudia',
                'airline_logo' => 'saudia',
                'price' => 355,
                'sort_order' => 7,
            ],
            [
                'destination' => 'Baghdad',
                'destination_code' => 'BGW',
                'airline' => 'Iraqi Airways',
                'airline_logo' => 'iraqAirways',
                'price' => 95,
                'trip_type' => 'one_way',
                'sort_order' => 8,
            ],
            [
                'destination' => 'Jeddah',
                'destination_code' => 'JED',
                'airline' => 'Saudia',
                'airline_logo' => 'saudia',
                'price' => 380,
                'notes' => 'Umrah seasonal fares available on request',
                'sort_order' => 9,
            ],
            [
                'destination' => 'Ankara',
                'destination_code' => 'ESB',
                'airline' => 'Turkish Airlines',
                'airline_logo' => 'turkishAirline',
                'price' => 275,
                'sort_order' => 10,
            ],
        ];

        foreach ($fares as $fare) {
            FlightFare::query()->updateOrCreate(
                [
                    'destination_code' => $fare['destination_code'],
                    'airline' => $fare['airline'],
                    'trip_type' => $fare['trip_type'] ?? 'round_trip',
                    'cabin' => $fare['cabin'] ?? 'economy',
                ],
                $fare + [
                    'origin' => 'Erbil',
                    'origin_code' => 'EBL',
                    'currency' => 'USD',
                    'trip_type' => $fare['trip_type'] ?? 'round_trip',
                    'cabin' => $fare['cabin'] ?? 'economy',
                    'is_active' => true,
                ],
            );
        }
    }
}
