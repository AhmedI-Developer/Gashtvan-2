<?php

use App\Models\ContactMessage;

it('stores a contact message', function () {
    $this->postJson('/api/contact', [
        'name' => 'Ahmad',
        'email' => 'ahmad@example.com',
        'phone' => '+9647500000000',
        'message' => 'I would like a fare to Cairo next month.',
    ])->assertCreated()
        ->assertJsonPath('message', 'Message received.');

    expect(ContactMessage::query()->where('email', 'ahmad@example.com')->exists())->toBeTrue();
});

it('rejects a contact message that is too short', function () {
    $this->postJson('/api/contact', [
        'name' => 'Ahmad',
        'email' => 'ahmad@example.com',
        'phone' => '+9647500000000',
        'message' => 'short',
    ])->assertUnprocessable()
        ->assertJsonValidationErrors('message');

    expect(ContactMessage::query()->count())->toBe(0);
});
