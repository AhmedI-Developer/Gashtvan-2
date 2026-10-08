<?php

use App\Models\Offer;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

it('requires auth for admin offer routes', function () {
    $this->getJson('/api/admin/offers')->assertUnauthorized();
});

it('logs in and manages offers with image upload', function () {
    Storage::fake('public');

    $user = User::factory()->create([
        'email' => 'admin@test.com',
        'password' => 'password',
    ]);

    $login = $this->postJson('/api/admin/login', [
        'email' => 'admin@test.com',
        'password' => 'password',
    ])->assertOk();

    $token = $login->json('token');
    expect($token)->not->toBeEmpty();

    $create = $this->withToken($token)->post('/api/admin/offers', [
        'title' => 'Erbil Fare Deal',
        'category' => 'ticket',
        'destination' => 'Istanbul',
        'price' => 199,
        'currency' => 'USD',
        'is_featured' => '1',
        'is_active' => '1',
        'includes' => json_encode(['ticket']),
        'image' => UploadedFile::fake()->image('deal.jpg'),
    ])->assertCreated();

    $id = $create->json('data.id');
    expect($create->json('data.image_url'))->not->toBeNull();

    $this->withToken($token)
        ->getJson('/api/admin/offers')
        ->assertOk()
        ->assertJsonCount(1, 'data');

    $this->withToken($token)
        ->post("/api/admin/offers/{$id}", [
            'title' => 'Erbil Fare Deal Updated',
            'category' => 'ticket',
            'destination' => 'Istanbul',
            'price' => 189,
            'is_active' => '1',
            '_method' => 'PUT',
        ])
        ->assertOk()
        ->assertJsonPath('data.title', 'Erbil Fare Deal Updated');

    $this->withToken($token)
        ->deleteJson("/api/admin/offers/{$id}")
        ->assertOk();

    expect(Offer::query()->count())->toBe(0);

    $this->withToken($token)
        ->postJson('/api/admin/logout')
        ->assertOk();

    $this->withToken($token)
        ->getJson('/api/admin/offers')
        ->assertUnauthorized();

    expect($user->fresh()->api_token)->toBeNull();
});
