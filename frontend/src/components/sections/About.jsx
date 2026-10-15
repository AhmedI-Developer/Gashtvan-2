import { useTranslation } from 'react-i18next'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'
import CountUp from '@/components/motion/CountUp'
import Reveal from '@/components/motion/Reveal'
import { company } from '@/content/company'
import kurdistanMountain from '@/assets/backgroundImage/Kurdistan-Mountain.jpg'

export default function About() {
  const { t } = useTranslation()
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
          <Button to="/vision" variant="secondary" className="mt-6">
            {t('nav.visionMission')}
          </Button>
        </div>

        <Reveal className="relative overflow-hidden rounded-[22px] sm:rounded-[28px]">
          <img
            src={kurdistanMountain}
            alt="A mountain village in the Kurdistan highlands"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[rgba(4,32,58,0.22)]" />
          <div className="relative grid grid-cols-1 gap-3 p-4 sm:grid-cols-3 sm:gap-4 sm:p-5 lg:grid-cols-1 lg:p-6">
          {profile.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[20px] border border-white/20 bg-[rgba(4,32,58,0.55)] p-4 backdrop-blur-md transition hover:border-[var(--accent)] sm:rounded-[24px] sm:p-6"
            >
              <p className="font-display text-3xl font-extrabold text-white sm:text-4xl">
                <CountUp
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </p>
              <p className="mt-1 text-sm text-white/80 sm:mt-2 sm:text-base">
                {stat.label}
              </p>
            </div>
          ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
