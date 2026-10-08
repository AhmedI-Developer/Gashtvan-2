<?php

namespace App\Http\Resources;

use App\Enums\OfferInclude;
use App\Models\Offer;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Offer */
class OfferResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $includes = collect($this->includes ?? [])
            ->map(function (string $value) {
                $enum = OfferInclude::tryFrom($value);

                return [
                    'value' => $value,
                    'label' => $enum?->label() ?? ucfirst($value),
                ];
            })
            ->values()
            ->all();

        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'category' => $this->category?->value,
            'category_label' => $this->category?->label(),
            'destination' => $this->destination,
            'summary' => $this->summary,
            'description' => $this->description,
            'includes' => $includes,
            'price' => $this->price !== null ? (float) $this->price : null,
            'currency' => $this->currency,
            'duration_days' => $this->duration_days,
            'image_url' => $this->imageUrl(),
            'is_featured' => $this->is_featured,
            'is_active' => $this->is_active,
            'sort_order' => $this->sort_order,
            'created_at' => $this->created_at?->toIso8601String(),
            'updated_at' => $this->updated_at?->toIso8601String(),
        ];
    }
}
