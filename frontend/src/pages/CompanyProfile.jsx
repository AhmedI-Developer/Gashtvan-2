import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Seo from '@/components/layout/Seo'
import CountUp from '@/components/motion/CountUp'
import { company } from '@/content/company'
import { site } from '@/config/site'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/cn'
import kurdistanMountain from '@/assets/backgroundImage/Kurdistan-Mountain.jpg'

gsap.registerPlugin(ScrollTrigger)

function buildItems() {
  return [
    {
      id: 'profile',
      eyebrow: company.profile.eyebrow,
      title: company.profile.title,
      paragraphs: company.profile.paragraphs,
    },
    {
      id: 'stats',
      title: site.legalName,
      stats: company.profile.stats,
    },
    {
      id: 'vision',
      eyebrow: 'Purpose',
      title: company.vision.title,
      paragraphs: [company.vision.body],
    },
    {
      id: 'mission',
      eyebrow: 'Purpose',
      title: company.mission.title,
      paragraphs: [company.mission.body],
    },
    ...company.coreValues.items.map((item) => ({
      id: `value-${item.title}`,
      eyebrow: company.coreValues.title,
      title: item.title,
      paragraphs: [item.body],
    })),
    ...company.services.map((item) => ({
      id: item.id,
      eyebrow: 'Services',
      title: item.title,
      paragraphs: [item.summary, item.body],
    })),
    ...company.why.map((item) => ({
      id: `why-${item.title}`,
      eyebrow: 'Why Gashtvan',
      title: item.title,
      paragraphs: [item.body],
    })),
    {
      id: 'management',
      eyebrow: company.management.eyebrow,
      title: company.management.title,
      paragraphs: company.management.paragraphs,
    },
    ...company.management.timeline.map((item) => ({
      id: `timeline-${item.title}`,
      eyebrow: company.management.eyebrow,
      title: item.title,
      paragraphs: [item.detail],
    })),
    {
      id: 'future',
      eyebrow: company.future.eyebrow,
      title: company.future.title,
      paragraphs: [company.future.body],
      points: company.future.markers.map((marker) => marker.label),
    },
    {
      id: 'credentials',
      eyebrow: 'Credentials',
      title: 'Credentials',
      points: site.trustBadges,
    },
    {
      id: 'visit',
      eyebrow: 'Contact',
      title: site.location.label,
      paragraphs: [site.address, site.hours],
      points: [...site.phones, ...site.emails],
    },
  ]
}

function InfoCard({ item, active, cardRef }) {
  return (
    <article
      ref={cardRef}
      data-reached={active ? 'true' : 'false'}
      className={cn(
        'rounded-[22px] border bg-[var(--surface)] p-5 shadow-[var(--shadow)] transition-[border-color,box-shadow] duration-500 sm:rounded-[26px] sm:p-6',
        active
          ? 'border-[var(--accent)] shadow-[0_14px_36px_rgba(160,194,58,0.2)]'
          : 'border-[var(--border)]',
      )}
    >
      {item.eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-text)]">
          {item.eyebrow}
        </p>
      ) : null}
      <h2 className="mt-1 font-display text-xl font-bold text-[var(--text)] sm:text-2xl">
        {item.title}
      </h2>
      {item.paragraphs?.length ? (
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
          {item.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      ) : null}
      {item.stats?.length ? (
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {item.stats.map((stat) => (
            <div
              key={stat.label}
              className={cn(
                'rounded-[18px] border bg-[var(--surface-2)] px-4 py-3 transition-[border-color] duration-500',
                active ? 'border-[var(--accent)]' : 'border-[var(--border)]',
              )}
            >
              <p className="font-display text-2xl font-bold text-[var(--text)]">
                <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </p>
              <p className="mt-1 text-xs text-[var(--text-muted)]">{stat.label}</p>
            </div>
          ))}
        </div>
      ) : null}
      {item.points?.length ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {item.points.map((point) => (
            <li
              key={point}
              className={cn(
                'rounded-full border px-3 py-1 text-sm text-[var(--text-muted)] transition-[border-color] duration-500',
                active ? 'border-[var(--accent)]' : 'border-[var(--border)]',
              )}
            >
              {point}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  )
}

export default function CompanyProfile() {
  const items = useMemo(() => buildItems(), [])
  const trackRef = useRef(null)
  const cardRefs = useRef([])
  const reduced = useReducedMotion()
  const [activeUntil, setActiveUntil] = useState(reduced ? items.length - 1 : -1)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return undefined

    if (reduced) {
      track.style.setProperty('--line', '1')
      setActiveUntil(items.length - 1)
      return undefined
    }

    const markReached = (progress) => {
      track.style.setProperty('--line', String(progress))
      const trackRect = track.getBoundingClientRect()
      const lineEnd = trackRect.top + progress * trackRect.height
      let last = -1
      cardRefs.current.forEach((card, index) => {
        if (!card) return
        if (card.getBoundingClientRect().top <= lineEnd + 12) last = index
      })
      setActiveUntil((current) => (current === last ? current : last))
    }

    const trigger = ScrollTrigger.create({
      trigger: track,
      start: 'top 58%',
      end: 'bottom 42%',
      scrub: true,
      onUpdate: (self) => markReached(self.progress),
    })

    markReached(trigger.progress)
    const refreshId = requestAnimationFrame(() => ScrollTrigger.refresh())
    const settleId = setTimeout(() => ScrollTrigger.refresh(), 450)

    return () => {
      cancelAnimationFrame(refreshId)
      clearTimeout(settleId)
      trigger.kill()
    }
  }, [items.length, reduced])

  return (
    <main className="pb-16 pt-24 sm:pt-28">
      <Seo
        title="Company Profile"
        description="Gashtvan company profile — Erbil-based travel and tourism, IATA membership, and the standards behind every journey."
        path="/company"
      />

      <section className="container-shell">
        <div className="relative overflow-hidden rounded-[28px] text-white">
          <img
            src={kurdistanMountain}
            alt="Kurdistan highlands"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,32,58,0.35),rgba(4,32,58,0.88))]" />
          <div className="relative z-10 max-w-3xl px-6 py-14 sm:px-10 sm:py-20">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
              {company.profile.eyebrow}
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-5xl">
              {company.profile.title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm text-white/80 sm:text-base">
              {site.tagline}
            </p>
          </div>
        </div>
      </section>

      <section className="container-shell mt-10 sm:mt-14" aria-label="Company profile">
        <div
          ref={trackRef}
          className="relative mx-auto max-w-3xl"
          style={{ '--line': reduced ? 1 : 0 }}
        >
          <div
            className="pointer-events-none absolute start-[7px] top-3 bottom-3 w-0.5"
            aria-hidden="true"
          >
            <div
              className="h-full w-full origin-top bg-[var(--accent)]"
              style={{ transform: 'scaleY(var(--line))' }}
            />
            <span
              className="absolute start-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)] shadow-[0_0_0_4px_rgba(160,194,58,0.25)]"
              style={{ top: 'calc(var(--line) * 100%)' }}
            />
          </div>

          <ol className="space-y-5 ps-8 sm:ps-10">
            {items.map((item, index) => (
              <li key={item.id}>
                <InfoCard
                  item={item}
                  active={index <= activeUntil}
                  cardRef={(node) => {
                    cardRefs.current[index] = node
                  }}
                />
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  )
}
