import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
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
  } = useNews()
  const [active, setActive] = useState(null)

  return (
    <section id="news" className="border-b border-[var(--border)] bg-[var(--bg)] py-10 sm:py-12">
      <div className="container-shell">
        <div className="mb-5 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            className="mb-0"
            eyebrow="News"
            title="Latest from our regions"
            description="Kurdistan first, then Middle East, then Europe."
          />

          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="News regions"
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
                    'rounded-full border px-3 py-1.5 text-xs font-semibold transition duration-300 sm:text-sm',
                    selected
                      ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--navy)]'
                      : unlocked
                        ? 'border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:border-[var(--accent)]'
                        : 'cursor-not-allowed border-[var(--border)] bg-[var(--surface-2)] text-[var(--text-muted)] opacity-55',
                  )}
                >
                  {region}
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
            key={loading ? `loading-${activeRegion}` : activeRegion}
            role="tabpanel"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="-mx-2 flex gap-3 overflow-x-auto px-2 pb-1 sm:mx-0 sm:grid sm:grid-cols-4 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 [scrollbar-width:thin]"
          >
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    className="h-[210px] w-[min(200px,68vw)] shrink-0 sm:h-[230px] sm:w-auto"
                  />
                ))
              : items.map((item) => (
                  <div
                    key={item.id}
                    className="w-[min(200px,68vw)] shrink-0 snap-start sm:w-auto"
                  >
                    <NewsCard item={item} onOpen={setActive} />
                  </div>
                ))}
          </motion.div>
        </AnimatePresence>

        {!loading && !items.length ? (
          <p className="mt-4 text-sm text-[var(--text-muted)]">
            No news in this region yet.
          </p>
        ) : null}
      </div>

      <Modal
        open={Boolean(active)}
        onClose={() => setActive(null)}
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
              <span>{active.region}</span>
              <span aria-hidden="true">·</span>
              <span>{formatNewsDate(active.date)}</span>
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
