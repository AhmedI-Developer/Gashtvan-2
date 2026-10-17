<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Throwable;

class NewsTranslationService
{
    /** @var array<string, string> */
    private const TARGETS = [
        'ar' => 'ar',
        'ckb' => 'ckb',
    ];

    /**
     * @param  list<array<string, mixed>>  $articles
     * @return list<array<string, mixed>>
     */
    public function translateArticles(array $articles, string $lang): array
    {
        $lang = strtolower($lang);
        if ($lang === 'en' || ! isset(self::TARGETS[$lang]) || $articles === []) {
            return $articles;
        }

        $target = self::TARGETS[$lang];
        $cacheKey = 'travel-news.tr.'.$lang.'.'.md5(json_encode(array_column($articles, 'id')));

        $cached = Cache::get($cacheKey);
        if (is_array($cached) && $cached !== []) {
            return $cached;
        }

        $translated = [];

        foreach ($articles as $article) {
            $translated[] = $this->translateArticle($article, $target, $lang);
        }

        Cache::put($cacheKey, $translated, now()->addHours(6));

        return $translated;
    }

    /**
     * @param  array<string, mixed>  $article
     * @return array<string, mixed>
     */
    private function translateArticle(array $article, string $target, string $lang): array
    {
        $fields = ['title', 'excerpt', 'body'];
        $itemCacheKey = 'travel-news.item.'.$lang.'.'.($article['id'] ?? md5(($article['url'] ?? '').($article['title'] ?? '')));

        $cachedItem = Cache::get($itemCacheKey);
        if (is_array($cachedItem)) {
            return array_merge($article, $cachedItem);
        }

        $overlay = [];

        foreach ($fields as $field) {
            $text = trim((string) ($article[$field] ?? ''));
            if ($text === '') {
                continue;
            }

            $overlay[$field] = $this->translateText($text, $target) ?: $text;
        }

        if ($overlay !== []) {
            Cache::put($itemCacheKey, $overlay, now()->addHours(12));
        }

        return array_merge($article, $overlay);
    }

    private function translateText(string $text, string $target): ?string
    {
        // Keep requests small — free endpoints truncate long payloads.
        $chunks = $this->chunkText($text, 450);
        $parts = [];

        foreach ($chunks as $chunk) {
            $translated = $this->requestTranslation($chunk, $target);
            if ($translated === null) {
                return null;
            }
            $parts[] = $translated;
        }

        return trim(implode(' ', $parts));
    }

    private function requestTranslation(string $text, string $target): ?string
    {
        try {
            $request = Http::timeout(12)
                ->withHeaders([
                    'User-Agent' => 'Mozilla/5.0 (compatible; GashtvanNews/1.0)',
                ]);

            $verify = config('services.news.verify_ssl');
            $skipVerify = $verify === false
                || ($verify === null && app()->environment(['local', 'development']));

            if ($skipVerify) {
                $request = $request->withoutVerifying();
            }

            $response = $request->get('https://translate.googleapis.com/translate_a/single', [
                'client' => 'gtx',
                'sl' => 'en',
                'tl' => $target,
                'dt' => 't',
                'q' => $text,
            ]);

            if (! $response->successful()) {
                Log::warning('News translation HTTP error', [
                    'status' => $response->status(),
                    'target' => $target,
                ]);

                return null;
            }

            $payload = $response->json();
            if (! is_array($payload) || ! isset($payload[0]) || ! is_array($payload[0])) {
                return null;
            }

            $out = '';
            foreach ($payload[0] as $segment) {
                if (is_array($segment) && isset($segment[0]) && is_string($segment[0])) {
                    $out .= $segment[0];
                }
            }

            $out = trim($out);

            return $out !== '' ? $out : null;
        } catch (Throwable $e) {
            Log::warning('News translation failed', [
                'target' => $target,
                'message' => $e->getMessage(),
            ]);

            return null;
        }
    }

    /**
     * @return list<string>
     */
    private function chunkText(string $text, int $max): array
    {
        if (mb_strlen($text) <= $max) {
            return [$text];
        }

        $chunks = [];
        $remaining = $text;

        while (mb_strlen($remaining) > $max) {
            $slice = mb_substr($remaining, 0, $max);
            $break = mb_strrpos($slice, ' ');
            if ($break === false || $break < (int) ($max * 0.5)) {
                $break = $max;
            }
            $chunks[] = trim(mb_substr($remaining, 0, $break));
            $remaining = trim(mb_substr($remaining, $break));
        }

        if ($remaining !== '') {
            $chunks[] = $remaining;
        }

        return $chunks;
    }
}
