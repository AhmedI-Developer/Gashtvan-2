<?php

namespace App\Http\Resources;

use App\Models\FlightFare;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin FlightFare */
class FlightFareResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'origin' => $this->origin,
            'origin_code' => $this->origin_code,
            'destination' => $this->destination,
            'destination_code' => $this->destination_code,
            'airline' => $this->airline,
            'airline_logo' => $this->airline_logo,
            'price' => $this->price !== null ? (float) $this->price : null,
            'currency' => $this->currency,
            'trip_type' => $this->trip_type,
            'cabin' => $this->cabin,
            'notes' => $this->notes,
            'is_active' => $this->is_active,
            'sort_order' => $this->sort_order,
            'created_at' => $this->created_at?->toIso8601String(),
            'updated_at' => $this->updated_at?->toIso8601String(),
        ];
    }
}
