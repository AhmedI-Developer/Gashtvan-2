import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Seo from '@/components/layout/Seo'
import PageHero from '@/components/ui/PageHero'
import Button from '@/components/ui/Button'
import Pagination from '@/components/ui/Pagination'
import OfferCard from '@/components/offers/OfferCard'
import OfferFilters from '@/components/offers/OfferFilters'
import { OfferCardSkeleton } from '@/components/ui/Skeleton'
import { useOffers } from '@/hooks/useOffers'
import { useDestinations } from '@/hooks/useDestinations'
import { usePagination } from '@/hooks/usePagination'
import { categories as categoryKeys, filterOffers, sortOffers } from '@/lib/offers'
import { cityLabel, formatFromPrice } from '@/lib/destinations'
import offersHero from '@/assets/backgroundImage/airport.jpg'

const PAGE_SIZE = 12

export default function Offers() {
  const { t } = useTranslation()
  const { offers, loading, error } = useOffers()
  const { destinations } = useDestinations()
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('newest')
  const listRef = useRef(null)

  const categoryParam = searchParams.get('category') || 'all'
  const category = categoryKeys.includes(categoryParam) ? categoryParam : 'all'
  const destination = searchParams.get('destination') || 'All'

  const setCategory = (next) => {
    const params = new URLSearchParams(searchParams)
    if (!next || next === 'all') params.delete('category')
    else params.set('category', next)
    setSearchParams(params, { replace: true })
  }

  const setDestination = (name) => {
    const params = new URLSearchParams(searchParams)
    if (!name || name === 'All') params.delete('destination')
    else params.set('destination', name)
    setSearchParams(params, { replace: true })
  }

  const destinationNames = useMemo(() => {
    const fromFares = destinations.map((item) => item.name)
    const fromOffers = offers.map((offer) => offer.destination)
    return [...new Set([...fromFares, ...fromOffers].filter(Boolean))]
  }, [destinations, offers])

  const visible = useMemo(() => {
    return sortOffers(
      filterOffers(offers, {
        category,
        query,
        destination,
        destinationLabel: (name) => cityLabel(name, t),
      }),
      sort,
    )
  }, [offers, category, query, destination, sort, t])

  const resetKey = `${category}|${destination}|${query}|${sort}`
  const { page, setPage, totalPages, pageItems, hasPagination } = usePagination(visible, {
    pageSize: PAGE_SIZE,
    resetKey,
  })

  useEffect(() => {
    if (!listRef.current || page === 1) return
    listRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [page])

  const selectedFare =
    destination !== 'All' ? destinations.find((item) => item.name === destination) : null

  return (
    <main>
      <Seo
        title={t('offers.eyebrow')}
        description={t('offers.seoDescription')}
        path="/offers"
      />

      <PageHero
        image={offersHero}
        imageAlt=""
        eyebrow={t('offers.eyebrow')}
        title={t('offers.title')}
        description={t('offers.description')}
      />

      <div className="container-shell section-pad pt-8 sm:pt-10">
        <OfferFilters
          categories={categoryKeys}
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

        <div
          ref={listRef}
          className="mt-6 grid scroll-mt-28 gap-4 sm:mt-8 sm:gap-5 sm:grid-cols-2 xl:grid-cols-3"
        >
          {loading
            ? Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <OfferCardSkeleton key={i} className="min-h-[320px] sm:min-h-[380px]" />
              ))
            : pageItems.map((offer) => <OfferCard key={offer.id} offer={offer} />)}
        </div>

        {!loading && hasPagination ? (
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        ) : null}

        {!loading && error ? (
          <p className="mt-8 text-[var(--text-muted)]">{t('offers.loadError')}</p>
        ) : null}

        {!loading && !error && !visible.length ? (
          <div className="mt-10 rounded-[22px] border border-dashed border-[var(--border)] bg-[var(--surface)] p-6 text-center sm:mt-12 sm:rounded-[28px] sm:p-10">
            {selectedFare ? (
              <>
                <h2 className="font-display text-xl font-bold text-[var(--text)] sm:text-2xl">
                  {t('offers.fareTitle', { city: cityLabel(selectedFare.name, t) })}
                </h2>
                <p className="mt-2 text-sm text-[var(--text-muted)] sm:text-base">
                  {t('offers.fareLead', {
                    price: formatFromPrice(selectedFare, t),
                    airlines: selectedFare.airlines.join(' · '),
                  })}
                </p>
                <Button to="/contact" className="mt-5">
                  {t('offers.askFare')}
                </Button>
              </>
            ) : (
              <>
                <h2 className="font-display text-xl font-bold text-[var(--text)] sm:text-2xl">
                  {t('offers.empty')}
                </h2>
                <p className="mt-2 text-sm text-[var(--text-muted)] sm:text-base">
                  {t('offers.emptyLead')}
                </p>
              </>
            )}
          </div>
        ) : null}
      </div>
    </main>
  )
}
