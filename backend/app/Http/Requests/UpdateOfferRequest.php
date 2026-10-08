<?php

namespace App\Http\Requests;

use App\Enums\OfferCategory;
use App\Enums\OfferInclude;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateOfferRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        if ($this->has('is_featured')) {
            $this->merge(['is_featured' => $this->toBoolean($this->input('is_featured'), false)]);
        }

        if ($this->has('is_active')) {
            $this->merge(['is_active' => $this->toBoolean($this->input('is_active'), true)]);
        }

        if ($this->has('includes') && is_string($this->input('includes'))) {
            $decoded = json_decode($this->input('includes'), true);
            if (is_array($decoded)) {
                $this->merge(['includes' => $decoded]);
            }
        }
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        $offerId = $this->route('id');

        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', Rule::unique('offers', 'slug')->ignore($offerId)],
            'category' => ['required', Rule::enum(OfferCategory::class)],
            'destination' => ['nullable', 'string', 'max:255'],
            'summary' => ['nullable', 'string', 'max:1000'],
            'description' => ['nullable', 'string'],
            'includes' => ['nullable', 'array'],
            'includes.*' => ['string', Rule::enum(OfferInclude::class)],
            'price' => ['nullable', 'numeric', 'min:0'],
            'currency' => ['nullable', 'string', 'max:8'],
            'duration_days' => ['nullable', 'integer', 'min:1', 'max:365'],
            'image' => ['nullable', 'image', 'max:4096'],
            'image_path' => ['nullable', 'string', 'max:500'],
            'is_featured' => ['sometimes', 'boolean'],
            'is_active' => ['sometimes', 'boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ];
    }

    private function toBoolean(mixed $value, bool $default): bool
    {
        if ($value === null) {
            return $default;
        }

        return filter_var($value, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) ?? $default;
    }
}
