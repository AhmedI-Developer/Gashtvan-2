<?php

namespace App\Models;

use Database\Factories\FlightFareFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'origin',
    'origin_code',
    'destination',
    'destination_code',
    'airline',
    'airline_logo',
    'price',
    'currency',
    'trip_type',
    'cabin',
    'notes',
    'is_active',
    'sort_order',
])]
class FlightFare extends Model
{
    /** @use HasFactory<FlightFareFactory> */
    use HasFactory;

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    #[Scope]
    protected function active(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }
}
