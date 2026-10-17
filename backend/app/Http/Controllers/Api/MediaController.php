<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class MediaController extends Controller
{
    /**
     * Serve a public disk file through the API so SPA hosts cannot swallow /storage.
     */
    public function show(string $path): BinaryFileResponse
    {
        $path = str_replace('\\', '/', $path);
        $path = ltrim($path, '/');

        if ($path === '' || str_contains($path, '..')) {
            throw new NotFoundHttpException('Invalid media path.');
        }

        if (! Storage::disk('public')->exists($path)) {
            throw new NotFoundHttpException('Media not found.');
        }

        $absolute = Storage::disk('public')->path($path);

        return response()->file($absolute, [
            'Cache-Control' => 'public, max-age=604800',
        ]);
    }
}
