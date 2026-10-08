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
    'category',
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
            'category' => OfferCategory::class,
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

        return $query->where('category', $value);
    }
}
