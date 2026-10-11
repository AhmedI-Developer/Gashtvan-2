import { Link } from 'react-router-dom'
import Logo from '@/components/brand/Logo'
import { site } from '@/config/site'

function SocialIcon({ label, children }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
      <title>{label}</title>
      {children}
    </svg>
  )
}

export default function Footer() {
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
            Quick links
          </h3>
          <ul className="space-y-2 text-white/80">
            {site.nav.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="transition hover:text-[var(--accent)]">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-wider text-[var(--accent)]">
            Contact
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
            Social
          </h3>
          <div className="flex gap-3">
            <a
              href={site.social.facebook}
              aria-label="Facebook"
              className="rounded-full border border-white/20 p-2 transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <SocialIcon label="Facebook">
                <path d="M14 8h3V5h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" />
              </SocialIcon>
            </a>
            <a
              href={site.social.instagram}
              aria-label="Instagram"
              className="rounded-full border border-white/20 p-2 transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <SocialIcon label="Instagram">
                <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 4.5A4.5 4.5 0 1 0 16.5 12 4.5 4.5 0 0 0 12 7.5zm5.75-.9a1.1 1.1 0 1 0 1.1 1.1 1.1 1.1 0 0 0-1.1-1.1zM12 9.5A2.5 2.5 0 1 1 9.5 12 2.5 2.5 0 0 1 12 9.5z" />
              </SocialIcon>
            </a>
            <a
              href={site.social.linkedin}
              aria-label="LinkedIn"
              className="rounded-full border border-white/20 p-2 transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <SocialIcon label="LinkedIn">
                <path d="M6.5 9H4v11h2.5zm-1.25-5.5A1.75 1.75 0 1 0 7 5.25 1.75 1.75 0 0 0 5.25 3.5zM20 13.3c0-2.7-1.5-4.3-3.8-4.3a3.3 3.3 0 0 0-3 1.6V9H11v11h2.5v-5.7c0-1.5.7-2.5 2.1-2.5s2 1.1 2 2.6V20H20z" />
              </SocialIcon>
            </a>
          </div>
          <p className="mt-6 text-sm text-white/55">
            <Link to="/offers" className="hover:text-[var(--accent)]">
              View current offers
            </Link>
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-shell flex flex-wrap items-center justify-between gap-3 py-5 text-sm text-white/55">
          <span>© 2026 {site.legalName}. All rights reserved.</span>
          <span>Erbil · Kurdistan Region · Iraq</span>
        </div>
      </div>
    </footer>
  )
}
