import { useTranslation } from 'react-i18next'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'
import DestinationCard from '@/components/destinations/DestinationCard'
import { DestinationCardSkeleton } from '@/components/ui/Skeleton'
import { useDestinations } from '@/hooks/useDestinations'

const PREVIEW_COUNT = 6

export default function Destinations() {
  const { t } = useTranslation()
  const { destinations, loading, error } = useDestinations()
  const preview = destinations.slice(0, PREVIEW_COUNT)

  return (
    <section id="destinations" className="section-pad bg-[var(--bg-alt)]">
      <div className="container-shell">
        <div className="mb-2 flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading
            className="mb-0"
            eyebrow={t('destinations.eyebrow')}
            title={t('destinations.title')}
            description={t('destinations.description')}
          />
          <Button to="/destinations" variant="secondary" className="w-full shrink-0 sm:w-auto">
            {t('destinations.viewAll')}
          </Button>
        </div>

        <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 xl:grid-cols-3">
          {loading
            ? Array.from({ length: PREVIEW_COUNT }).map((_, i) => (
                <DestinationCardSkeleton key={i} />
              ))
            : preview.map((destination) => (
                <DestinationCard
                  key={destination.code || destination.name}
                  destination={destination}
                />
              ))}
        </div>

        {!loading && error ? (
          <p className="mt-6 text-[var(--text-muted)]">{t('destinations.error')}</p>
        ) : null}
      </div>
    </section>
  )
}
