import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SectionHeading from '@/components/ui/SectionHeading'
import Skeleton from '@/components/ui/Skeleton'
import { useDestinations } from '@/hooks/useDestinations'
import { cityLabel, formatFromPrice } from '@/lib/destinations'

export default function Destinations() {
  const { t } = useTranslation()
  const { destinations, loading, error } = useDestinations()

  return (
    <section id="destinations" className="section-pad bg-[var(--bg-alt)]">
      <div className="container-shell">
        <SectionHeading
          eyebrow={t('destinations.eyebrow')}
          title={t('destinations.title')}
          description={t('destinations.description')}
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-36 w-full" />
              ))
            : destinations.map((destination) => (
                <Link
                  key={destination.code || destination.name}
                  to={`/offers?destination=${encodeURIComponent(destination.name)}`}
                  className="group rounded-[22px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow)] transition duration-300 hover:-translate-y-1 hover:border-[var(--accent)] sm:rounded-[26px]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-text)]">
                        {destination.originCode} → {destination.code}
                      </p>
                      <h3 className="mt-1 font-display text-xl font-bold text-[var(--text)]">
                        {cityLabel(destination.name, t)}
                      </h3>
                    </div>
                    <p className="shrink-0 text-sm font-semibold text-[var(--text)]">
                      {formatFromPrice(destination, t)}
                    </p>
                  </div>
                  <p className="mt-3 line-clamp-2 text-sm text-[var(--text-muted)]">
                    {destination.airlines.join(' · ')}
                  </p>
                </Link>
              ))}
        </div>

        {!loading && error ? (
          <p className="mt-6 text-[var(--text-muted)]">
            {t('destinations.error')}
          </p>
        ) : null}
      </div>
    </section>
  )
}
