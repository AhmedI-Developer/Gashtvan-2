import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Seo from '@/components/layout/Seo'
import CountUp from '@/components/motion/CountUp'
import { useCompanyContent } from '@/hooks/useCompanyContent'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import office from '@/assets/backgroundImage/contact/office.jpg'
import traveler from '@/assets/backgroundImage/contact/traveler.jpg'
import consultantReview from '@/assets/backgroundImage/contact/consultantReview.jpg'
import erbilSkyline from '@/assets/backgroundImage/contact/erbilSkyline.jpg'
import hotel from '@/assets/backgroundImage/services/hotel.jpg'
import airport from '@/assets/backgroundImage/airport.jpg'
import globalNetwork from '@/assets/backgroundImage/Global_network.jpg'
import travelDesk from '@/assets/backgroundImage/about/travel-desk.jpg'
import destinationLake from '@/assets/backgroundImage/about/destination-lake.jpg'
import erbilViewVideo from '@/assets/backgroundVdeos/erbilView.mp4'
import { cn } from '@/lib/cn'

gsap.registerPlugin(ScrollTrigger)

function buildItems(company, t) {
  return [
    {
      id: 'story',
      kicker: company.profile.eyebrow,
      title: company.profile.title,
      paragraphs: company.profile.paragraphs,
      image: office,
      imageAlt: t('about.images.office'),
    },
    {
      id: 'stats',
      stats: company.profile.stats,
      image: airport,
      imageAlt: t('about.images.airport'),
    },
    {
      id: 'vision',
      title: company.vision.title,
      paragraphs: [company.vision.body],
      points: company.vision.points,
      image: globalNetwork,
      imageAlt: t('about.images.global'),
    },
    {
      id: 'mission',
      title: company.mission.title,
      paragraphs: [company.mission.body],
      points: company.mission.points,
      image: consultantReview,
      imageAlt: t('about.images.consult'),
    },
    {
      id: 'values',
      title: company.coreValues.title,
      points: company.coreValues.items.map((item) => `${item.title}. ${item.body}`),
      image: hotel,
      imageAlt: t('about.images.hospitality'),
    },
    {
      id: 'why',
      kicker: t('home.whyEyebrow'),
      title: t('home.whyTitle'),
      points: company.why.map((item) => `${item.title}. ${item.body}`),
      image: traveler,
      imageAlt: t('about.images.traveler'),
    },
    {
      id: 'team',
      kicker: company.management.eyebrow,
      title: company.management.title,
      paragraphs: company.management.paragraphs,
      timeline: company.management.timeline,
      image: travelDesk,
      imageAlt: t('about.images.planning'),
    },
    {
      id: 'future',
      kicker: company.future.eyebrow,
      title: company.future.title,
      paragraphs: [company.future.body],
      image: destinationLake,
      imageAlt: t('about.images.journey'),
    },
  ]
}

