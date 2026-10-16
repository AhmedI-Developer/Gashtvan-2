import { useTranslation } from 'react-i18next'
import Logo from '@/components/brand/Logo'
import SectionHeading from '@/components/ui/SectionHeading'
import { useCompanyContent } from '@/hooks/useCompanyContent'

export default function Branches() {
  const { t } = useTranslation()
  const company = useCompanyContent()

  return (
    <section id="branches" className="section-pad bg-[var(--bg-alt)]">
      <div className="container-shell">
        <SectionHeading
          eyebrow={t('home.branchesEyebrow')}
          title={t('home.branchesTitle')}
          description={t('home.branchesLead')}
        />

        <div className="grid gap-5 md:grid-cols-2">
          <article className="flex flex-col items-start rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow)] sm:p-8">
            <Logo className="w-20 sm:w-24" title="Gashtvan" />
            <h3 className="mt-6 font-display text-2xl font-bold text-[var(--text)]">Gashtvan</h3>
            <p className="mt-1 text-sm font-semibold text-[var(--accent-text)]">
              {t('home.gashtvanBranch')}
            </p>
            <p className="mt-3 text-[var(--text-muted)]">{t('home.gashtvanBranchBody')}</p>
          </article>

          <article className="flex flex-col items-start rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow)] sm:p-8">
            <img
              src="/regayGashtvan.png"
              alt={t('home.regayBranch')}
              className="h-24 w-24 rounded-full object-cover sm:h-28 sm:w-28"
            />
            <h3 className="mt-6 font-display text-2xl font-bold text-[var(--text)]">
              {t('home.regayBranch')}
            </h3>
            <p className="mt-3 text-[var(--text-muted)]">{t('home.regayBranchBody')}</p>
          </article>
        </div>

        <ul className="mt-6 flex flex-wrap gap-2">
          {company.future.markers.map((marker) => (
            <li
              key={marker.id}
              className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--text)]"
            >
              {marker.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
