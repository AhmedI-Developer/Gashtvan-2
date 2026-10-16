import { Search } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/cn'
import { cityLabel } from '@/lib/destinations'

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
  const labelFor = (key) => {
    const translated = t(`offers.categories.${key}`)
    return translated === `offers.categories.${key}` ? key : translated
  }

  return (
    <div className="space-y-4">
      <div className="chip-scroll" role="listbox" aria-label={t('offers.categoriesLabel')}>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            role="option"
            aria-selected={category === cat}
            onClick={() => setCategory(cat)}
            className={cn(
              'rounded-full border px-4 py-2 text-sm font-semibold transition whitespace-nowrap',
              category === cat
                ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--navy)]'
                : 'border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:border-[var(--accent)]',
            )}
          >
            {labelFor(cat)}
          </button>
        ))}
      </div>

      {destinations.length ? (
        <div className="chip-scroll" role="listbox" aria-label={t('offers.destinationsLabel')}>
          {['All', ...destinations].map((name) => (
            <button
              key={name}
              type="button"
              role="option"
              aria-selected={destination === name}
              onClick={() => setDestination?.(name)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-semibold transition whitespace-nowrap',
                destination === name
                  ? 'border-[var(--navy)] bg-[var(--navy)] text-white'
                  : 'border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:border-[var(--accent)]',
              )}
            >
              {name === 'All' ? t('offers.allDestinations') : cityLabel(name, t)}
            </button>
          ))}
        </div>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="relative min-w-0 flex-1">
          <span className="sr-only">{t('offers.searchLabel')}</span>
          <Search
            size={16}
            className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('offers.searchPlaceholder')}
            className="w-full rounded-[18px] border border-[var(--border)] bg-[var(--surface)] py-3 ps-10 pe-4 text-[var(--text)] outline-none focus:border-[var(--accent)]"
          />
        </label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full rounded-[18px] border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--text)] outline-none focus:border-[var(--accent)] sm:w-auto sm:min-w-[11rem]"
          aria-label={t('offers.sortLabel')}
        >
          <option value="newest">{t('offers.sortNewest')}</option>
          <option value="ending">{t('offers.sortEnding')}</option>
          <option value="price">{t('offers.sortPrice')}</option>
        </select>
      </div>
    </div>
  )
}
