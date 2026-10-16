import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import GreenShape from '@/components/brand/GreenShape'
import { daysUntil, formatPrice } from '@/lib/offers'
import { cityLabel } from '@/lib/destinations'
import { cn } from '@/lib/cn'

export default function OfferCard({ offer }) {
  const { t } = useTranslation()
  const days = daysUntil(offer.validUntil)
  const categoryLabel = t(`offers.categories.${offer.category}`, {
    defaultValue: offer.categoryLabel || offer.category,
  })

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow)] transition duration-300 sm:rounded-[26px]',
        'hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-[0_16px_40px_rgba(160,194,58,0.16)]',
      )}
    >
      <div className="relative aspect-[16/11] overflow-hidden">
        {offer.coverImage ? (
          <img
            src={offer.coverImage}
            alt={offer.title}
            loading="lazy"
            width={640}
            height={440}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="h-full w-full bg-[var(--navy)]" />
        )}
        {offer.isFeatured ? (
          <span className="absolute start-3 top-3 rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-bold text-[var(--navy)]">
            {t('offers.featured')}
          </span>
        ) : null}
        <span className="absolute end-3 top-3 hidden opacity-0 transition group-hover:opacity-100 sm:block">
          <GreenShape size={14} />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-text)]">
          {categoryLabel}
          {offer.destination ? ` · ${cityLabel(offer.destination, t)}` : ''}
        </p>
        <h3 className="mt-1 font-display text-lg font-bold text-[var(--text)] sm:text-xl">
          {offer.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-[var(--text-muted)]">
          {offer.shortDescription}
        </p>

        <div className="mt-auto flex flex-col gap-3 pt-4 sm:flex-row sm:items-end sm:justify-between sm:pt-5">
          <div className="min-w-0">
            <p className="font-display text-lg font-bold text-[var(--text)]">
              {formatPrice(offer, t('offers.contactForPrice'))}
            </p>
            {offer.oldPrice ? (
              <p className="text-xs text-[var(--text-muted)] line-through">
                {offer.currency} {offer.oldPrice}
              </p>
            ) : null}
            {days != null ? (
              <p className="mt-1 text-xs text-[var(--text-muted)]">
                {days < 0
                  ? t('offers.ended')
                  : days === 0
                    ? t('offers.endsToday')
                    : t('offers.endsIn', { count: days })}
              </p>
            ) : offer.durationDays ? (
              <p className="mt-1 text-xs text-[var(--text-muted)]">
                {t(offer.durationDays === 1 ? 'offers.durationDay' : 'offers.durationDays', {
                  count: offer.durationDays,
                })}
              </p>
            ) : null}
          </div>
          <Link
            to={`/offers/${offer.slug}`}
            className="inline-flex min-h-10 items-center justify-center rounded-full bg-[var(--accent)] px-4 py-2 text-center text-sm font-semibold text-[var(--navy)] transition hover:bg-[var(--accent-hover)]"
          >
            {t('common.viewDetails')}
          </Link>
        </div>
      </div>
    </article>
  )
}
