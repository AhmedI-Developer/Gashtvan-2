import { site } from '@/config/site'

/** Enough repeats that one half stays wider than a large desktop, so the loop has no empty gap. */
const COPIES_PER_HALF = 4

export default function TrustStrip() {
  const sequence = Array.from({ length: COPIES_PER_HALF }, () => site.trustBadges).flat()

  return (
    <section
      className="w-full overflow-hidden border-y border-[var(--border)] bg-[var(--bg-alt)] py-5"
      aria-label="Credentials"
    >
      <ul className="sr-only">
        {site.trustBadges.map((badge) => (
          <li key={badge}>{badge}</li>
        ))}
      </ul>
      <div className="marquee-track items-center" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center gap-4 pe-4">
            {sequence.map((badge, i) => (
              <span
                key={`${badge}-${copy}-${i}`}
                className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-2 text-sm font-semibold text-[var(--text)]"
              >
                <span className="me-2 inline-block h-2 w-2 rounded-full bg-[var(--accent)]" />
                {badge}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
