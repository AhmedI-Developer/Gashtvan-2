import { useTranslation } from 'react-i18next'
import Logo from '@/components/brand/Logo'
import GreenShape from '@/components/brand/GreenShape'

const branches = [
  {
    id: 'gashtvan',
    nameKey: null,
    nameFallback: 'Gashtvan',
    kind: 'logo',
  },
  {
    id: 'regay',
    nameKey: 'home.regayBranch',
    kind: 'image',
    src: '/regayGashtvan.png',
  },
]

export default function Branches() {
  const { t } = useTranslation()

  return (
    <section id="branches" className="section-pad bg-[var(--bg-alt)]">
      <div className="container-shell">
        <div className="mb-10 flex flex-col items-center text-center sm:mb-12">
          <div className="inline-flex items-center gap-3">
            <GreenShape size={14} />
            <h2
              className="font-display font-bold tracking-tight text-[var(--text)]"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)' }}
            >
              {t('home.branchesEyebrow')}
            </h2>
          </div>
        </div>

        <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2 sm:gap-6">
          {branches.map((branch) => {
            const name = branch.nameKey
              ? t(branch.nameKey)
              : branch.nameFallback
            return (
              <article
                key={branch.id}
                className="branch-card group relative flex flex-col items-center justify-center overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--surface)] px-6 py-10 text-center shadow-[var(--shadow)] transition duration-300 hover:-translate-y-1 hover:border-[var(--accent)] sm:px-8 sm:py-12"
              >
                <span className="branch-card-pixels" aria-hidden="true" />
                <div className="relative z-10 flex flex-col items-center">
                  {branch.kind === 'logo' ? (
                    <Logo className="mx-auto w-24 sm:w-28" title={name} />
                  ) : (
                    <img
                      src={branch.src}
                      alt={name}
                      className="mx-auto h-24 w-24 rounded-full object-cover ring-2 ring-[var(--border)] transition group-hover:ring-[var(--accent)] sm:h-28 sm:w-28"
                    />
                  )}
                  <h3 className="mt-6 font-display text-2xl font-bold text-[var(--text)] sm:text-3xl">
                    {name}
                  </h3>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
