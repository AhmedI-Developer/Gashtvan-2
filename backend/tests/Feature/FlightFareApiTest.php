<?php

use App\Models\FlightFare;
use App\Models\User;

it('lists active flight fares and can filter by destination', function () {
    FlightFare::factory()->create([
        'destination' => 'Istanbul',
        'destination_code' => 'IST',
        'is_active' => true,
        'price' => 280,
    ]);
    FlightFare::factory()->create([
        'destination' => 'Dubai',
        'destination_code' => 'DXB',
        'is_active' => true,
        'price' => 300,
    ]);
    FlightFare::factory()->create([
        'destination' => 'Hidden',
        'destination_code' => 'HID',
        'is_active' => false,
        'price' => 100,
    ]);

    $this->getJson('/api/fares')
        ->assertOk()
        ->assertJsonCount(2, 'data');

    $this->getJson('/api/fares?destination=Istanbul')
        ->assertOk()
        ->assertJsonCount(1, 'data')
        ->assertJsonPath('data.0.destination_code', 'IST');
});

it('allows admin to create and delete fares', function () {
    User::factory()->create([
        'email' => 'fare-admin@test.com',
        'password' => 'password',
    ]);

    $token = $this->postJson('/api/admin/login', [
        'email' => 'fare-admin@test.com',
        'password' => 'password',
    ])->json('token');

    $created = $this->withToken($token)->postJson('/api/admin/fares', [
        'destination' => 'Doha',
        'destination_code' => 'doh',
        'airline' => 'Qatar Airways',
        'airline_logo' => 'qatarAirline',
        'price' => 410,
        'trip_type' => 'round_trip',
        'cabin' => 'economy',
        'is_active' => true,
    ])->assertCreated();

    expect($created->json('data.destination_code'))->toBe('DOH');

    $id = $created->json('data.id');

    $this->withToken($token)
        ->deleteJson("/api/admin/fares/{$id}")
        ->assertOk();

    expect(FlightFare::query()->count())->toBe(0);
});
