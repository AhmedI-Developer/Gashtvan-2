<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\FlightFareResource;
use App\Models\FlightFare;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class FlightFareController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = FlightFare::query()
            ->active()
            ->orderBy('sort_order')
            ->orderBy('destination')
            ->orderBy('price');

        if ($request->filled('destination')) {
            $destination = $request->string('destination')->toString();
            $query->where(function ($q) use ($destination): void {
                $q->where('destination', 'like', "%{$destination}%")
                    ->orWhere('destination_code', 'like', "%{$destination}%");
            });
        }

        if ($request->filled('airline')) {
            $query->where('airline_logo', $request->string('airline')->toString());
        }

        if ($request->filled('q')) {
            $q = $request->string('q')->toString();
            $query->where(function ($builder) use ($q): void {
                $builder->where('destination', 'like', "%{$q}%")
                    ->orWhere('destination_code', 'like', "%{$q}%")
                    ->orWhere('airline', 'like', "%{$q}%")
                    ->orWhere('origin', 'like', "%{$q}%");
            });
        }

        return FlightFareResource::collection($query->get());
    }
}
