import SectionHeading from '@/components/ui/SectionHeading'
import Reveal from '@/components/motion/Reveal'
import { company } from '@/content/company'

export default function FutureVision() {
  const { future } = company

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
            style={{
              background:
                'radial-gradient(circle at 40% 45%, rgba(160,194,58,0.12), transparent 40%), linear-gradient(160deg, #0a2a46, #04203a 55%, #11181f)',
            }}
            role="img"
            aria-label="Animated map of Gashtvan expansion from Erbil"
          >
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
                <span className="absolute start-3.5 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur sm:inline">
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
