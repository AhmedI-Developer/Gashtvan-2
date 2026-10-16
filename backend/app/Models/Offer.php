<?php

namespace App\Models;

use App\Enums\OfferCategory;
use Database\Factories\OfferFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

#[Fillable([
    'title',
    'slug',
    'categories',
    'destination',
    'summary',
    'description',
    'includes',
    'price',
    'currency',
    'duration_days',
    'image_path',
    'is_featured',
    'is_active',
    'sort_order',
])]
class Offer extends Model
{
    /** @use HasFactory<OfferFactory> */
    use HasFactory;

    protected function casts(): array
    {
        return [
            'categories' => 'array',
            'includes' => 'array',
            'price' => 'decimal:2',
            'duration_days' => 'integer',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    protected static function booted(): void
    {
        static::saving(function (Offer $offer): void {
            if (blank($offer->slug) && filled($offer->title)) {
                $offer->slug = Str::slug($offer->title);
            }

            $offer->categories = self::normalizeCategories($offer->categories);
        });
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function imageUrl(): ?string
    {
        if (blank($this->image_path)) {
            return null;
        }

        if (Str::startsWith($this->image_path, ['http://', 'https://'])) {
            return $this->image_path;
        }

        return url(Storage::disk('public')->url($this->image_path));
    }

    /**
     * Primary category for legacy clients (first selected).
     */
    public function primaryCategory(): ?OfferCategory
    {
        $first = $this->categories[0] ?? null;

        return is_string($first) ? OfferCategory::tryFrom($first) : null;
    }

    /**
     * @return list<string>
     */
    public static function normalizeCategories(mixed $categories): array
    {
        if (is_string($categories)) {
            $decoded = json_decode($categories, true);
            $categories = is_array($decoded) ? $decoded : [$categories];
        }

        if (! is_array($categories)) {
            return [OfferCategory::Ticket->value];
        }

        $allowed = OfferCategory::values();
        $normalized = [];

        foreach ($categories as $value) {
            $value = is_string($value) ? strtolower(trim($value)) : '';
            if ($value !== '' && in_array($value, $allowed, true) && ! in_array($value, $normalized, true)) {
                $normalized[] = $value;
            }
        }

        return $normalized !== [] ? $normalized : [OfferCategory::Ticket->value];
    }

    #[Scope]
    protected function active(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    #[Scope]
    protected function featured(Builder $query): Builder
    {
        return $query->where('is_featured', true);
    }

    #[Scope]
    protected function category(Builder $query, OfferCategory|string $category): Builder
    {
        $value = $category instanceof OfferCategory ? $category->value : $category;

        return $query->whereJsonContains('categories', $value);
    }
}
