<?php

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

it('returns live travel news grouped by region', function () {
    Cache::flush();

    $rss = <<<'XML'
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Travel</title>
    <item>
      <title>Sample travel headline</title>
      <link>https://example.com/travel-story</link>
      <pubDate>Wed, 15 Oct 2025 10:00:00 GMT</pubDate>
      <description><![CDATA[A short summary about travel. <img src="https://example.com/photo.jpg" />]]></description>
      <source url="https://example.com">Example News</source>
    </item>
  </channel>
</rss>
XML;

    Http::fake([
        'news.google.com/*' => Http::response($rss, 200),
        'www.aljazeera.com/*' => Http::response('', 404),
        'feeds.bbci.co.uk/*' => Http::response('', 404),
        'www.theguardian.com/*' => Http::response('', 404),
    ]);

    $response = $this->getJson('/api/news');

    $response->assertOk()
        ->assertJsonStructure([
            'data' => [
                [
                    'id',
                    'region',
                    'title',
                    'excerpt',
                    'body',
                    'coverImage',
                    'icon',
                    'date',
                    'tag',
                    'url',
                ],
            ],
        ]);

    expect($response->json('data'))->not->toBeEmpty();
    expect($response->json('data.0.title'))->toBe('Sample travel headline');
    expect($response->json('data.0.url'))->toBe('https://example.com/travel-story');
});

it('translates news titles when lang is arabic', function () {
    Cache::flush();

    $rss = <<<'XML'
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Travel</title>
    <item>
      <title>Sample travel headline</title>
      <link>https://example.com/travel-story</link>
      <pubDate>Wed, 15 Oct 2025 10:00:00 GMT</pubDate>
      <description>A short summary about travel.</description>
    </item>
  </channel>
</rss>
XML;

    Http::fake([
        'news.google.com/*' => Http::response($rss, 200),
        'translate.googleapis.com/*' => Http::response([
            [['عنوان سفر تجريبي', 'Sample travel headline']],
            null,
            'en',
        ], 200),
        'www.aljazeera.com/*' => Http::response('', 404),
        'feeds.bbci.co.uk/*' => Http::response('', 404),
        'www.theguardian.com/*' => Http::response('', 404),
    ]);

    $this->getJson('/api/news?lang=ar&region=Europe')
        ->assertOk()
        ->assertJsonPath('meta.lang', 'ar')
        ->assertJsonPath('meta.region', 'Europe')
        ->assertJsonPath('data.0.title', 'عنوان سفر تجريبي');
});

it('translates news titles when lang is kurdish', function () {
    Cache::flush();

    $rss = <<<'XML'
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Travel</title>
    <item>
      <title>Sample travel headline</title>
      <link>https://example.com/travel-story</link>
      <pubDate>Wed, 15 Oct 2025 10:00:00 GMT</pubDate>
      <description>A short summary about travel.</description>
    </item>
  </channel>
</rss>
XML;

    Http::fake([
        'news.google.com/*' => Http::response($rss, 200),
        'translate.googleapis.com/*' => Http::response([
            [['سەردێڕی گەشت', 'Sample travel headline']],
            null,
            'en',
        ], 200),
        'www.aljazeera.com/*' => Http::response('', 404),
        'feeds.bbci.co.uk/*' => Http::response('', 404),
        'www.theguardian.com/*' => Http::response('', 404),
    ]);

    $this->getJson('/api/news?lang=ckb&region=Kurdistan')
        ->assertOk()
        ->assertJsonPath('meta.lang', 'ckb')
        ->assertJsonPath('data.0.title', 'سەردێڕی گەشت');
});
