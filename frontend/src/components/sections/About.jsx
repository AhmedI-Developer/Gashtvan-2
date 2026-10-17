import { useTranslation } from 'react-i18next'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'
import CountUp from '@/components/motion/CountUp'
import { useCompanyContent } from '@/hooks/useCompanyContent'
import erbilSkyline from '@/assets/backgroundImage/contact/erbilSkyline.jpg'

export default function About() {
  const { t } = useTranslation()
  const { profile } = useCompanyContent()

  return (
    <section id="about" className="section-pad bg-[var(--bg)]">
      <div className="container-shell">
        <div className="grid overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--surface)] lg:grid-cols-[0.92fr_1.08fr]">
          <div className="relative min-h-[280px] sm:min-h-[360px]">
            <img
              src={erbilSkyline}
              alt={t('about.images.erbil')}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,32,58,0.05),rgba(4,32,58,0.45))]" />
          </div>

          <div className="flex flex-col justify-center px-6 py-8 sm:px-8 sm:py-10 lg:px-12">
            <SectionHeading
              className="mb-4 sm:mb-5"
              eyebrow={profile.eyebrow}
              title={profile.title}
              description={profile.paragraphs[0]}
            />
            <div className="grid gap-3 sm:grid-cols-3">
              {profile.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="border-s-2 border-[var(--accent)] ps-3"
                >
                  <p className="font-display text-2xl font-extrabold text-[var(--text)] sm:text-3xl">
                    <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  </p>
                  <p className="mt-1 text-xs text-[var(--text-muted)] sm:text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button to="/company">{t('nav.companyProfile')}</Button>
              <Button to="/vision" variant="secondary">
                {t('nav.visionMission')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
