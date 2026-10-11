import SectionHeading from '@/components/ui/SectionHeading'
import Reveal from '@/components/motion/Reveal'
import GreenShape from '@/components/brand/GreenShape'
import { company } from '@/content/company'

export default function WhyGashtvan() {
  return (
    <section id="why" className="section-pad bg-[var(--bg-alt)]">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Why Gashtvan"
          title="Three reasons travelers stay with us"
        />
        <div className="grid gap-4 sm:gap-5 lg:grid-cols-3">
          {company.why.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <article className="h-full rounded-[22px] border border-[var(--border)] bg-[var(--surface)] p-5 sm:rounded-[26px] sm:p-6 md:p-8">
                <div className="mb-4 flex items-center gap-2">
                  <GreenShape size={12} />
                  <span className="font-display text-sm font-bold text-[var(--accent-text)]">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-[var(--text)] sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-[0.95rem] text-[var(--text-muted)] sm:text-base">
                  {item.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
