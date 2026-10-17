import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Seo from '@/components/layout/Seo'
import CountUp from '@/components/motion/CountUp'
import GreenShape from '@/components/brand/GreenShape'
import { useCompanyContent } from '@/hooks/useCompanyContent'
import office from '@/assets/backgroundImage/contact/office.jpg'

export default function CompanyProfile() {
  const { t } = useTranslation()
  const { profile } = useCompanyContent()
  const links = [
    { href: '/#services', label: t('nav.services'), detail: t('companyPage.linkServices') },
    { href: '/vision', label: t('nav.visionMission'), detail: t('companyPage.linkVision') },
    { href: '/#team', label: t('nav.team'), detail: t('companyPage.linkTeam') },
    { href: '/contact', label: t('nav.contact'), detail: t('companyPage.linkContact') },
  ]

  return (
    <main className="pb-16 pt-24 sm:pt-28">
      <Seo
        title={t('companyPage.title')}
        description={t('companyPage.description')}
        path="/company"
      />

      <section className="container-shell">
        <div className="relative overflow-hidden rounded-[28px] text-white">
          <img
            src={office}
            alt={t('about.images.office')}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,32,58,0.35),rgba(4,32,58,0.88))]" />
          <div className="relative z-10 max-w-3xl px-6 py-14 sm:px-10 sm:py-16">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
              {profile.eyebrow}
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-5xl">
              {profile.title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm text-white/80 sm:text-base">
              {t('home.tagline')}
            </p>
          </div>
        </div>
      </section>

      <section className="container-shell mt-10 sm:mt-14" aria-label={t('companyPage.aria')}>
        <div className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2">
              <GreenShape size={10} />
              <p className="eyebrow">{t('companyPage.storyEyebrow')}</p>
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl">
              {t('companyPage.storyTitle')}
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
              <p>{profile.paragraphs[0]}</p>
              <p>{t('companyPage.summary')}</p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {profile.stats.map((stat) => (
              <article
                key={stat.label}
                className="rounded-[22px] border border-[var(--border)] bg-[var(--surface)] px-5 py-4"
              >
                <p className="font-display text-3xl font-extrabold text-[var(--text)]">
                  <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </p>
                <p className="mt-1 text-sm text-[var(--text-muted)]">{stat.label}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-12 sm:mt-16">
          <h2 className="font-display text-2xl font-bold text-[var(--text)]">
            {t('companyPage.elsewhere')}
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {links.map((item) => {
              const className =
                'rounded-[22px] border border-[var(--border)] bg-[var(--surface)] px-5 py-4 transition hover:border-[var(--accent)]'
              const body = (
                <>
                  <p className="font-display text-lg font-bold text-[var(--text)]">{item.label}</p>
                  <p className="mt-1 text-sm text-[var(--text-muted)]">{item.detail}</p>
                </>
              )
              return item.href.includes('#') ? (
                <a key={item.href} href={item.href} className={className}>
                  {body}
                </a>
              ) : (
                <Link key={item.href} to={item.href} className={className}>
                  {body}
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
