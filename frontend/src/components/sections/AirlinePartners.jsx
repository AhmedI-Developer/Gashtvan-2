import { useTranslation } from 'react-i18next'
import { Plane } from 'lucide-react'
import { airlines } from '@/data/airlines'
import { cn } from '@/lib/cn'

function LogoCard({ airline }) {
  return (
    <article className="airline-card group">
      <img
        src={airline.logo}
        alt={airline.name}
        width={160}
        height={40}
        loading="eager"
        decoding="async"
        draggable={false}
        className={cn('airline-logo', airline.mark && 'airline-logo--mark')}
      />
      <span className="airline-card__name">{airline.name}</span>
    </article>
  )
}

function MarqueeGroup({ copy }) {
  return (
    <div className="airlines-marquee__group">
      {airlines.map((airline) => (
        <LogoCard key={`${airline.id}-${copy}`} airline={airline} />
      ))}
    </div>
  )
}

export default function AirlinePartners() {
  const { t } = useTranslation()

  if (!airlines.length) return null

  return (
    <section className="airline-partners" aria-label={t('home.airlinesLabel')}>
      <div className="airline-partners__glow" aria-hidden="true" />

      <div className="container-shell relative z-[1]">
        <div className="mx-auto max-w-xl text-center">
          <p className="eyebrow inline-flex items-center gap-2">
            <Plane size={14} strokeWidth={2.25} className="text-[var(--accent)]" aria-hidden="true" />
            {t('home.airlinesEyebrow')}
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[var(--text)] sm:text-3xl">
            {t('home.airlinesTitle')}
          </h2>
        </div>
      </div>

      <ul className="sr-only">
        {airlines.map((airline) => (
          <li key={airline.id}>{airline.name}</li>
        ))}
      </ul>

      {/* Force LTR so translateX(-50%) loops forever in Arabic/Kurdish too */}
      <div dir="ltr" className="airlines-marquee relative z-[1] mt-8" aria-hidden="true">
        <div className="airlines-marquee__fade airlines-marquee__fade--start" />
        <div className="airlines-marquee__fade airlines-marquee__fade--end" />

        <div className="airlines-marquee__track">
          <MarqueeGroup copy={0} />
          <MarqueeGroup copy={1} />
        </div>
      </div>
    </section>
  )
}
