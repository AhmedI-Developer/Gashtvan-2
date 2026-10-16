import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Plane,
  Users,
  Hotel,
  Briefcase,
  FileCheck,
  GraduationCap,
} from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import Modal from '@/components/ui/Modal'
import { useCompanyContent } from '@/hooks/useCompanyContent'

const icons = { Plane, Users, Hotel, Briefcase, FileCheck, GraduationCap }

export default function Services() {
  const { t } = useTranslation()
  const company = useCompanyContent()
  const [active, setActive] = useState(null)

  return (
    <section id="services" className="section-pad bg-[var(--bg)]">
      <div className="container-shell">
        <SectionHeading
          eyebrow={t('home.servicesEyebrow')}
          title={t('home.servicesTitle')}
          description={t('home.servicesLead')}
        />

        <ol className="overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow)]">
          {company.services.map((service, index) => {
            const Icon = icons[service.icon] || Plane
            return (
              <li key={service.id} className="border-b border-[var(--border)] last:border-b-0">
                <button
                  type="button"
                  onClick={() => setActive(service)}
                  className="group relative flex w-full items-start gap-4 overflow-hidden px-5 py-6 text-start transition duration-300 hover:border-[var(--accent)] sm:items-center sm:gap-6 sm:px-8"
                >
                  <span className="grain-wash pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100" />
                  <span className="relative font-display text-3xl font-bold text-[var(--accent)] sm:text-4xl">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="relative inline-flex rounded-[16px] border border-[var(--border)] bg-[var(--surface-2)] p-3 text-[var(--text)] transition group-hover:border-[var(--accent)] group-hover:text-[var(--accent-text)]">
                    <Icon size={22} strokeWidth={1.75} />
                  </span>
                  <span className="relative min-w-0 flex-1">
                    <span className="block font-display text-xl font-bold text-[var(--text)]">
                      {service.title}
                    </span>
                    <span className="mt-1 block text-[var(--text-muted)]">{service.summary}</span>
                  </span>
                  <span className="relative hidden shrink-0 text-sm font-semibold text-[var(--accent-text)] sm:inline">
                    {t('home.readMore')}
                    <span aria-hidden="true" className="ms-1 rtl:-scale-x-100">
                      →
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ol>
      </div>

      <Modal open={Boolean(active)} onClose={() => setActive(null)} title={active?.title}>
        {active ? (
          <p className="leading-relaxed text-[var(--text-muted)]">{active.body}</p>
        ) : null}
      </Modal>
    </section>
  )
}
