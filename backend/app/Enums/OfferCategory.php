<?php

namespace App\Enums;

enum OfferCategory: string
{
    case Ticket = 'ticket';
    case Hotel = 'hotel';
    case Visa = 'visa';
    case Tour = 'tour';
    case Bundle = 'bundle';

    public function label(): string
    {
        return match ($this) {
            self::Ticket => 'Tickets',
            self::Hotel => 'Hotels',
            self::Visa => 'Visa',
            self::Tour => 'Tours',
            self::Bundle => 'Bundles',
        };
    }
}
