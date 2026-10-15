import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Seo from '@/components/layout/Seo'
import SectionHeading from '@/components/ui/SectionHeading'
import OfferCard from '@/components/offers/OfferCard'
import OfferFilters from '@/components/offers/OfferFilters'
import Skeleton from '@/components/ui/Skeleton'
import { useOffers } from '@/hooks/useOffers'
import { useDestinations } from '@/hooks/useDestinations'
import { categoriesFrom, filterOffers, sortOffers } from '@/lib/offers'

export default function Offers() {
  const { offers, loading } = useOffers()
  const { destinations } = useDestinations()
  const [category, setCategory] = useState('All')
  const [searchParams, setSearchParams] = useSearchParams()
  const destination = searchParams.get('destination') || 'All'

  const setDestination = (name) => {
    const next = new URLSearchParams(searchParams)
    if (!name || name === 'All') next.delete('destination')
    else next.set('destination', name)
    setSearchParams(next, { replace: true })
  }
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('newest')
  const categories = useMemo(() => categoriesFrom(offers), [offers])
  const destinationNames = useMemo(() => {
    const fromFares = destinations.map((item) => item.name)
    const fromOffers = offers.map((offer) => offer.destination)
    return [...new Set([...fromFares, ...fromOffers].filter(Boolean))]
  }, [destinations, offers])

  const visible = useMemo(() => {
    return sortOffers(filterOffers(offers, { category, query, destination }), sort)
  }, [offers, category, query, destination, sort])

  return (
    <main className="section-pad pt-24 sm:pt-28">
      <Seo
        title="Offers"
        description="Current Gashtvan travel offers — flights, packages, tours, MICE, visa assistance, and more."
        path="/offers"
      />
      <div className="container-shell">
        <SectionHeading
          eyebrow="Offers"
          title="Find your next journey"
          description="Live offers from Gashtvan — filter by category or destination, then sort by price."
        />

        <OfferFilters
          categories={categories}
          category={category}
          setCategory={setCategory}
          destinations={destinationNames}
          destination={destination}
          setDestination={setDestination}
          query={query}
          setQuery={setQuery}
          sort={sort}
          setSort={setSort}
        />

        <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-[320px] sm:h-[380px]" />
              ))
            : visible.map((offer) => <OfferCard key={offer.id} offer={offer} />)}
        </div>

        {!loading && !visible.length ? (
          <div className="mt-10 rounded-[22px] border border-dashed border-[var(--border)] bg-[var(--surface)] p-6 text-center sm:mt-12 sm:rounded-[28px] sm:p-10">
            <h2 className="font-display text-xl font-bold text-[var(--text)] sm:text-2xl">
              No offers match right now
            </h2>
            <p className="mt-2 text-sm text-[var(--text-muted)] sm:text-base">
              Try another category, clear search, or contact us for a custom quote.
            </p>
          </div>
        ) : null}
      </div>
    </main>
  )
}
