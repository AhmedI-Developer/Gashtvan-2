<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreFlightFareRequest;
use App\Http\Requests\UpdateFlightFareRequest;
use App\Http\Resources\FlightFareResource;
use App\Models\FlightFare;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class AdminFlightFareController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        $fares = FlightFare::query()
            ->orderBy('sort_order')
            ->orderBy('destination')
            ->orderByDesc('id')
            ->get();

        return FlightFareResource::collection($fares);
    }

    public function show(int $id): FlightFareResource
    {
        return new FlightFareResource(FlightFare::query()->findOrFail($id));
    }

    public function store(StoreFlightFareRequest $request): JsonResponse
    {
        $fare = FlightFare::query()->create($this->payload($request->validated()));

        return (new FlightFareResource($fare))
            ->response()
            ->setStatusCode(201);
    }

    public function update(UpdateFlightFareRequest $request, int $id): FlightFareResource
    {
        $fare = FlightFare::query()->findOrFail($id);
        $fare->update($this->payload($request->validated()));

        return new FlightFareResource($fare->fresh());
    }

    public function destroy(int $id): JsonResponse
    {
        FlightFare::query()->findOrFail($id)->delete();

        return response()->json(['message' => 'Fare deleted.']);
    }

    /**
     * @param  array<string, mixed>  $validated
     * @return array<string, mixed>
     */
    private function payload(array $validated): array
    {
        $validated['origin'] = $validated['origin'] ?? 'Erbil';
        $validated['origin_code'] = strtoupper($validated['origin_code'] ?? 'EBL');
        $validated['destination_code'] = isset($validated['destination_code'])
            ? strtoupper((string) $validated['destination_code'])
            : null;
        $validated['currency'] = $validated['currency'] ?? 'USD';
        $validated['trip_type'] = $validated['trip_type'] ?? 'round_trip';
        $validated['cabin'] = $validated['cabin'] ?? 'economy';
        $validated['is_active'] = array_key_exists('is_active', $validated)
            ? (bool) $validated['is_active']
            : true;
        $validated['sort_order'] = (int) ($validated['sort_order'] ?? 0);
        $validated['price'] = (float) $validated['price'];

        return $validated;
    }
}
