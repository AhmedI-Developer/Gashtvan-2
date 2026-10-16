/**
 * Services — editorial numbered list + sticky image panel
 * --------------------------------------------------------------------------
 * Images / copy base: `/src/data/services.js`
 * Localized titles & bodies: `/src/content/company*.js`
 * List type scale: `services-title` clamp below
 * Panel: `./services/ServiceImagePanel.jsx`
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GreenShape from '@/components/brand/GreenShape'
import { services as servicesData } from '@/data/services'
import { useCompanyContent } from '@/hooks/useCompanyContent'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/cn'
import ServiceImagePanel from './services/ServiceImagePanel'
import ServiceModal from './services/ServiceModal'

gsap.registerPlugin(ScrollTrigger)

function summaryText(text, maxSentences = 2) {
  const parts = text.match(/[^.!?]+[.!?]+/g) || [text]
  return parts.slice(0, maxSentences).join(' ').trim()
}

function useIsDesktop() {
  const [desktop, setDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 1024px)').matches : true,
  )
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return desktop
}

export default function Services() {
  const { t, i18n } = useTranslation()
  const company = useCompanyContent()
  const reduced = useReducedMotion()
  const desktop = useIsDesktop()

  const sectionRef = useRef(null)
  const listRef = useRef(null)
  const rowRefs = useRef([])
  const triggerRef = useRef(null)

  const [scrollIndex, setScrollIndex] = useState(0)
  const [hoverIndex, setHoverIndex] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(0)
  const [modalIndex, setModalIndex] = useState(null)
  const [shapeY, setShapeY] = useState(0)
  const [entered, setEntered] = useState(reduced)

  const items = useMemo(
    () =>
      servicesData.map((service) => {
        const localized = company.services.find((entry) => entry.id === service.id)
        const fullText = localized?.body || service.fullText
        return {
          ...service,
          title: localized?.title || service.title,
          summary: summaryText(fullText),
          fullText,
          icon: localized?.icon || service.icon,
          listLabel:
            i18n.language === 'en'
              ? service.shortLabel
              : (localized?.title || service.title).toUpperCase(),
        }
      }),
    [company.services, i18n.language],
  )

  const activeIndex = desktop ? (hoverIndex ?? scrollIndex) : mobileOpen
  const activeService = items[activeIndex] || items[0]
  const modalService = modalIndex != null ? items[modalIndex] : null

  const inView = useInView(sectionRef, { once: true, amount: 0.15 })
  useEffect(() => {
    if (inView) setEntered(true)
  }, [inView])

  const openModal = useCallback((index) => {
    setModalIndex(index)
  }, [])

  const closeModal = useCallback(() => {
    setModalIndex(null)
  }, [])

  // Preload neighboring images
  useEffect(() => {
    ;[activeIndex - 1, activeIndex + 1].forEach((i) => {
      const item = items[i]
      if (!item) return
      const img = new Image()
      img.src = item.image
    })
  }, [activeIndex, items])

  // Slide GreenShape to the active row
  useEffect(() => {
    const row = rowRefs.current[activeIndex]
    const list = listRef.current
    if (!row || !list) return
    setShapeY(row.offsetTop + row.offsetHeight / 2)
  }, [activeIndex, items.length, desktop])

  // Scroll-linked activation (desktop only)
  useEffect(() => {
    if (!desktop || reduced) return undefined
    const list = listRef.current
    if (!list) return undefined

    const updateClosest = () => {
      if (hoverIndex != null) return
      const mid = window.innerHeight * 0.5
      let best = 0
      let bestDist = Infinity
      rowRefs.current.forEach((row, index) => {
        if (!row) return
        const box = row.getBoundingClientRect()
        const center = box.top + box.height / 2
        const dist = Math.abs(center - mid)
        if (dist < bestDist) {
          bestDist = dist
          best = index
        }
      })
      setScrollIndex(best)
    }

    const ctx = gsap.context(() => {
      triggerRef.current = ScrollTrigger.create({
        id: 'services-editorial',
        trigger: list,
        start: 'top 70%',
        end: 'bottom 30%',
        onUpdate: updateClosest,
        onRefresh: updateClosest,
      })
    }, sectionRef)

    updateClosest()
    window.addEventListener('resize', updateClosest)

    return () => {
      window.removeEventListener('resize', updateClosest)
      ctx.revert()
      triggerRef.current = null
    }
  }, [desktop, reduced, hoverIndex, items.length])

  const focusRow = (index) => {
    rowRefs.current[index]
      ?.querySelector('button[aria-expanded]')
      ?.focus()
  }

  const onRowKeyDown = (event, index) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      const next = Math.min(items.length - 1, index + 1)
      focusRow(next)
      if (desktop) setHoverIndex(next)
      else setMobileOpen(next)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      const prev = Math.max(0, index - 1)
      focusRow(prev)
      if (desktop) setHoverIndex(prev)
      else setMobileOpen(prev)
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      if (!desktop) {
        setMobileOpen(index)
      }
      openModal(index)
    }
  }

  const accentText = 'text-[var(--accent-text)]'

  return (
    <section
      id="services"
      ref={sectionRef}
      className="section-pad relative overflow-hidden bg-[var(--bg)]"
      aria-labelledby="services-heading"
    >
      <div className="container-shell">
        <header className="mb-8 flex items-center justify-between gap-4 lg:mb-12">
          <h2
            id="services-heading"
            className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-[var(--text)] sm:text-sm"
          >
            {t('home.servicesLabel')}
          </h2>
          <a
            href="#services-list"
            className="rounded-full border border-[var(--border)] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-[var(--text-muted)] transition hover:border-[var(--accent)] hover:text-[var(--text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            {t('home.viewAll')}
          </a>
        </header>

        <div className="relative grid items-start gap-10 lg:grid-cols-[minmax(0,1.62fr)_minmax(280px,0.9fr)] lg:gap-0 xl:grid-cols-[minmax(0,1.7fr)_minmax(300px,0.85fr)]">
          {/* List column */}
          <div className="relative min-w-0 lg:pe-8 xl:pe-12">
            {!reduced && desktop ? (
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute start-0 z-20 -translate-x-1/2 -translate-y-1/2"
                animate={{ top: shapeY }}
                transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              >
                <GreenShape size={12} />
              </motion.div>
            ) : null}

            <ol id="services-list" ref={listRef} className="relative">
              {items.map((service, index) => {
                const active = index === activeIndex
                const panelId = `service-panel-${service.id}`

                return (
                  <motion.li
                    key={service.id}
                    initial={false}
                    animate={
                      entered
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: reduced ? 0 : 24 }
                    }
                    transition={{
                      duration: 0.45,
                      delay: entered && !reduced ? index * 0.08 : 0,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <div
                      ref={(node) => {
                        rowRefs.current[index] = node
                      }}
                      className={cn(
                        'group relative flex w-full min-h-[14vh] flex-col justify-center py-5 text-start transition-colors duration-200 lg:py-6',
                        active ? '' : 'opacity-90',
                      )}
                      onMouseEnter={() => {
                        if (desktop) setHoverIndex(index)
                      }}
                      onMouseLeave={() => {
                        if (desktop) setHoverIndex(null)
                      }}
                    >
                    <button
                      type="button"
                      id={`service-trigger-${service.id}`}
                      aria-expanded={active}
                      aria-controls={panelId}
                      onFocus={() => {
                        if (desktop) setHoverIndex(index)
                      }}
                      onBlur={(event) => {
                        if (
                          desktop &&
                          !listRef.current?.contains(event.relatedTarget)
                        ) {
                          setHoverIndex(null)
                        }
                      }}
                      onClick={() => {
                        if (desktop) {
                          openModal(index)
                        } else {
                          setMobileOpen(index)
                        }
                      }}
                      onKeyDown={(event) => onRowKeyDown(event, index)}
                      className="relative w-full text-start focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
                    >
                      {/* Active green bar */}
                      <span
                        aria-hidden="true"
                        className={cn(
                          'absolute start-0 top-1/2 h-9 w-1.5 origin-center -translate-y-1/2 rounded-full bg-[var(--accent)] transition-transform duration-200 ease-out',
                          active ? 'scale-y-100' : 'scale-y-0',
                        )}
                      />

                      <div className="flex items-baseline gap-4 ps-4 sm:gap-6 sm:ps-5">
                        <span
                          className={cn(
                            'shrink-0 font-display text-sm font-medium tracking-[0.12em] transition-colors duration-200',
                            active ? accentText : 'text-[var(--text-muted)]',
                          )}
                        >
                          {service.number}
                        </span>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-col gap-3 lg:flex-row lg:items-baseline lg:gap-8">
                            <span
                              className={cn(
                                'services-title block font-display text-[clamp(32px,_8vw,_48px)] font-medium uppercase leading-[0.95] tracking-tight transition-[color,transform] duration-200 ease-out lg:text-[clamp(48px,_6.5vw,_120px)]',
                                active
                                  ? cn(accentText, 'translate-x-3')
                                  : 'text-[var(--text)] translate-x-0',
                              )}
                            >
                              {service.listLabel}
                            </span>

                            {/* Desktop expanded description */}
                            <AnimatePresence initial={false}>
                              {active && desktop ? (
                                <motion.p
                                  id={panelId}
                                  initial={
                                    reduced
                                      ? { opacity: 0 }
                                      : { opacity: 0, y: 12 }
                                  }
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={
                                    reduced
                                      ? { opacity: 0 }
                                      : { opacity: 0, y: 8 }
                                  }
                                  transition={{
                                    duration: 0.28,
                                    delay: reduced ? 0 : 0.08,
                                    ease: [0.22, 1, 0.36, 1],
                                  }}
                                  className="max-w-[40ch] text-[16px] leading-relaxed text-[var(--text-muted)] sm:text-[17px] lg:max-w-[36ch] xl:text-[18px]"
                                >
                                  {service.summary}
                                </motion.p>
                              ) : null}
                            </AnimatePresence>
                          </div>

                        </div>
                      </div>
                    </button>

                          {/* Mobile accordion body */}
                          <AnimatePresence initial={false}>
                            {active && !desktop ? (
                              <motion.div
                                id={panelId}
                                initial={
                                  reduced ? { opacity: 0 } : { opacity: 0, y: 12 }
                                }
                                animate={{ opacity: 1, y: 0 }}
                                exit={
                                  reduced ? { opacity: 0 } : { opacity: 0, y: 8 }
                                }
                                transition={{ duration: 0.3 }}
                                className="mt-5 space-y-4 ps-4 sm:ps-5"
                              >
                                <div className="overflow-hidden rounded-[22px] border border-[var(--border)]">
                                  <img
                                    src={service.image}
                                    alt={service.imageAlt}
                                    width={1000}
                                    height={750}
                                    loading={index === 0 ? 'eager' : 'lazy'}
                                    className="aspect-[4/3] h-auto w-full object-cover"
                                  />
                                </div>
                                <p className="max-w-[48ch] text-base leading-relaxed text-[var(--text-muted)]">
                                  {service.summary}
                                </p>
                                <button
                                  type="button"
                                  onClick={() => openModal(index)}
                                  className="text-sm font-semibold text-[var(--accent-text)] underline-offset-4 transition hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                                >
                                  {t('home.readMore')}
                                </button>
                              </motion.div>
                            ) : null}
                          </AnimatePresence>

                      {/* Divider */}
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-px origin-left bg-[var(--border)]"
                        style={{
                          transform: entered || reduced ? 'scaleX(1)' : 'scaleX(0)',
                          transition: reduced
                            ? 'none'
                            : `transform 0.55s cubic-bezier(0.22,1,0.36,1) ${index * 0.08}s`,
                        }}
                      />
                    </div>
                  </motion.li>
                )
              })}
            </ol>
          </div>

          {/* Sticky image panel — desktop */}
          <aside className="relative z-10 hidden lg:-ms-10 lg:block lg:sticky lg:top-[16vh] xl:-ms-14">
            <ServiceImagePanel
              service={activeService}
              reduced={reduced}
              onOpen={() => openModal(activeIndex)}
            />
          </aside>
        </div>
      </div>

      <ServiceModal
        open={modalIndex != null}
        onClose={closeModal}
        service={modalService}
      />
    </section>
  )
}
