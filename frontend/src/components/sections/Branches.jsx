import { useTranslation } from 'react-i18next'
import Logo from '@/components/brand/Logo'
import GreenShape from '@/components/brand/GreenShape'
import PlaneIcon from '@/components/layout/preloaders/PlaneIcon'

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
    <section
      id="branches"
      className="branch-section relative overflow-hidden section-pad bg-[var(--bg-alt)]"
    >
      <div className="branch-section-sky" aria-hidden="true">
        <span className="branch-bg-plane branch-bg-plane--a">
          <PlaneIcon size={52} />
        </span>
        <span className="branch-bg-plane branch-bg-plane--b">
          <PlaneIcon size={36} />
        </span>
      </div>

      <div className="container-shell relative z-10">
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
                className="group relative flex flex-col items-center rounded-[28px] border border-[var(--border)] bg-[var(--surface)] px-6 py-10 text-center shadow-[var(--shadow)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-[0_0_0_1px_var(--accent),0_12px_36px_rgba(160,194,58,0.28)] sm:px-8 sm:py-12"
              >
                <div className="relative z-10 flex w-full flex-col items-center">
                  <div className="flex h-28 w-full items-center justify-center sm:h-32">
                    {branch.kind === 'logo' ? (
                      <Logo
                        className="mx-auto !h-20 !w-auto sm:!h-24"
                        title={name}
                      />
                    ) : (
                      <img
                        src={branch.src}
                        alt={name}
                        className="mx-auto h-20 w-20 rounded-full object-cover ring-2 ring-[var(--border)] transition group-hover:ring-[var(--accent)] sm:h-24 sm:w-24"
                      />
                    )}
                  </div>
                  <h3 className="mt-5 flex min-h-[2.5rem] items-center justify-center font-display text-2xl font-bold leading-tight text-[var(--text)] sm:min-h-[3rem] sm:text-3xl">
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
