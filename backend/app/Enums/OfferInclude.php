<?php

namespace App\Enums;

enum OfferInclude: string
{
    case Ticket = 'ticket';
    case Hotel = 'hotel';
    case Visa = 'visa';
    case Tour = 'tour';
    case Transfer = 'transfer';

    public function label(): string
    {
        return match ($this) {
            self::Ticket => 'Flight ticket',
            self::Hotel => 'Hotel',
            self::Visa => 'Visa',
            self::Tour => 'Tour',
            self::Transfer => 'Transfer',
        };
    }
}
