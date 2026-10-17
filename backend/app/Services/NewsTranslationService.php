<?php

namespace App\Services;

use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Cache;
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
        $cacheKey = 'travel-news.lang.v2.'.$lang.'.'.md5((string) json_encode(array_column($articles, 'id')));

        $cached = Cache::get($cacheKey);
        if (is_array($cached) && $this->isTranslated($cached, $articles)) {
            return $cached;
        }

        $strings = [];
        foreach ($articles as $article) {
            foreach (['title', 'excerpt', 'body'] as $field) {
                $text = trim((string) ($article[$field] ?? ''));
                if ($text !== '') {
                    $strings[$text] = true;
                }
            }
        }

        $translatedMap = $this->translateMany(array_keys($strings), $target);
        $result = [];
        $translatedTitles = 0;

        foreach ($articles as $article) {
            $copy = $article;

            foreach (['title', 'excerpt', 'body'] as $field) {
                $text = trim((string) ($article[$field] ?? ''));
                if ($text === '') {
                    continue;
                }

                $translated = $translatedMap[$text] ?? null;
                if (! is_string($translated) || $translated === '' || $translated === $text) {
                    continue;
                }

                $copy[$field] = $translated;
                if ($field === 'title') {
                    $translatedTitles++;
                }
            }

            $result[] = $copy;
        }

        if ($translatedTitles === count($articles)) {
            Cache::put($cacheKey, $result, now()->addHours(6));
        }

        return $result;
    }

    /**
     * @param  list<array<string, mixed>>  $cached
     * @param  list<array<string, mixed>>  $articles
     */
    private function isTranslated(array $cached, array $articles): bool
    {
        if (count($cached) !== count($articles)) {
            return false;
        }

        foreach ($articles as $index => $article) {
            $original = trim((string) ($article['title'] ?? ''));
            $cachedTitle = trim((string) ($cached[$index]['title'] ?? ''));
            if ($original === '' || $cachedTitle === '' || $cachedTitle === $original) {
                return false;
            }
        }

        return true;
    }

    /**
     * @param  list<string>  $texts
     * @return array<string, string|null>
     */
    private function translateMany(array $texts, string $target): array
    {
        $map = [];

        foreach ($texts as $text) {
            $parts = [];

            foreach ($this->chunkText($text, 450) as $chunk) {
                $translated = $this->requestTranslation($chunk, $target);
                if ($translated === null) {
                    $parts = [];
                    break;
                }
                $parts[] = $translated;
            }

            $map[$text] = $parts === [] ? null : trim(implode(' ', $parts));
        }

        return $map;
    }

    private function requestTranslation(string $text, string $target): ?string
    {
        $translated = $this->googleTranslate($text, $target);
        if ($translated !== null) {
            return $translated;
        }

        return $this->myMemoryTranslate($text, $target);
    }

    private function googleTranslate(string $text, string $target): ?string
    {
        foreach ([0, 600000] as $pause) {
            if ($pause > 0) {
                usleep($pause);
            }

            try {
                $response = NewsHttp::request(12, [
                    'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                    'Accept' => 'application/json,text/plain,*/*',
                ])->get('https://translate.googleapis.com/translate_a/single', [
                    'client' => 'gtx',
                    'sl' => 'en',
                    'tl' => $target,
                    'dt' => 't',
                    'q' => $text,
                ]);
            } catch (Throwable $e) {
                Log::warning('News translation failed', [
                    'target' => $target,
                    'message' => $e->getMessage(),
                ]);

                return null;
            }

            if ($response->status() === 429) {
                continue;
            }

            return $this->readGoogleTranslation($response);
        }

        Log::warning('News translation rate limited', ['target' => $target]);

        return null;
    }

    private function myMemoryTranslate(string $text, string $target): ?string
    {
        try {
            $response = NewsHttp::request(12, [
                'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                'Accept' => 'application/json',
            ])->get('https://api.mymemory.translated.net/get', [
                'q' => $text,
                'langpair' => 'en|'.$target,
            ]);
        } catch (Throwable $e) {
            Log::warning('News translation fallback failed', [
                'target' => $target,
                'message' => $e->getMessage(),
            ]);

            return null;
        }

        if (! $response->successful()) {
            return null;
        }

        $translated = trim((string) $response->json('responseData.translatedText'));
        if ($translated === '' || str_contains(strtoupper($translated), 'MYMEMORY WARNING')) {
            return null;
        }

        return $translated;
    }

    private function readGoogleTranslation(Response $response): ?string
    {
        if (! $response->successful()) {
            Log::warning('News translation HTTP error', [
                'status' => $response->status(),
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

        $out = trim(html_entity_decode($out, ENT_QUOTES | ENT_HTML5, 'UTF-8'));

        return $out !== '' ? $out : null;
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
