import SectionHeading from '@/components/ui/SectionHeading'
import CountUp from '@/components/motion/CountUp'
import Reveal from '@/components/motion/Reveal'
import { company } from '@/content/company'

export default function About() {
  const { profile } = company

  return (
    <section id="about" className="section-pad bg-[var(--bg)]">
      <div className="container-shell grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="min-w-0">
          <SectionHeading
            eyebrow={profile.eyebrow}
            title={profile.title}
            description={profile.paragraphs[0]}
          />
          <div className="space-y-4 text-[0.95rem] text-[var(--text-muted)] sm:text-base">
            {profile.paragraphs.slice(1).map((p) => (
              <Reveal key={p.slice(0, 24)}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-1">
          {profile.stats.map((stat) => (
            <div
              key={stat.label}
              className="surface rounded-[20px] p-4 transition hover:border-[var(--accent)] sm:rounded-[24px] sm:p-6"
            >
              <p className="font-display text-3xl font-extrabold text-[var(--text)] sm:text-4xl">
                <CountUp
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </p>
              <p className="mt-1 text-sm text-[var(--text-muted)] sm:mt-2 sm:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
