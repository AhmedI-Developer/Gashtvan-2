import { Search } from 'lucide-react'
import { categories } from '@/lib/offers'
import { cn } from '@/lib/cn'

export default function OfferFilters({
  category,
  setCategory,
  query,
  setQuery,
  sort,
  setSort,
}) {
  return (
    <div className="space-y-4">
      <div className="chip-scroll" role="listbox" aria-label="Offer categories">
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
            {cat}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="relative min-w-0 flex-1">
          <span className="sr-only">Search offers</span>
          <Search
            size={16}
            className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search destination, title…"
            className="w-full rounded-[18px] border border-[var(--border)] bg-[var(--surface)] py-3 ps-10 pe-4 text-[var(--text)] outline-none focus:border-[var(--accent)]"
          />
        </label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full rounded-[18px] border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--text)] outline-none focus:border-[var(--accent)] sm:w-auto sm:min-w-[11rem]"
          aria-label="Sort offers"
        >
          <option value="newest">Newest</option>
          <option value="ending">Ending soon</option>
          <option value="price">Price</option>
        </select>
      </div>
    </div>
  )
}
