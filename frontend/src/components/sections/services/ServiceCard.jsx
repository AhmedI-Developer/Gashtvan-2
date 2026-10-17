import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import {
  ArrowRight,
  Briefcase,
  Car,
  FileCheck,
  GraduationCap,
  Handshake,
  Hotel,
  Plane,
  TreePalm,
} from 'lucide-react'
import GreenShape from '@/components/brand/GreenShape'
import { site } from '@/config/site'
import { cn } from '@/lib/cn'

const CARD_GRAD =
  'bg-[linear-gradient(135deg,#04203A_0%,#123B5E_100%)] text-white border-[var(--border)]'

function ServiceIcon({ name, size = 36 }) {
  const stroke = 1.75
  const accent = Math.round(size * 0.42)

  if (name === 'Hotel') {
    return (
      <span className="relative inline-flex text-white" aria-hidden="true">
        <Hotel size={size} strokeWidth={stroke} strokeLinecap="round" />
        <TreePalm
          size={accent}
          strokeWidth={stroke}
          className="absolute -bottom-0.5 -end-1 text-[var(--accent)]"
        />
        <Car
          size={Math.round(accent * 0.85)}
          strokeWidth={stroke}
          className="absolute -end-0.5 top-0 text-[var(--accent)] opacity-90"
        />
      </span>
    )
  }

  const map = {
    Plane,
    Handshake,
    Briefcase,
    FileCheck,
    GraduationCap,
  }
  const Icon = map[name] || Plane
  return (
    <span className="relative inline-flex text-white" aria-hidden="true">
      <Icon size={size} strokeWidth={stroke} strokeLinecap="round" />
      <span className="absolute -bottom-0.5 start-0 h-1.5 w-4 rounded-full bg-[var(--accent)]" />
    </span>
  )
}

function IconBadge({ name, size = 'md' }) {
  const iconSize = size === 'lg' ? 36 : 30
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white',
        size === 'lg' ? 'h-14 w-14' : 'h-12 w-12',
      )}
    >
      <ServiceIcon name={name} size={iconSize} />
    </span>
  )
}

