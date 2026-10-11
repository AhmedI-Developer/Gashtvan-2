import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import MagneticButton from '@/components/ui/MagneticButton'
import GreenShape from '@/components/brand/GreenShape'
import { site } from '@/config/site'

const HERO_IMG =
  'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2000&q=80'

export default function Hero() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.35])

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden text-white"
      aria-label="Hero"
    >
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="Aircraft wing above clouds at sunset"
          width={2000}
          height={1333}
          fetchPriority="high"
          className="h-full w-full object-cover object-[center_30%]"
        />
      </motion.div>
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(4,32,58,0.55) 0%, rgba(4,32,58,0.72) 45%, rgba(4,32,58,0.92) 100%)',
        }}
      />

      <motion.div
        style={{ opacity }}
        className="relative z-10 flex min-h-[100svh] flex-col justify-end pb-10 pt-24 sm:pb-16 sm:pt-28 md:pb-24"
      >
        <div className="container-shell grid gap-6 sm:gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-10">
          <div className="min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-3 inline-flex max-w-full items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs backdrop-blur sm:mb-4 sm:text-sm"
            >
              <GreenShape size={8} />
              <span className="truncate">Erbil · Kurdistan Region</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display max-w-3xl text-balance text-[1.85rem] font-extrabold leading-[1.08] tracking-tight text-white xs:text-3xl sm:text-4xl md:text-6xl lg:text-7xl"
            >
              {site.tagline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-white/80 sm:mt-5 sm:text-lg"
            >
              Premium travel & tourism from Erbil — air ticketing, MICE, corporate
              programs, and curated journeys with IATA-grade care.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap"
            >
              <MagneticButton to="/offers" className="w-full sm:w-auto">
                {t('common.viewOffers')}
              </MagneticButton>
              <MagneticButton
                href="/#contact"
                variant="ghost"
                as="a"
                className="w-full sm:w-auto"
              >
                {t('common.contactUs')}
              </MagneticButton>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {site.heroStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.08 }}
                className="glass-hero min-w-0 rounded-[18px] p-3 text-white sm:rounded-[22px] sm:p-4"
              >
                <p className="font-display text-sm font-bold leading-snug sm:text-xl md:text-2xl">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <svg
          className="pointer-events-none absolute inset-x-0 bottom-[32%] hidden h-40 w-full opacity-80 md:block"
          viewBox="0 0 1200 160"
          aria-hidden="true"
        >
          <motion.path
            d="M80,120 C280,20 420,150 620,70 C820,-10 980,110 1140,40"
            fill="none"
            stroke="rgba(160,194,58,0.85)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="3 10"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.4, delay: 0.5, ease: 'easeInOut' }}
          />
        </svg>
      </motion.div>
    </section>
  )
}
