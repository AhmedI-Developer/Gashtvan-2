<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\NewsTranslationService;
use App\Services\TravelNewsService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    private const REGIONS = ['Kurdistan', 'Middle East', 'Europe'];

    public function index(
        Request $request,
        TravelNewsService $news,
        NewsTranslationService $translator,
    ): JsonResponse {
        $lang = strtolower($request->string('lang', 'en')->toString());
        if (! in_array($lang, ['en', 'ar', 'ckb'], true)) {
            $lang = 'en';
        }

        $region = $request->string('region')->toString();
        if ($region !== '' && ! in_array($region, self::REGIONS, true)) {
            $region = '';
        }

        $articles = $news->fetch();

        if ($region !== '') {
            $articles = array_values(array_filter(
                $articles,
                static fn (array $item): bool => ($item['region'] ?? '') === $region,
            ));
            $articles = array_slice($articles, 0, 4);
        }

        $articles = $translator->translateArticles($articles, $lang);

        return response()->json([
            'data' => $articles,
            'meta' => [
                'lang' => $lang,
                'region' => $region !== '' ? $region : null,
            ],
        ]);
    }
}
