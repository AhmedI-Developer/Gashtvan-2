import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import SectionHeading from '@/components/ui/SectionHeading'
import Modal from '@/components/ui/Modal'
import { NewsCardSkeleton } from '@/components/ui/Skeleton'
import NewsCard from '@/components/news/NewsCard'
import NewsRegionPicker from '@/components/news/NewsRegionPicker'
import { useNews } from '@/hooks/useNews'
import { formatNewsDate } from '@/lib/news'

export default function News() {
  const {
    items,
    loading,
    error,
    regions,
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
            className="mb-5"
            align="center"
            eyebrow={t('news.eyebrow')}
            title={t('news.title')}
          />

          <NewsRegionPicker
            regions={regions}
            value={activeRegion}
            onChange={setActiveRegion}
            disabled={loading}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={loading ? `loading-${activeRegion}` : `${activeRegion}-${items.length}-${i18n.language}`}
            role="region"
            aria-label={t(`news.regions.${activeRegion}`)}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto flex max-w-5xl justify-center"
          >
            <div className="grid w-full grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => <NewsCardSkeleton key={i} />)
                : items.map((item) => (
                    <NewsCard
                      key={`${item.id}-${i18n.language}`}
                      item={item}
                      onOpen={(story) => setActiveId(story.id)}
                    />
                  ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {!loading && error ? (
          <p className="mt-6 text-center text-sm text-[var(--text-muted)]">
            {t('news.loadError')}
          </p>
        ) : null}

        {!loading && !error && !items.length ? (
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
              {active.tag ? (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="normal-case tracking-normal">{active.tag}</span>
                </>
              ) : null}
            </div>
            <p className="text-[var(--text-muted)] leading-relaxed">{active.body}</p>
            {active.url ? (
              <a
                href={active.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--navy)] transition hover:bg-[var(--accent-hover)]"
              >
                {t('news.readFull')}
              </a>
            ) : null}
          </div>
        ) : null}
      </Modal>
    </section>
  )
}
