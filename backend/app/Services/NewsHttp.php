<?php

namespace App\Services;

use Illuminate\Http\Client\PendingRequest;
use Illuminate\Support\Facades\Http;

class NewsHttp
{
    /**
     * @param  array<string, string>  $headers
     */
    public static function request(int $timeout, array $headers): PendingRequest
    {
        $request = Http::timeout($timeout)->withHeaders($headers);

        if (! self::verifySsl()) {
            return $request->withoutVerifying();
        }

        return $request;
    }

    /**
     * Verify TLS only when explicitly enabled, or when PHP has a CA bundle.
     * Windows PHP often has neither curl.cainfo nor openssl.cafile, which makes
     * every news feed fail with cURL error 60.
     */
    public static function verifySsl(): bool
    {
        $verify = config('services.news.verify_ssl');

        if (is_bool($verify)) {
            return $verify;
        }

        if (is_string($verify) && $verify !== '') {
            return filter_var($verify, FILTER_VALIDATE_BOOLEAN);
        }

        $ca = (string) (ini_get('curl.cainfo') ?: ini_get('openssl.cafile') ?: '');

        return $ca !== '' && is_file($ca);
    }
}
