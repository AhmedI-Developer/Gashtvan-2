<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOfferRequest;
use App\Http\Requests\UpdateOfferRequest;
use App\Http\Resources\OfferResource;
use App\Models\Offer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AdminOfferController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        $offers = Offer::query()
            ->orderBy('sort_order')
            ->orderByDesc('id')
            ->get();

        return OfferResource::collection($offers);
    }

    public function show(int $id): OfferResource
    {
        return new OfferResource(Offer::query()->findOrFail($id));
    }

    public function store(StoreOfferRequest $request): JsonResponse
    {
        $offer = Offer::query()->create(
            $this->payload($request->validated(), $request->file('image')),
        );

        return (new OfferResource($offer))
            ->response()
            ->setStatusCode(201);
    }

    public function update(UpdateOfferRequest $request, int $id): OfferResource
    {
        $offer = Offer::query()->findOrFail($id);
        $offer->update(
            $this->payload($request->validated(), $request->file('image'), $offer->image_path),
        );

        return new OfferResource($offer->fresh());
    }

    public function destroy(int $id): JsonResponse
    {
        $offer = Offer::query()->findOrFail($id);

        if ($offer->image_path && ! Str::startsWith($offer->image_path, ['http://', 'https://'])) {
            Storage::disk('public')->delete($offer->image_path);
        }

        $offer->delete();

        return response()->json(['message' => 'Offer deleted.']);
    }

    /**
     * @param  array<string, mixed>  $validated
     * @return array<string, mixed>
     */
    private function payload(array $validated, mixed $image, ?string $existingPath = null): array
    {
        unset($validated['image']);

        if (array_key_exists('includes', $validated)) {
            $validated['includes'] = $this->normalizeIncludes($validated['includes']);
        }

        $validated['slug'] = filled($validated['slug'] ?? null)
            ? Str::slug($validated['slug'])
            : Str::slug($validated['title']);
        $validated['is_featured'] = (bool) ($validated['is_featured'] ?? false);
        $validated['is_active'] = array_key_exists('is_active', $validated)
            ? (bool) $validated['is_active']
            : true;
        $validated['currency'] = $validated['currency'] ?? 'USD';
        $validated['sort_order'] = (int) ($validated['sort_order'] ?? 0);
        $validated['duration_days'] = isset($validated['duration_days']) && $validated['duration_days'] !== ''
            ? (int) $validated['duration_days']
            : null;

        if ($image) {
            if ($existingPath && ! Str::startsWith($existingPath, ['http://', 'https://'])) {
                Storage::disk('public')->delete($existingPath);
            }
            $validated['image_path'] = $image->store('offers', 'public');
        }

        return $validated;
    }

    /**
     * @return list<string>|null
     */
    private function normalizeIncludes(mixed $includes): ?array
    {
        if ($includes === null || $includes === '' || $includes === []) {
            return null;
        }

        if (is_string($includes)) {
            $decoded = json_decode($includes, true);
            $includes = is_array($decoded) ? $decoded : array_filter(array_map('trim', explode(',', $includes)));
        }

        if (! is_array($includes)) {
            return null;
        }

        return array_values(array_unique(array_map('strval', $includes)));
    }
}
