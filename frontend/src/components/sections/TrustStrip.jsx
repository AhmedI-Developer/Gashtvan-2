import { site } from '@/config/site'

export default function TrustStrip() {
  const items = [...site.trustBadges, ...site.trustBadges]

  return (
    <section
      className="overflow-hidden border-y border-[var(--border)] bg-[var(--bg-alt)] py-5"
      aria-label="Credentials"
    >
      <div className="marquee-track gap-4 px-4">
        {items.map((badge, i) => (
          <span
            key={`${badge}-${i}`}
            className="inline-flex shrink-0 items-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-2 text-sm font-semibold text-[var(--text)]"
          >
            <span className="me-2 inline-block h-2 w-2 rounded-full bg-[var(--accent)]" />
            {badge}
          </span>
        ))}
      </div>
    </section>
  )
}
