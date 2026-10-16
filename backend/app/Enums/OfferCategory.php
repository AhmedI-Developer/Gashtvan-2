<?php

namespace App\Enums;

enum OfferCategory: string
{
    case Ticket = 'ticket';
    case Hotel = 'hotel';
    case Visa = 'visa';

    public function label(): string
    {
        return match ($this) {
            self::Ticket => 'Tickets',
            self::Hotel => 'Hotels',
            self::Visa => 'Visa',
        };
    }

    /**
     * @return list<string>
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