export default function AboutUs() {
  const reducedMotion = useReducedMotion()
  const [heroVideoFailed, setHeroVideoFailed] = useState(false)
  const showHeroVideo = !reducedMotion && !heroVideoFailed

  const { t } = useTranslation()
  const company = useCompanyContent()
  const items = useMemo(() => buildItems(company, t), [company, t])
  const trackRef = useRef(null)
  const cardsRef = useRef([])
  const [activeUntil, setActiveUntil] = useState(-1)

  useEffect(() => {
    const root = trackRef.current
    if (!root) return undefined

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      root.style.setProperty('--line', '1')
      setActiveUntil(items.length - 1)
      return undefined
    }

    let ctx
    const timer = window.setTimeout(() => {
      ctx = gsap.context(() => {
        const cards = cardsRef.current.filter(Boolean)
        ScrollTrigger.create({
          trigger: root,
          start: 'top 58%',
          end: 'bottom 42%',
          scrub: true,
          onUpdate: (self) => {
            root.style.setProperty('--line', String(self.progress))
            const lineY = root.getBoundingClientRect().top + root.offsetHeight * self.progress
            let last = -1
            cards.forEach((card, index) => {
              const box = card.getBoundingClientRect()
              if (lineY >= box.top + box.height * 0.18) last = index
            })
            setActiveUntil(last)
          },
        })
      }, root)
      requestAnimationFrame(() => ScrollTrigger.refresh())
    }, 450)

    return () => {
      window.clearTimeout(timer)
      ctx?.revert()
    }
  }, [items.length])

  return (
    <main>
      <Seo
        title={t('nav.about')}
        description={company.profile.paragraphs[0]}
        path="/about"
      />

      <section className="relative isolate min-h-[56svh] overflow-hidden sm:min-h-[52svh]">
        <div className="absolute inset-0 overflow-hidden">
          {showHeroVideo ? (
            <video
              className="media-cover media-cover--erbil"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={erbilSkyline}
              aria-hidden="true"
              onError={() => setHeroVideoFailed(true)}
            >
              <source src={erbilViewVideo} type="video/mp4" />
            </video>
          ) : (
            <img
              src={erbilSkyline}
              alt={t('about.images.erbil')}
              className="media-cover media-cover--erbil"
            />
          )}
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,16,32,0.35),rgba(4,16,32,0.82))]" />
        <div className="container-shell relative z-10 flex min-h-[56svh] flex-col justify-end pb-12 pt-28 text-white sm:min-h-[52svh] sm:pb-16 sm:pt-32">
          <p className="eyebrow !text-[var(--accent)]">{t('nav.about')}</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
            {company.profile.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/85 sm:text-lg">
            {company.profile.paragraphs[0]}
          </p>
        </div>
      </section>

      <section
        className="section-pad relative overflow-hidden bg-[var(--bg)]"
        aria-label={t('nav.about')}
      >
        <div ref={trackRef} className="container-shell relative" style={{ '--line': 0 }}>
          <div
            className="pointer-events-none absolute inset-y-0 left-4 w-px bg-[var(--border)] md:left-1/2 md:-translate-x-1/2"
            aria-hidden="true"
          >
            <div
              className="absolute inset-x-0 top-0 origin-top bg-[var(--accent)]"
              style={{ height: '100%', transform: 'scaleY(var(--line))' }}
            />
            <span
              className="absolute left-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[var(--bg)] bg-[var(--accent)] shadow-[0_0_0_6px_color-mix(in_srgb,var(--accent)_28%,transparent)]"
              style={{ top: 'calc(var(--line) * 100%)' }}
            />
          </div>

          <ol className="space-y-6 ps-10 md:space-y-14 md:ps-0">
            {items.map((item, index) => {
              const live = index <= activeUntil
              const slot = index % 3
              return (
                <li
                  key={item.id}
                  ref={(node) => {
                    cardsRef.current[index] = node
                  }}
                  className={cn(
                    'relative w-full',
                    slot === 0 && 'md:ml-auto md:w-[44%]',
                    slot === 1 && 'md:mr-auto md:w-[44%]',
                    slot === 2 && 'md:mx-auto md:w-[78%]',
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute z-10 hidden h-3.5 w-3.5 rounded-full border-2 border-[var(--bg)] md:block',
                      live ? 'bg-[var(--accent)]' : 'bg-[var(--border)]',
                      slot === 0 && 'top-8 -left-1.5',
                      slot === 1 && 'top-8 -right-1.5',
                      slot === 2 && 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2',
                    )}
                  />
                  <div
                    className={cn(
                      'relative overflow-hidden rounded-[24px] border-[4px] border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--shadow)] transition-colors duration-500 sm:p-5',
                      live && 'story-live',
                    )}
                    style={live ? { borderColor: 'var(--accent)' } : undefined}
                  >
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      className={cn(
                        'mb-4 h-40 w-full rounded-[16px] object-cover',
                        slot === 2 && 'sm:h-56',
                      )}
                    />
                    <div className="relative px-1 pb-1 sm:px-2">
                      {item.stats ? (
                        <dl className="grid gap-4 sm:grid-cols-3">
                          {item.stats.map((stat) => (
                            <div key={stat.label}>
                              <dt className="text-sm text-[var(--text-muted)]">{stat.label}</dt>
                              <dd className="mt-1 font-display text-3xl font-bold text-[var(--text)]">
                                <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                              </dd>
                            </div>
                          ))}
                        </dl>
                      ) : (
                        <>
                          {item.kicker ? <p className="eyebrow">{item.kicker}</p> : null}
                          <h2 className="mt-2 font-display text-2xl font-bold text-[var(--text)] sm:text-3xl">
                            {item.title}
                          </h2>
                          {item.paragraphs?.map((paragraph) => (
                            <p key={paragraph} className="mt-3 max-w-3xl text-[var(--text-muted)]">
                              {paragraph}
                            </p>
                          ))}
                          {item.points ? (
                            <ul className="mt-4 space-y-2">
                              {item.points.map((point) => (
                                <li key={point} className="text-[var(--text-muted)]">
                                  {point}
                                </li>
                              ))}
                            </ul>
                          ) : null}
                          {item.timeline ? (
                            <ol className="mt-5 grid gap-3 sm:grid-cols-2">
                              {item.timeline.map((step) => (
                                <li
                                  key={step.title}
                                  className="rounded-[18px] border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_82%,transparent)] p-4"
                                >
                                  <p className="font-display font-bold text-[var(--text)]">{step.title}</p>
                                  <p className="mt-1 text-sm text-[var(--text-muted)]">{step.detail}</p>
                                </li>
                              ))}
                            </ol>
                          ) : null}
                        </>
                      )}
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </section>
    </main>
  )
}