function useCardTilt(reduced) {
  const ref = useRef(null)
  const mx = useMotionValue(50)
  const my = useMotionValue(50)
  const glow = useMotionTemplate`radial-gradient(360px circle at ${mx}% ${my}%, color-mix(in srgb, var(--accent) 18%, transparent), transparent 55%)`

  const onMove = (event) => {
    if (reduced || !ref.current) return
    if (!window.matchMedia('(min-width: 1024px) and (pointer: fine)').matches) return
    const box = ref.current.getBoundingClientRect()
    mx.set(((event.clientX - box.left) / box.width) * 100)
    my.set(((event.clientY - box.top) / box.height) * 100)
    const rx = ((((event.clientY - box.top) / box.height) * 100 - 50) / 50) * -4
    const ry = ((((event.clientX - box.left) / box.width) * 100 - 50) / 50) * 4
    ref.current.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`
  }

  const onLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = ''
    mx.set(50)
    my.set(50)
  }

  return { ref, glow, onMove, onLeave }
}

const hoverChrome =
  'hover:border-[var(--accent)] hover:shadow-[0_0_0_1.5px_var(--accent),0_0_24px_color-mix(in_srgb,var(--accent)_40%,transparent)] focus-visible:border-[var(--accent)] focus-visible:shadow-[0_0_0_1.5px_var(--accent),0_0_24px_color-mix(in_srgb,var(--accent)_40%,transparent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]'

/**
 * Bento service / CTA card.
 * Images: `/src/data/services.js` only.
 */
export function ServiceCard({ service, index, reduced, entered, onOpen }) {
  const { t } = useTranslation()
  const { ref, glow, onMove, onLeave } = useCardTilt(reduced)
  const isPhoto = service.layout === 'photo'
  const isWide = service.layout === 'wide'
  const isSmall = service.layout === 'small'

  const wa = `https://wa.me/${site.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
    `Hello Gashtvan — I would like to inquire about ${service.fullTitle}.`,
  )}`

  const onKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onOpen()
    }
  }

  return (
    <motion.li
      initial={false}
      animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: reduced ? 0 : 32 }}
      transition={{
        duration: 0.45,
        delay: entered && !reduced ? index * 0.08 : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn('list-none h-full', service.gridClass)}
    >
      <div
        ref={ref}
        role="button"
        tabIndex={0}
        onClick={onOpen}
        onKeyDown={onKeyDown}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onBlur={onLeave}
        aria-label={`Open ${service.fullTitle}`}
        className={cn(
          'group relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-[28px] border text-start shadow-[var(--shadow)] transition-[border-color,box-shadow,transform] duration-300',
          CARD_GRAD,
          hoverChrome,
          isPhoto && 'justify-end p-6 sm:p-7 lg:p-8',
          isWide && 'p-5 sm:flex-row sm:items-center sm:gap-5 sm:p-6',
          isSmall && 'p-5',
          !reduced && 'will-change-transform',
        )}
        style={reduced ? undefined : { transformStyle: 'preserve-3d' }}
      >
        {!reduced ? (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
            style={{ background: glow }}
          />
        ) : null}

        {isPhoto ? (
          <>
            <img
              src={service.image}
              alt=""
              width={1200}
              height={1600}
              loading="eager"
              className="absolute inset-0 h-full w-full object-cover object-[center_35%] transition-transform duration-500 group-hover:scale-105"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(180deg,transparent_38%,#04203Acc_72%,#04203Af2_100%)]"
            />
            <div className="relative z-[1] max-w-[min(100%,42ch)]">
              <h3
                className="font-display font-semibold tracking-tight text-balance text-white"
                style={{ fontSize: 'clamp(1.75rem, 2.8vw, 2.5rem)', lineHeight: 1.15 }}
              >
                {service.cardTitle}
              </h3>
              <p className="clamp-3 mt-2.5 text-[0.95rem] leading-relaxed text-white/85 sm:text-base">
                {service.shortText}
              </p>
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="relative z-[2] mt-5 inline-flex items-center justify-center rounded-full border border-white px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--navy)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                {t('home.inquireNow')}
              </a>
            </div>
          </>
        ) : (
          <>
            <div
              className={cn(
                'relative z-[1] shrink-0 transition-transform duration-300 group-hover:scale-[1.04]',
                isWide ? 'mb-3 sm:mb-0' : 'mb-3',
              )}
            >
              <IconBadge name={service.icon} size={isWide ? 'lg' : 'md'} />
            </div>
            <div
              className={cn(
                'relative z-[1] min-w-0 flex-1',
                isSmall ? 'pb-12 pe-12' : 'pb-12 pe-2 sm:pb-0 sm:pe-12',
              )}
            >
              <h3
                className={cn(
                  'font-display font-semibold tracking-tight text-balance text-white',
                  isWide && 'text-xl leading-snug sm:text-2xl',
                  isSmall && 'text-lg leading-snug sm:text-xl',
                )}
              >
                {service.cardTitle}
              </h3>
              <p
                className={cn(
                  'clamp-2 mt-1.5 leading-relaxed text-white/80',
                  isWide && 'text-[0.95rem] sm:text-base',
                  isSmall && 'text-sm sm:text-[0.95rem]',
                )}
              >
                {service.shortText}
              </p>
            </div>
            <span
              aria-hidden="true"
              className="absolute bottom-5 end-5 z-[1] inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/80 text-white transition duration-300 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[var(--navy)]"
            >
              <ArrowRight size={18} strokeWidth={2} className="rtl:rotate-180" />
            </span>
          </>
        )}
      </div>
    </motion.li>
  )
}

export function CtaCard({ gridClass, reduced, entered, index }) {
  const { t } = useTranslation()
  const { ref, glow, onMove, onLeave } = useCardTilt(reduced)

  return (
    <motion.li
      initial={false}
      animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: reduced ? 0 : 32 }}
      transition={{
        duration: 0.45,
        delay: entered && !reduced ? index * 0.08 : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn('list-none h-full', gridClass)}
    >
      <Link
        ref={ref}
        to="/contact"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onBlur={onLeave}
        className={cn(
          'group relative flex h-full w-full flex-col overflow-hidden rounded-[28px] border p-5 shadow-[var(--shadow)] transition-[border-color,box-shadow] duration-300 sm:p-6',
          CARD_GRAD,
          hoverChrome,
          !reduced && 'will-change-transform',
        )}
        style={reduced ? undefined : { transformStyle: 'preserve-3d' }}
      >
        {!reduced ? (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
            style={{ background: glow }}
          />
        ) : null}

        <span
          aria-hidden="true"
          className="relative z-[1] inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--accent)]/40 bg-[var(--accent)]/15"
        >
          <GreenShape size={18} />
        </span>

        <div className="relative z-[1] mt-4 flex-1">
          <h3 className="font-display text-xl font-semibold leading-snug text-white sm:text-2xl">
            {t('home.servicesCtaTitle')}
          </h3>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-white/80 sm:text-base">
            {t('home.servicesCtaLead')}
          </p>
        </div>

        <span className="relative z-[1] mt-5 inline-flex w-fit items-center justify-center rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--navy)] transition group-hover:bg-[var(--accent-hover)]">
          {t('common.contactUs')}
        </span>
      </Link>
    </motion.li>
  )
}
