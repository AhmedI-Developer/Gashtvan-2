import { useRef } from 'react'
import { Link } from 'react-router-dom'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'
import OfferCard from '@/components/offers/OfferCard'
import Skeleton from '@/components/ui/Skeleton'
import { useOffers } from '@/hooks/useOffers'

export default function FeaturedOffers() {
  const { offers, loading } = useOffers({ limit: 24 })
  const scroller = useRef(null)
  const featuredSource = offers.filter((offer) => offer.isFeatured)
  const featured = (featuredSource.length ? featuredSource : offers).slice(0, 6)

  return (
    <section id="featured-offers" className="section-pad bg-[var(--bg)]">
      <div className="container-shell">
        <div className="mb-2 flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading
            className="mb-0"
            eyebrow="Offers"
            title="Featured journeys"
            description="Featured offers from the Gashtvan desk — browse the full board anytime."
          />
          <Button to="/offers" variant="secondary" className="w-full shrink-0 sm:w-auto">
            All offers
          </Button>
        </div>

        <div
          ref={scroller}
          className="-mx-2 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-2 pb-4 sm:mx-0 sm:mt-8 sm:gap-5 sm:px-0 [scrollbar-width:thin]"
        >
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-[340px] w-[min(280px,78vw)] shrink-0 sm:h-[380px] sm:w-[min(320px,85vw)]"
                />
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

        {!loading && !featured.length ? (
          <p className="text-[var(--text-muted)]">
            No active offers right now.{' '}
            <Link to="/contact" className="text-[var(--accent-text)] underline">
              Contact us
            </Link>{' '}
            for custom quotes.
          </p>
        ) : null}
      </div>
    </section>
  )
}
