import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import SectionHeading from '@/components/ui/SectionHeading'
import Modal from '@/components/ui/Modal'
import Skeleton from '@/components/ui/Skeleton'
import NewsCard from '@/components/news/NewsCard'
import { useNews } from '@/hooks/useNews'
import { formatNewsDate } from '@/lib/news'
import { cn } from '@/lib/cn'

export default function News() {
  const {
    items,
    loading,
    regions,
    unlockedRegions,
    activeRegion,
    setActiveRegion,
    articles,
  } = useNews()
  const { t, i18n } = useTranslation()
  const [activeId, setActiveId] = useState(null)
  const active = articles.find((item) => item.id === activeId) || null

  return (
    <section id="news" className="border-b border-[var(--border)] bg-[var(--bg)] py-10 sm:py-14">
      <div className="container-shell">
        <div className="mx-auto mb-6 flex max-w-3xl flex-col items-center text-center sm:mb-8">
          <SectionHeading
            className="mb-4"
            align="center"
            eyebrow={t('news.eyebrow')}
            title={t('news.title')}
          />

          <div
            className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] p-1.5 shadow-[var(--shadow)]"
            role="tablist"
            aria-label={t('news.regionsLabel')}
          >
            {regions.map((region) => {
              const unlocked = unlockedRegions.includes(region)
              const selected = activeRegion === region
              return (
                <button
                  key={region}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  disabled={!unlocked}
                  onClick={() => unlocked && setActiveRegion(region)}
                  className={cn(
                    'rounded-full px-3.5 py-1.5 text-xs font-semibold transition duration-300 sm:px-4 sm:text-sm',
                    selected
                      ? 'bg-[var(--accent)] text-[var(--navy)] shadow-sm'
                      : unlocked
                        ? 'text-[var(--text-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]'
                        : 'cursor-not-allowed text-[var(--text-muted)] opacity-45',
                  )}
                >
                  {t(`news.regions.${region}`)}
                  {!unlocked ? (
                    <span className="ms-1 text-xs font-medium opacity-80">…</span>
                  ) : null}
                </button>
              )
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={loading ? `loading-${activeRegion}` : `${activeRegion}-${i18n.language}`}
            role="tabpanel"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto flex max-w-5xl justify-center"
          >
            <div className="grid w-full grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="aspect-[3/4] w-full rounded-[22px]" />
                  ))
                : items.map((item) => (
                    <NewsCard
                      key={item.id}
                      item={item}
                      onOpen={(story) => setActiveId(story.id)}
                    />
                  ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {!loading && !items.length ? (
          <p className="mt-6 text-center text-sm text-[var(--text-muted)]">
            {t('news.empty')}
          </p>
        ) : null}
      </div>

      <Modal
        open={Boolean(active)}
        onClose={() => setActiveId(null)}
        title={active?.title}
      >
        {active ? (
          <div className="space-y-4">
            <div className="overflow-hidden rounded-[18px]">
              <img
                src={active.coverImage}
                alt=""
                className="aspect-[16/9] w-full object-cover"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--accent-text)]">
              <span>{t(`news.regions.${active.region}`)}</span>
              <span aria-hidden="true">·</span>
              <span>{formatNewsDate(active.date, i18n.language)}</span>
              <span aria-hidden="true">·</span>
              <span>{active.tag}</span>
            </div>
            <p className="text-[var(--text-muted)] leading-relaxed">
              {active.body}
            </p>
          </div>
        ) : null}
      </Modal>
    </section>
  )
}
