<?php

namespace App\Services;

use Illuminate\Http\Client\PendingRequest;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Throwable;

class TravelNewsService
{
    /** @var array<string, array{queries: list<string>, feeds: list<string>, icon: string, tag: string, image: string}> */
    private const REGIONS = [
        'Kurdistan' => [
            'queries' => [
                'Kurdistan travel',
                'Erbil airport',
                'Iraq tourism',
            ],
            'feeds' => [],
            'icon' => 'Mountain',
            'tag' => 'Kurdistan',
            'image' => 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
        ],
        'Middle East' => [
            'queries' => [
                'Dubai tourism',
                'Middle East travel',
                'Gulf airlines',
            ],
            'feeds' => [
                'https://www.aljazeera.com/xml/rss/all.xml',
            ],
            'icon' => 'Globe2',
            'tag' => 'Middle East',
            'image' => 'https://images.unsplash.com/photo-1512453979798-5ea8523dba54?auto=format&fit=crop&w=1200&q=80',
        ],
        'Europe' => [
            'queries' => [
                'Europe travel',
                'European tourism',
                'city break Europe',
            ],
            'feeds' => [
                'https://feeds.bbci.co.uk/news/travel/rss.xml',
                'https://www.theguardian.com/uk/travel/rss',
            ],
            'icon' => 'Landmark',
            'tag' => 'Europe',
            'image' => 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80',
        ],
    ];

    /**
     * @return list<array<string, mixed>>
     */
    public function fetch(): array
    {
        $cached = Cache::get('travel-news.v1');
        if (is_array($cached) && $cached !== []) {
            return $cached;
        }

        $items = [];

        foreach (self::REGIONS as $region => $meta) {
            $items = array_merge($items, $this->fetchRegion($region, $meta));
        }

        usort($items, fn (array $a, array $b): int => strcmp($b['date'] ?? '', $a['date'] ?? ''));

        // Never cache an empty payload — that locks the UI on failure for 30 minutes.
        if ($items !== []) {
            Cache::put('travel-news.v1', $items, now()->addMinutes(30));
        } else {
            Cache::forget('travel-news.v1');
            Log::warning('Travel news fetch returned no items.');
        }

        return $items;
    }

    /**
     * @param  array{queries: list<string>, feeds: list<string>, icon: string, tag: string, image: string}  $meta
     * @return list<array<string, mixed>>
     */
    private function fetchRegion(string $region, array $meta): array
    {
        $items = [];

        foreach ($meta['queries'] as $query) {
            $url = 'https://news.google.com/rss/search?'.http_build_query([
                'q' => $query,
                'hl' => 'en-US',
                'gl' => 'US',
                'ceid' => 'US:en',
            ]);
            $items = array_merge($items, $this->loadFeed($url, $region, $meta, filterTravel: false));
            if (count($items) >= 4) {
                break;
            }
        }

        if (count($items) < 4) {
            foreach ($meta['feeds'] as $feedUrl) {
                $items = array_merge($items, $this->loadFeed($feedUrl, $region, $meta, filterTravel: true));
                if (count($items) >= 4) {
                    break;
                }
            }
        }

        return array_slice($this->uniqueByUrl($items), 0, 4);
    }

    /**
     * @param  array{queries: list<string>, feeds: list<string>, icon: string, tag: string, image: string}  $meta
     * @return list<array<string, mixed>>
     */
    private function loadFeed(string $url, string $region, array $meta, bool $filterTravel = false): array
    {
        try {
            $response = $this->http()->get($url);

            if (! $response->successful()) {
                Log::warning('Travel news feed HTTP error', [
                    'url' => $url,
                    'status' => $response->status(),
                ]);

                return [];
            }

            return $this->parseRss($response->body(), $region, $meta, $filterTravel);
        } catch (Throwable $e) {
            Log::warning('Travel news feed failed', [
                'url' => $url,
                'message' => $e->getMessage(),
            ]);

            return [];
        }
    }

