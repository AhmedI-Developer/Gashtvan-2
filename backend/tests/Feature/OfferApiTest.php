<?php

use App\Models\Offer;

it('lists active offers and can filter by category', function () {
    Offer::factory()->create(['categories' => ['ticket'], 'title' => 'Flight A', 'slug' => 'flight-a', 'is_active' => true]);
    Offer::factory()->create(['categories' => ['hotel'], 'title' => 'Hotel B', 'slug' => 'hotel-b', 'is_active' => true]);
    Offer::factory()->create(['categories' => ['ticket', 'visa'], 'title' => 'Combo', 'slug' => 'combo-offer', 'is_active' => true]);
    Offer::factory()->create(['categories' => ['visa'], 'title' => 'Hidden Visa', 'slug' => 'hidden-visa', 'is_active' => false]);

    $this->getJson('/api/offers')
        ->assertOk()
        ->assertJsonCount(3, 'data');

    $this->getJson('/api/offers?category=ticket')
        ->assertOk()
        ->assertJsonCount(2, 'data');
});

it('returns featured offers with limit', function () {
    Offer::factory()->featured()->create(['slug' => 'feat-1', 'is_active' => true]);
    Offer::factory()->featured()->create(['slug' => 'feat-2', 'is_active' => true]);
    Offer::factory()->create(['slug' => 'not-feat', 'is_featured' => false, 'is_active' => true]);

    $this->getJson('/api/offers?featured=1&limit=3')
        ->assertOk()
        ->assertJsonCount(2, 'data');
});

it('shows a single active offer by slug', function () {
    Offer::factory()->create(['slug' => 'dubai-hotel', 'title' => 'Dubai Hotel', 'is_active' => true]);

    $this->getJson('/api/offers/dubai-hotel')
        ->assertOk()
        ->assertJsonPath('data.slug', 'dubai-hotel');
});
