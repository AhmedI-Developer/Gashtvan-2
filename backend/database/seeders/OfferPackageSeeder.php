<?php

namespace Database\Seeders;

use App\Models\Offer;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

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

        $this->syncSeedImages();

        $offers = [
            [
                'title' => 'Istanbul Weekend Flight Special',
                'slug' => 'istanbul-weekend-flight',
                'categories' => ['ticket'],
                'destination' => 'Istanbul',
                'summary' => 'Round-trip fares from Erbil with flexible dates.',
                'description' => 'Book international tickets with Gashtvan IATA consultants. Best available fares via Amadeus GDS.',
                'price' => 289,
                'is_featured' => true,
                'image_path' => 'offers/istanbul.jpg',
                'sort_order' => 1,
            ],
            [
                'title' => 'Dubai Luxury Hotel Deal',
                'slug' => 'dubai-luxury-hotel',
                'categories' => ['hotel'],
                'destination' => 'Dubai',
                'summary' => 'Handpicked 5-star stays with competitive allotments.',
                'description' => 'Access Gashtvan’s hotel network of over 10,000 properties — from resorts to city luxury hotels.',
                'price' => 149,
                'is_featured' => true,
                'image_path' => 'offers/dubai-hotel.jpg',
                'sort_order' => 2,
            ],
            [
                'title' => 'Schengen Visa Assistance',
                'slug' => 'schengen-visa-assistance',
                'categories' => ['visa'],
                'destination' => 'Europe',
                'summary' => 'Forms, appointments, translations, and document guidance.',
                'description' => 'Our visa team supports Schengen and worldwide applications end to end.',
                'price' => 95,
                'is_featured' => true,
                'image_path' => 'offers/visa-schengen.jpg',
                'sort_order' => 3,
            ],
            [
                'title' => 'Amman Royal Jordanian Fare',
                'slug' => 'amman-royal-jordanian',
                'categories' => ['ticket'],
                'destination' => 'Amman',
                'summary' => 'Preferred rates via Royal Jordanian GSA Kurdistan.',
                'description' => 'Leverage Gashtvan’s airline partnerships for competitive Amman routes.',
                'price' => 210,
                'is_featured' => false,
                'image_path' => 'offers/amman.jpg',
                'sort_order' => 4,
            ],
            [
                'title' => 'Antalya Beach Resort Stay',
                'slug' => 'antalya-beach-resort',
                'categories' => ['hotel'],
                'destination' => 'Antalya',
                'summary' => 'All-inclusive resort options for families and groups.',
                'price' => 120,
                'is_featured' => false,
                'image_path' => 'offers/antalya.jpg',
                'sort_order' => 5,
            ],
            [
                'title' => 'Istanbul City Break',
                'slug' => 'istanbul-city-break-bundle',
                'categories' => ['ticket', 'hotel'],
                'destination' => 'Istanbul',
                'summary' => 'Flight + hotel for a seamless weekend escape.',
                'description' => 'Includes round-trip ticket and curated hotel stay. Optional visa support available on request.',
                'includes' => ['ticket', 'hotel'],
                'price' => 499,
                'duration_days' => 4,
                'is_featured' => true,
                'image_path' => 'offers/istanbul.jpg',
                'sort_order' => 6,
            ],
            [
                'title' => 'Dubai Complete Escape',
                'slug' => 'dubai-complete-escape',
                'categories' => ['ticket', 'hotel', 'visa'],
                'destination' => 'Dubai',
                'summary' => 'Ticket, hotel, and visa assistance in one offer.',
                'description' => 'Ideal for travelers who want flights, accommodation, and paperwork handled together.',
                'includes' => ['ticket', 'hotel', 'visa'],
                'price' => 890,
                'duration_days' => 5,
                'is_featured' => true,
                'image_path' => 'offers/dubai-city.jpg',
                'sort_order' => 7,
            ],
            [
                'title' => 'Europe Schengen Starter',
                'slug' => 'europe-schengen-starter',
                'categories' => ['ticket', 'visa'],
                'destination' => 'Europe',
                'summary' => 'Visa processing with flight booking support.',
                'description' => 'Gashtvan handles Schengen documentation and flight reservations for your European journey.',
                'includes' => ['ticket', 'visa'],
                'price' => 650,
                'duration_days' => 7,
                'is_featured' => true,
                'image_path' => 'offers/europe.jpg',
                'sort_order' => 8,
            ],
            [
                'title' => 'Antalya Family Escape',
                'slug' => 'antalya-family-bundle',
                'categories' => ['ticket', 'hotel'],
                'destination' => 'Antalya',
                'summary' => 'Ticket, resort hotel, and airport transfers.',
                'includes' => ['ticket', 'hotel', 'transfer'],
                'price' => 720,
                'duration_days' => 6,
                'is_featured' => false,
                'image_path' => 'offers/antalya.jpg',
                'sort_order' => 9,
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

        Offer::query()->where('slug', 'georgia-discovery-tour')->delete();
    }

    private function syncSeedImages(): void
    {
        $source = database_path('seeders/assets/offers');
        if (! is_dir($source)) {
            return;
        }

        Storage::disk('public')->makeDirectory('offers');

        foreach (File::files($source) as $file) {
            $target = 'offers/'.$file->getFilename();
            Storage::disk('public')->put($target, File::get($file->getPathname()));
        }
    }
}
