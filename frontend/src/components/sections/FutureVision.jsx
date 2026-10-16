import SectionHeading from '@/components/ui/SectionHeading'
import Reveal from '@/components/motion/Reveal'
import { useTranslation } from 'react-i18next'
import { useCompanyContent } from '@/hooks/useCompanyContent'
import worldMap from '@/assets/backgroundImage/World_map.jpg'

export default function FutureVision() {
  const { t } = useTranslation()
  const { future } = useCompanyContent()

  return (
    <section id="future" className="section-pad bg-[var(--bg-alt)]">
      <div className="container-shell grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
        <div className="min-w-0">
          <SectionHeading eyebrow={future.eyebrow} title={future.title} />
          <p className="max-w-xl text-base text-[var(--text-muted)] sm:text-lg">
            {future.body}
          </p>
        </div>

        <Reveal>
          <div
            className="relative aspect-[4/3] overflow-hidden rounded-[22px] border border-[var(--border)] sm:rounded-[28px]"
            role="img"
            aria-label={t('home.mapLabel')}
          >
            <img
              src={worldMap}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              style={{ transform: 'scale(1.55)', transformOrigin: 'center 28%' }}
            />
            <div className="absolute inset-0 bg-[rgba(4,32,58,0.28)]" />
            <svg
              viewBox="0 0 100 75"
              className="absolute inset-0 h-full w-full opacity-40"
            >
              <path
                d="M10,40 C30,20 50,55 70,30 C85,15 92,40 98,28"
                fill="none"
                stroke="rgba(160,194,58,0.7)"
                strokeWidth="0.4"
                strokeDasharray="1.2 1.5"
              />
            </svg>
            {future.markers.map((m, i) => (
              <span
                key={m.id}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${m.x}%`, top: `${m.y}%` }}
                title={m.label}
              >
                <span
                  className="absolute inset-0 animate-ping rounded-full bg-[var(--accent)] opacity-40"
                  style={{ animationDelay: `${i * 0.35}s` }}
                />
                <span className="relative block h-2.5 w-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_16px_rgba(160,194,58,0.8)] sm:h-3 sm:w-3" />
                <span
                  className={`absolute top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-full bg-[rgba(4,32,58,0.72)] px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur sm:inline ${
                    m.id === 'neighbors' ? 'start-3.5' : 'end-3.5'
                  }`}
                >
                  {m.label}
                </span>
              </span>
            ))}

            <ul className="absolute inset-x-0 bottom-0 flex flex-wrap gap-1.5 bg-gradient-to-t from-[rgba(4,32,58,0.9)] to-transparent p-3 pt-8 sm:hidden">
              {future.markers.map((m) => (
                <li
                  key={m.id}
                  className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur"
                >
                  {m.label}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
