import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Logo from '@/components/brand/Logo'
import { site } from '@/config/site'

function SocialIcon({ children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
      fill="currentColor"
      className="shrink-0"
    >
      {children}
    </svg>
  )
}

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-[var(--footer-bg)] text-white">
      <div className="container-shell grid gap-8 py-10 pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:gap-10 sm:py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Logo className="w-11 shrink-0 [&_path:first-of-type]:fill-white" />
            <strong className="font-display text-xl">Gashtvan</strong>
          </div>
          <p className="max-w-xs text-white/75">{site.tagline}</p>
        </div>

        <div>
          <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-wider text-[var(--accent)]">
            {t('common.quickLinks')}
          </h3>
          <ul className="space-y-2 text-white/80">
            {site.nav.map((item) => (
              <li key={item.key}>
                {item.children ? (
                  <div>
                    <span className="font-medium text-white">{t(`nav.${item.key}`)}</span>
                    <ul className="mt-2 space-y-2 border-s border-[var(--accent)] ps-3">
                      {item.children.map((child) => (
                        <li key={child.key}>
                          {child.href.includes('#') ? (
                            <a
                              href={child.href}
                              className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-[var(--accent)]"
                            >
                              {t(`nav.${child.key}`)}
                            </a>
                          ) : (
                            <Link
                              to={child.href}
                              className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-[var(--accent)]"
                            >
                              {t(`nav.${child.key}`)}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <a
                    href={item.href}
                    className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-[var(--accent)]"
                  >
                    {t(`nav.${item.key}`)}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-wider text-[var(--accent)]">
            {t('nav.contact')}
          </h3>
          <ul className="space-y-2 text-sm text-white/80">
            {site.phones.map((p) => (
              <li key={p}>
                <a href={`tel:${p.replace(/\s/g, '')}`} className="hover:text-[var(--accent)]">
                  {p}
                </a>
              </li>
            ))}
            {site.emails.map((e) => (
              <li key={e}>
                <a href={`mailto:${e}`} className="hover:text-[var(--accent)]">
                  {e}
                </a>
              </li>
            ))}
            <li>{site.address}</li>
            <li>{site.hours}</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-wider text-[var(--accent)]">
            {t('common.social')}
          </h3>
          <div className="flex flex-col gap-3">
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-[18px] border border-white/20 px-3 py-2.5 text-sm font-medium text-white/90 transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <SocialIcon>
                <path d="M14 8h3V5h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" />
              </SocialIcon>
              {t('common.facebook')}
            </a>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-[18px] border border-white/20 px-3 py-2.5 text-sm font-medium text-white/90 transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <SocialIcon>
                <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 4.5A4.5 4.5 0 1 0 16.5 12 4.5 4.5 0 0 0 12 7.5zm5.75-.9a1.1 1.1 0 1 0 1.1 1.1 1.1 1.1 0 0 0-1.1-1.1zM12 9.5A2.5 2.5 0 1 1 9.5 12 2.5 2.5 0 0 1 12 9.5z" />
              </SocialIcon>
              {t('common.instagram')}
            </a>
          </div>
          <p className="mt-6 text-sm text-white/55">
            <Link to="/offers" className="hover:text-[var(--accent)]">
              {t('common.viewCurrentOffers')}
            </Link>
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-shell flex flex-wrap items-center justify-between gap-3 py-5 text-sm text-white/55">
          <span>
            © 2026 {site.legalName}. {t('common.rights')}
          </span>
          <span>{site.region}</span>
        </div>
      </div>
    </footer>
  )
}
