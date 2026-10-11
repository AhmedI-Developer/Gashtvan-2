import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import GreenShape from '@/components/brand/GreenShape'
import { company } from '@/content/company'
import { cn } from '@/lib/cn'

export default function VisionMissionValues() {
  const tabs = [
    { key: 'vision', ...company.vision },
    { key: 'mission', ...company.mission },
    {
      key: 'values',
      title: company.coreValues.title,
      body: null,
      items: company.coreValues.items,
    },
  ]
  const [active, setActive] = useState(0)
  const current = tabs[active]

  return (
    <section id="vision" className="section-pad bg-[var(--bg-alt)]">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Purpose"
          title="Vision, Mission & Core Values"
          description="The principles that guide every itinerary, briefing, and partnership."
        />

        <div className="chip-scroll mb-6 sm:mb-8" role="tablist" aria-label="Purpose tabs">
          {tabs.map((tab, i) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={cn(
                'rounded-full border px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition sm:px-5',
                i === active
                  ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--navy)]'
                  : 'border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:border-[var(--accent)]',
              )}
            >
              {tab.title}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="surface rounded-[22px] p-5 sm:rounded-[28px] sm:p-6 md:p-10"
          >
            <div className="mb-4 flex items-center gap-2">
              <GreenShape size={12} />
              <h3 className="font-display text-xl font-bold text-[var(--text)] sm:text-2xl">
                {current.title}
              </h3>
            </div>

            {current.body ? (
              <p className="max-w-3xl text-base text-[var(--text-muted)] sm:text-lg">
                {current.body}
              </p>
            ) : (
              <ul className="grid gap-3 sm:gap-4 md:grid-cols-2">
                {current.items.map((item) => (
                  <li
                    key={item.title}
                    className="rounded-[18px] border border-[var(--border)] bg-[var(--surface-2)] p-4 sm:rounded-[22px] sm:p-5"
                  >
                    <h4 className="font-display text-lg font-bold text-[var(--text)]">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-[var(--text-muted)]">{item.body}</p>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
