<?php

namespace Database\Seeders;

use App\Enums\OfferCategory;
use App\Models\Offer;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class OfferPackageSeeder extends Seeder
{
    public function run(): void
    {
        User::query()->updateOrCreate(
            ['email' => 'admin@gashtvan.com'],
            [
                'name' => 'Gashtvan Admin',
                'password' => Hash::make('password'),
            ],
        );

        $offers = [
            [
                'title' => 'Istanbul Weekend Flight Special',
                'slug' => 'istanbul-weekend-flight',
                'category' => OfferCategory::Ticket,
                'destination' => 'Istanbul',
                'summary' => 'Round-trip fares from Erbil with flexible dates.',
                'description' => 'Book international tickets with Gashtvan IATA consultants. Best available fares via Amadeus GDS.',
                'price' => 289,
                'is_featured' => true,
                'image_path' => 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80',
                'sort_order' => 1,
            ],
            [
                'title' => 'Dubai Luxury Hotel Deal',
                'slug' => 'dubai-luxury-hotel',
                'category' => OfferCategory::Hotel,
                'destination' => 'Dubai',
                'summary' => 'Handpicked 5-star stays with competitive allotments.',
                'description' => 'Access Gashtvan’s hotel network of over 10,000 properties — from resorts to city luxury hotels.',
                'price' => 149,
                'is_featured' => true,
                'image_path' => 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
                'sort_order' => 2,
            ],
            [
                'title' => 'Schengen Visa Assistance',
                'slug' => 'schengen-visa-assistance',
                'category' => OfferCategory::Visa,
                'destination' => 'Europe',
                'summary' => 'Forms, appointments, translations, and document guidance.',
                'description' => 'Our visa team supports Schengen and worldwide applications end to end.',
                'price' => 95,
                'is_featured' => true,
                'image_path' => 'https://images.unsplash.com/photo-1529074963764-98f45c47344b?auto=format&fit=crop&w=1200&q=80',
                'sort_order' => 3,
            ],
            [
                'title' => 'Amman Royal Jordanian Fare',
                'slug' => 'amman-royal-jordanian',
                'category' => OfferCategory::Ticket,
                'destination' => 'Amman',
                'summary' => 'Preferred rates via Royal Jordanian GSA Kurdistan.',
                'description' => 'Leverage Gashtvan’s airline partnerships for competitive Amman routes.',
                'price' => 210,
                'is_featured' => false,
                'image_path' => 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80',
                'sort_order' => 4,
            ],
            [
                'title' => 'Antalya Beach Resort Stay',
                'slug' => 'antalya-beach-resort',
                'category' => OfferCategory::Hotel,
                'destination' => 'Antalya',
                'summary' => 'All-inclusive resort options for families and groups.',
                'price' => 120,
                'is_featured' => false,
                'image_path' => 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80',
                'sort_order' => 5,
            ],
            [
                'title' => 'Georgia Discovery Tour',
                'slug' => 'georgia-discovery-tour',
                'category' => OfferCategory::Tour,
                'destination' => 'Tbilisi',
                'summary' => 'Guided cultural itinerary with transfers.',
                'price' => 540,
                'is_featured' => false,
                'image_path' => 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&w=1200&q=80',
                'sort_order' => 6,
            ],
            [
                'title' => 'Istanbul City Break Bundle',
                'slug' => 'istanbul-city-break-bundle',
                'category' => OfferCategory::Bundle,
                'destination' => 'Istanbul',
                'summary' => 'Flight + hotel for a seamless weekend escape.',
                'description' => 'Includes round-trip ticket and curated hotel stay. Optional visa support available on request.',
                'includes' => ['ticket', 'hotel'],
                'price' => 499,
                'duration_days' => 4,
                'is_featured' => true,
                'image_path' => 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80',
                'sort_order' => 7,
            ],
            [
                'title' => 'Dubai Complete Escape',
                'slug' => 'dubai-complete-escape',
                'category' => OfferCategory::Bundle,
                'destination' => 'Dubai',
                'summary' => 'Ticket, hotel, and visa assistance in one offer.',
                'description' => 'Ideal for travelers who want flights, accommodation, and paperwork handled together.',
                'includes' => ['ticket', 'hotel', 'visa'],
                'price' => 890,
                'duration_days' => 5,
                'is_featured' => true,
                'image_path' => 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
                'sort_order' => 8,
            ],
            [
                'title' => 'Europe Schengen Starter',
                'slug' => 'europe-schengen-starter',
                'category' => OfferCategory::Bundle,
                'destination' => 'Europe',
                'summary' => 'Visa processing with flight booking support.',
                'description' => 'Gashtvan handles Schengen documentation and flight reservations for your European journey.',
                'includes' => ['ticket', 'visa'],
                'price' => 650,
                'duration_days' => 7,
                'is_featured' => true,
                'image_path' => 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80',
                'sort_order' => 9,
            ],
            [
                'title' => 'Antalya Family Bundle',
                'slug' => 'antalya-family-bundle',
                'category' => OfferCategory::Bundle,
                'destination' => 'Antalya',
                'summary' => 'Ticket, resort hotel, and airport transfers.',
                'includes' => ['ticket', 'hotel', 'transfer'],
                'price' => 720,
                'duration_days' => 6,
                'is_featured' => false,
                'image_path' => 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80',
                'sort_order' => 10,
            ],
        ];

        foreach ($offers as $offer) {
            Offer::query()->updateOrCreate(['slug' => $offer['slug']], $offer + [
                'currency' => 'USD',
                'is_active' => true,
                'description' => $offer['description'] ?? $offer['summary'],
                'includes' => $offer['includes'] ?? null,
                'duration_days' => $offer['duration_days'] ?? null,
            ]);
        }
    }
}
