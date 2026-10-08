<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateFlightFareRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        if ($this->has('is_active')) {
            $this->merge([
                'is_active' => filter_var($this->input('is_active'), FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) ?? true,
            ]);
        }
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'origin' => ['nullable', 'string', 'max:120'],
            'origin_code' => ['nullable', 'string', 'max:8'],
            'destination' => ['required', 'string', 'max:120'],
            'destination_code' => ['nullable', 'string', 'max:8'],
            'airline' => ['required', 'string', 'max:120'],
            'airline_logo' => ['nullable', 'string', 'max:64'],
            'price' => ['required', 'numeric', 'min:0'],
            'currency' => ['nullable', 'string', 'max:8'],
            'trip_type' => ['nullable', Rule::in(['one_way', 'round_trip'])],
            'cabin' => ['nullable', Rule::in(['economy', 'premium_economy', 'business', 'first'])],
            'notes' => ['nullable', 'string', 'max:500'],
            'is_active' => ['sometimes', 'boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
