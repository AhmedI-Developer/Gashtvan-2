import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Search } from 'lucide-react'
import Seo from '@/components/layout/Seo'
import PageHero from '@/components/ui/PageHero'
import Button from '@/components/ui/Button'
import Pagination from '@/components/ui/Pagination'
import DestinationCard from '@/components/destinations/DestinationCard'
import { DestinationCardSkeleton } from '@/components/ui/Skeleton'
import { useDestinations } from '@/hooks/useDestinations'
import { usePagination } from '@/hooks/usePagination'
import { cityLabel } from '@/lib/destinations'
import destinationsHero from '@/assets/backgroundImage/view.jpg'

const PAGE_SIZE = 12

export default function Destinations() {
  const { t } = useTranslation()
  const { destinations, loading, error } = useDestinations()
  const [query, setQuery] = useState('')
  const listRef = useRef(null)

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return destinations
    return destinations.filter((item) => {
      const label = cityLabel(item.name, t).toLowerCase()
      const haystack = [item.name, label, item.code, item.origin, item.originCode, ...(item.airlines || [])]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      return haystack.includes(q)
    })
  }, [destinations, query, t])

  const { page, setPage, totalPages, pageItems, hasPagination } = usePagination(visible, {
    pageSize: PAGE_SIZE,
    resetKey: query,
  })

  useEffect(() => {
    if (!listRef.current || page === 1) return
    listRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [page])

  return (
    <main>
      <Seo
        title={t('destinations.pageTitle')}
        description={t('destinations.seoDescription')}
        path="/destinations"
      />

      <PageHero
        image={destinationsHero}
        imageAlt=""
        eyebrow={t('destinations.eyebrow')}
        title={t('destinations.pageTitle')}
        description={t('destinations.pageDescription')}
      />

      <div className="container-shell section-pad pt-8 sm:pt-10">
        <label className="relative block max-w-md">
          <span className="sr-only">{t('destinations.searchLabel')}</span>
          <Search
            size={18}
            strokeWidth={2}
            className="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('destinations.searchPlaceholder')}
            className="w-full rounded-[18px] border border-[var(--border)] bg-[var(--surface)] py-3 pe-4 ps-10 text-[var(--text)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]"
          />
        </label>

        <div
          ref={listRef}
          className="mt-6 grid scroll-mt-28 gap-4 sm:mt-8 sm:gap-5 sm:grid-cols-2 xl:grid-cols-3"
        >
          {loading
            ? Array.from({ length: PAGE_SIZE }).map((_, i) => <DestinationCardSkeleton key={i} />)
            : pageItems.map((destination) => (
                <DestinationCard
                  key={destination.code || destination.name}
                  destination={destination}
                />
              ))}
        </div>

        {!loading && hasPagination ? (
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        ) : null}

        {!loading && error ? (
          <p className="mt-8 text-[var(--text-muted)]">{t('destinations.error')}</p>
        ) : null}

        {!loading && !error && !visible.length ? (
          <div className="mt-10 rounded-[22px] border border-dashed border-[var(--border)] bg-[var(--surface)] p-6 text-center sm:mt-12 sm:rounded-[28px] sm:p-10">
            <h2 className="font-display text-xl font-bold text-[var(--text)] sm:text-2xl">
              {t('destinations.empty')}
            </h2>
            <p className="mt-2 text-sm text-[var(--text-muted)] sm:text-base">
              {t('destinations.emptyLead')}
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              {query ? (
                <Button type="button" variant="secondary" onClick={() => setQuery('')}>
                  {t('destinations.clearSearch')}
                </Button>
              ) : null}
              <Button to="/contact">{t('destinations.askCustom')}</Button>
            </div>
          </div>
        ) : null}

        {!loading && !error && visible.length ? (
          <div className="mt-12 rounded-[28px] border border-[var(--border)] bg-[color-mix(in_srgb,var(--accent)_10%,var(--surface))] px-6 py-8 text-center sm:mt-16 sm:px-10">
            <h2 className="font-display text-xl font-bold text-[var(--text)] sm:text-2xl">
              {t('destinations.ctaTitle')}
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-[var(--text-muted)] sm:text-base">
              {t('destinations.ctaLead')}
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <Button to="/contact">{t('common.contactUs')}</Button>
              <Button to="/offers" variant="secondary">
                {t('common.viewOffers')}
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  )
}
