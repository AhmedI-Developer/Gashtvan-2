<?php

namespace App\Http\Controllers\Api;

use App\Enums\OfferCategory;
use App\Http\Controllers\Controller;
use App\Http\Resources\OfferResource;
use App\Models\Offer;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class OfferController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Offer::query()
            ->active()
            ->orderBy('sort_order')
            ->orderByDesc('id');

        if ($request->filled('category')) {
            $category = OfferCategory::tryFrom($request->string('category')->toString());
            if ($category) {
                $query->category($category);
            }
        }

        if ($request->boolean('featured')) {
            $query->featured();
        }

        $limit = min(max((int) $request->integer('limit', 0), 0), 24);
        if ($limit > 0) {
            return OfferResource::collection($query->limit($limit)->get());
        }

        return OfferResource::collection($query->paginate(12));
    }

    public function show(Offer $offer): OfferResource
    {
        abort_unless($offer->is_active, 404);

        return new OfferResource($offer);
    }
}
