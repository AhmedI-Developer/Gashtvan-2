import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'
import OfferCard from '@/components/offers/OfferCard'
import { OfferCardSkeleton } from '@/components/ui/Skeleton'
import { useOffers } from '@/hooks/useOffers'

export default function FeaturedOffers() {
  const { t } = useTranslation()
  const { offers, loading, error } = useOffers({
    featured: true,
    limit: 6,
    fallbackAll: true,
  })
  const scroller = useRef(null)
  const featured = offers.slice(0, 6)

  return (
    <section id="featured-offers" className="section-pad bg-[var(--bg)]">
      <div className="container-shell">
        <div className="mb-2 flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading
            className="mb-0"
            eyebrow={t('offers.eyebrow')}
            title={t('offers.featuredTitle')}
            description={t('offers.featuredLead')}
          />
          <Button to="/offers" variant="secondary" className="w-full shrink-0 sm:w-auto">
            {t('offers.allOffers')}
          </Button>
        </div>

        <div
          ref={scroller}
          className="-mx-2 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-2 pb-4 sm:mx-0 sm:mt-8 sm:gap-5 sm:px-0 [scrollbar-width:thin]"
        >
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="w-[min(280px,78vw)] shrink-0 sm:w-[min(320px,85vw)]"
                >
                  <OfferCardSkeleton className="h-[340px] sm:h-[380px]" />
                </div>
              ))
            : featured.map((offer) => (
                <div
                  key={offer.id}
                  className="w-[min(280px,78vw)] shrink-0 snap-start sm:w-[min(320px,85vw)]"
                >
                  <OfferCard offer={offer} />
                </div>
              ))}
        </div>

        {!loading && error ? (
          <p className="text-[var(--text-muted)]">{t('offers.loadError')}</p>
        ) : null}

        {!loading && !error && !featured.length ? (
          <p className="text-[var(--text-muted)]">
            {t('offers.emptyFeatured')}{' '}
            <Link to="/contact" className="text-[var(--accent-text)] underline">
              {t('offers.contactLink')}
            </Link>{' '}
            {t('offers.customQuotes')}
          </p>
        ) : null}
      </div>
    </section>
  )
}
