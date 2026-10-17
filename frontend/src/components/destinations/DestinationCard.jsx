import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowUpRight } from 'lucide-react'
import { cityLabel, formatFromPrice } from '@/lib/destinations'
import { cn } from '@/lib/cn'

export default function DestinationCard({ destination, className }) {
  const { t } = useTranslation()

  return (
    <Link
      to={`/offers?destination=${encodeURIComponent(destination.name)}`}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-[22px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow)] transition duration-300 hover:-translate-y-1 hover:border-[var(--accent)] sm:rounded-[26px] sm:p-6',
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--accent),transparent)] opacity-0 transition group-hover:opacity-100"
      />

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-text)]">
            {destination.originCode} → {destination.code || '—'}
          </p>
          <h3 className="mt-1 font-display text-xl font-bold tracking-tight text-[var(--text)] sm:text-2xl">
            {cityLabel(destination.name, t)}
          </h3>
        </div>
        <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-muted)] transition group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[var(--navy)]">
          <ArrowUpRight size={16} strokeWidth={2.25} aria-hidden="true" />
        </span>
      </div>

      <p className="mt-4 text-sm font-semibold text-[var(--text)]">
        {formatFromPrice(destination, t)}
      </p>

      {destination.airlines?.length ? (
        <p className="mt-2 line-clamp-2 text-sm text-[var(--text-muted)]">
          {destination.airlines.join(' · ')}
        </p>
      ) : null}

      <p className="mt-auto pt-5 text-xs font-semibold uppercase tracking-wider text-[var(--accent-text)] opacity-0 transition group-hover:opacity-100">
        {t('destinations.viewOffers')}
      </p>
    </Link>
  )
}
