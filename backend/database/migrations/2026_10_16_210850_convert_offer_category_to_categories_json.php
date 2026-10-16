<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('offers', function (Blueprint $table): void {
            $table->json('categories')->nullable()->after('slug');
        });

        $allowed = ['ticket', 'hotel', 'visa'];

        foreach (DB::table('offers')->orderBy('id')->get() as $offer) {
            $legacy = strtolower((string) ($offer->category ?? ''));
            $categories = match ($legacy) {
                'ticket', 'hotel', 'visa' => [$legacy],
                'tour' => ['hotel'],
                'bundle' => ['ticket', 'hotel'],
                default => ['ticket'],
            };

            $includes = json_decode((string) ($offer->includes ?? '[]'), true);
            if ($legacy === 'bundle' && is_array($includes)) {
                $fromIncludes = array_values(array_intersect($includes, $allowed));
                if ($fromIncludes !== []) {
                    $categories = $fromIncludes;
                }
            }

            DB::table('offers')->where('id', $offer->id)->update([
                'categories' => json_encode(array_values(array_unique($categories))),
            ]);
        }

        Schema::table('offers', function (Blueprint $table): void {
            $table->dropIndex(['is_active', 'category']);
            $table->dropColumn('category');
            $table->index('is_active');
        });
    }

    public function down(): void
    {
        Schema::table('offers', function (Blueprint $table): void {
            $table->string('category', 32)->nullable()->after('slug');
        });

        foreach (DB::table('offers')->orderBy('id')->get() as $offer) {
            $categories = json_decode((string) ($offer->categories ?? '[]'), true);
            $primary = is_array($categories) && $categories !== []
                ? (string) $categories[0]
                : 'ticket';

            DB::table('offers')->where('id', $offer->id)->update([
                'category' => $primary,
            ]);
        }

        Schema::table('offers', function (Blueprint $table): void {
            $table->dropIndex(['is_active']);
            $table->dropColumn('categories');
            $table->index(['is_active', 'category']);
        });
    }
};