    private function http(): PendingRequest
    {
        $request = Http::timeout(15)
            ->withHeaders([
                'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept' => 'application/rss+xml, application/xml, text/xml, */*',
            ]);

        // Local Windows OpenSSL often lacks a CA bundle (cURL error 60).
        $verify = config('services.news.verify_ssl');
        $skipVerify = $verify === false
            || ($verify === null && app()->environment(['local', 'development']));

        if ($skipVerify) {
            return $request->withoutVerifying();
        }

        return $request;
    }

    /**
     * @param  array{queries: list<string>, feeds: list<string>, icon: string, tag: string, image: string}  $meta
     * @return list<array<string, mixed>>
     */
    private function parseRss(string $xml, string $region, array $meta, bool $filterTravel = false): array
    {
        $previous = libxml_use_internal_errors(true);

        try {
            $feed = simplexml_load_string($xml);
        } finally {
            libxml_clear_errors();
            libxml_use_internal_errors($previous);
        }

        if ($feed === false || ! isset($feed->channel->item)) {
            return [];
        }

        $items = [];

        foreach ($feed->channel->item as $item) {
            if (count($items) >= 6) {
                break;
            }

            $title = trim(html_entity_decode((string) $item->title, ENT_QUOTES | ENT_HTML5, 'UTF-8'));
            $link = trim((string) $item->link);
            $rawDescription = (string) $item->description;
            $excerpt = $this->plainText($rawDescription);
            $image = $this->firstImage($rawDescription) ?: $meta['image'];
            $published = (string) ($item->pubDate ?? '');
            $date = $published !== '' ? date('Y-m-d', strtotime($published) ?: time()) : date('Y-m-d');
            $source = trim((string) ($item->source ?? ''));

            if ($title === '' || $link === '') {
                continue;
            }

            if ($filterTravel && ! $this->looksTravelRelated($title.' '.$excerpt)) {
                continue;
            }

            $items[] = [
                'id' => substr(hash('sha256', $region.'|'.$link), 0, 16),
                'region' => $region,
                'title' => $title,
                'excerpt' => Str::limit($excerpt !== '' ? $excerpt : $title, 160),
                'body' => $excerpt !== '' ? $excerpt : $title,
                'coverImage' => $image,
                'icon' => $meta['icon'],
                'date' => $date,
                'tag' => $source !== '' ? Str::limit($source, 28) : $meta['tag'],
                'url' => $link,
                'source' => $source !== '' ? $source : null,
            ];
        }

        return $items;
    }

    private function looksTravelRelated(string $text): bool
    {
        return (bool) preg_match(
            '/travel|tourism|tourist|flight|airline|hotel|airport|holiday|vacation|destination|visa|cruise|trip/i',
            $text,
        );
    }

    /**
     * @param  list<array<string, mixed>>  $items
     * @return list<array<string, mixed>>
     */
    private function uniqueByUrl(array $items): array
    {
        $seen = [];
        $unique = [];

        foreach ($items as $item) {
            $key = $item['url'] ?? $item['id'];
            if (isset($seen[$key])) {
                continue;
            }
            $seen[$key] = true;
            $unique[] = $item;
        }

        return $unique;
    }

    private function plainText(string $html): string
    {
        $text = html_entity_decode(strip_tags($html), ENT_QUOTES | ENT_HTML5, 'UTF-8');

        return trim(preg_replace('/\s+/u', ' ', $text) ?? '');
    }

    private function firstImage(string $html): ?string
    {
        if (preg_match('/<img[^>]+src=["\']([^"\']+)["\']/i', $html, $matches)) {
            $src = html_entity_decode($matches[1], ENT_QUOTES | ENT_HTML5, 'UTF-8');

            return filter_var($src, FILTER_VALIDATE_URL) ? $src : null;
        }

        return null;
    }
}
