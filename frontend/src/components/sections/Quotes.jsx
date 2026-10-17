import { useTranslation } from 'react-i18next'
import GreenShape from '@/components/brand/GreenShape'
import Reveal from '@/components/motion/Reveal'

export default function Quotes() {
  const { t } = useTranslation()
  const quotes = t('home.quotes', { returnObjects: true })
  const list = Array.isArray(quotes) ? quotes : []

  if (!list.length) return null

  return (
    <section
      className="section-pad bg-[var(--bg-alt)]"
      aria-label={t('home.quotesEyebrow')}
    >
      <div className="container-shell">
        <Reveal className="mb-8 text-center sm:mb-10">
          <div className="inline-flex items-center justify-center gap-2">
            <GreenShape size={12} />
            <p className="eyebrow">{t('home.quotesEyebrow')}</p>
          </div>
        </Reveal>

        <div className="mx-auto grid max-w-5xl gap-5 sm:gap-6 md:grid-cols-3">
          {list.map((quote, index) => (
            <Reveal key={quote} delay={index * 0.08}>
              <blockquote className="flex h-full flex-col rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-5 text-center shadow-[var(--shadow)] sm:p-6">
                <span
                  className="mx-auto mb-3 font-display text-4xl leading-none text-[var(--accent)]"
                  aria-hidden="true"
                >
                  “
                </span>
                <p className="font-display text-base font-semibold leading-relaxed text-[var(--text)] sm:text-lg">
                  {quote}
                </p>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
