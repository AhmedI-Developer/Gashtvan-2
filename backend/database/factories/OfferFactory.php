<?php

namespace Database\Factories;

use App\Enums\OfferCategory;
use App\Models\Offer;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Offer>
 */
class OfferFactory extends Factory
{
    protected $model = Offer::class;

    public function definition(): array
    {
        $title = fake()->unique()->sentence(3);

        return [
            'title' => $title,
            'slug' => Str::slug($title).'-'.fake()->unique()->numberBetween(1, 9999),
            'categories' => [fake()->randomElement(OfferCategory::cases())->value],
            'destination' => fake()->city(),
            'summary' => fake()->sentence(12),
            'description' => fake()->paragraphs(3, true),
            'price' => fake()->randomFloat(2, 80, 2500),
            'currency' => 'USD',
            'image_path' => 'offers/amman.jpg',
            'is_featured' => false,
            'is_active' => true,
            'sort_order' => 0,
        ];
    }

    public function featured(): static
    {
        return $this->state(fn () => ['is_featured' => true]);
    }
}
