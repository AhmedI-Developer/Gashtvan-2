import { useState } from 'react'
import { FileCheck, Hotel, LayoutGrid, MapPin, Plane, Search, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/cn'
import { cityLabel } from '@/lib/destinations'

const OFFER_ICONS = {
  all: LayoutGrid,
  ticket: Plane,
  hotel: Hotel,
  visa: FileCheck,
}

const SORT_OPTIONS = ['newest', 'ending', 'price']

function FilterButton({ selected, onClick, children, className }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-[16px] border px-3.5 py-2.5 text-sm font-semibold transition',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]',
        selected
          ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--navy)] shadow-sm'
          : 'border-[var(--border)] bg-[var(--bg)] text-[var(--text)] hover:border-[var(--accent)]',
        className,
      )}
    >
      {children}
    </button>
  )
}

export default function OfferFilters({
  categories,
  category,
  setCategory,
  destinations = [],
  destination = 'All',
  setDestination,
  query,
  setQuery,
  sort,
  setSort,
}) {
  const { t } = useTranslation()
  const [panel, setPanel] = useState('offers')

  const labelFor = (key) => {
    const translated = t(`offers.categories.${key}`)
    return translated === `offers.categories.${key}` ? key : translated
  }

  const hasFilters =
    (category && category !== 'all') ||
    (destination && destination !== 'All') ||
    Boolean(query?.trim())

  const clearFilters = () => {
    setCategory('all')
    setDestination?.('All')
    setQuery('')
  }

  const destinationOptions = ['All', ...destinations]

  return (
    <div className="space-y-5 rounded-[22px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--shadow)] sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          className="inline-flex rounded-full border border-[var(--border)] bg-[var(--bg)] p-1"
          role="tablist"
          aria-label={t('offers.filterBy')}
        >
          <button
            type="button"
            role="tab"
            aria-selected={panel === 'offers'}
            onClick={() => setPanel('offers')}
            className={cn(
              'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition',
              panel === 'offers'
                ? 'bg-[var(--accent)] text-[var(--navy)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text)]',
            )}
          >
            <LayoutGrid size={16} strokeWidth={2.25} />
            {t('offers.filterOffers')}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={panel === 'destinations'}
            onClick={() => setPanel('destinations')}
            className={cn(
              'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition',
              panel === 'destinations'
                ? 'bg-[var(--accent)] text-[var(--navy)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text)]',
            )}
          >
            <MapPin size={16} strokeWidth={2.25} />
            {t('offers.filterDestinations')}
          </button>
        </div>

        {hasFilters ? (
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-text)] transition hover:opacity-80"
          >
            <X size={14} />
            {t('offers.clearFilters')}
          </button>
        ) : null}
      </div>

      {panel === 'offers' ? (
        <div>
          <p className="mb-3 text-sm font-semibold text-[var(--text)]">
            {t('offers.categoriesLabel')}
          </p>
          <div
            className="grid grid-cols-2 gap-2 sm:grid-cols-4"
            role="group"
            aria-label={t('offers.categoriesLabel')}
          >
            {categories.map((cat) => {
              const Icon = OFFER_ICONS[cat] || LayoutGrid
              return (
                <FilterButton
                  key={cat}
                  selected={category === cat}
                  onClick={() => setCategory(cat)}
                  className="w-full"
                >
                  <Icon size={16} strokeWidth={2.25} />
                  {labelFor(cat)}
                </FilterButton>
              )
            })}
          </div>
        </div>
      ) : (
        <div>
          <p className="mb-3 text-sm font-semibold text-[var(--text)]">
            {t('offers.destinationsLabel')}
          </p>
          {destinationOptions.length > 1 ? (
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label={t('offers.destinationsLabel')}
            >
              {destinationOptions.map((name) => (
                <FilterButton
                  key={name}
                  selected={destination === name}
                  onClick={() => setDestination?.(name)}
                >
                  <MapPin size={15} strokeWidth={2.25} />
                  {name === 'All' ? t('offers.allDestinations') : cityLabel(name, t)}
                </FilterButton>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[var(--text-muted)]">{t('offers.noDestinations')}</p>
          )}
        </div>
      )}

      <div className="flex flex-col gap-4 border-t border-[var(--border)] pt-4 lg:flex-row lg:items-end">
        <label className="relative min-w-0 flex-1">
          <span className="mb-2 block text-sm font-semibold text-[var(--text)]">
            {t('offers.searchLabel')}
          </span>
          <span className="relative block">
            <Search
              size={16}
              className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('offers.searchPlaceholder')}
              className="w-full rounded-[16px] border border-[var(--border)] bg-[var(--bg)] py-3 ps-10 pe-4 text-[var(--text)] outline-none focus:border-[var(--accent)]"
            />
          </span>
        </label>

        <div className="w-full lg:w-auto">
          <p className="mb-2 text-sm font-semibold text-[var(--text)]">{t('offers.sortLabel')}</p>
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label={t('offers.sortLabel')}
          >
            {SORT_OPTIONS.map((option) => (
              <FilterButton
                key={option}
                selected={sort === option}
                onClick={() => setSort(option)}
              >
                {t(
                  option === 'newest'
                    ? 'offers.sortNewest'
                    : option === 'ending'
                      ? 'offers.sortEnding'
                      : 'offers.sortPrice',
                )}
              </FilterButton>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
