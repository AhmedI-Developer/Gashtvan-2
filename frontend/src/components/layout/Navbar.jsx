import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Menu, X } from 'lucide-react'
import Logo from '@/components/brand/Logo'
import ThemeToggle from '@/components/ui/ThemeToggle'
import LanguageSelector from '@/components/ui/LanguageSelector'
import { site } from '@/config/site'
import { cn } from '@/lib/cn'

function navLinkClass({ isActive, onHero }) {
  return cn(
    'nav-link relative px-3 py-2 text-sm font-medium transition-all duration-300',
    'after:absolute after:inset-x-3 after:bottom-1 after:h-0.5 after:origin-center after:scale-x-0 after:rounded-full after:bg-[var(--accent)] after:transition-transform after:duration-300 after:ease-out',
    'hover:-translate-y-0.5 hover:after:scale-x-100',
    onHero
      ? 'text-white/85 hover:text-white'
      : 'text-[var(--text-muted)] hover:text-[var(--text)]',
    isActive && 'after:scale-x-100',
    isActive && (onHero ? 'text-white' : 'text-[var(--text)]'),
  )
}

export default function Navbar() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const onHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location])

  useEffect(() => {
    document.body.classList.toggle('nav-open', open)
    return () => document.body.classList.remove('nav-open')
  }, [open])

  /** Transparent header on home hero; frosted themed bar after scroll / other pages */
  const onHero = onHome && !scrolled && !open
  const controlTone = onHero ? 'hero-dark' : 'default'

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        onHero
          ? 'bg-transparent'
          : 'border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--bg)_88%,transparent)] backdrop-blur-xl',
        scrolled || open ? 'py-2' : 'py-3 sm:py-4',
      )}
    >
      <div className="container-shell flex items-center justify-between gap-2 sm:gap-4">
        <Link
          to="/"
          className="group flex min-w-0 items-center gap-2 transition-transform duration-300 hover:-translate-y-0.5 sm:gap-3"
          aria-label="Gashtvan home"
        >
          <Logo
            className={cn(
              'w-8 shrink-0 transition-[filter] duration-300 sm:w-10',
              onHero && '[&_path:first-of-type]:fill-white',
            )}
          />
          <span
            className={cn(
              'font-display truncate text-base font-bold tracking-tight transition-colors duration-300 sm:text-lg',
              onHero ? 'text-white' : 'text-[var(--text)]',
              'group-hover:text-[var(--accent-text)]',
              onHero && 'group-hover:text-[var(--accent)]',
            )}
          >
            Gashtvan
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {site.nav.map((item) => {
            const label = t(`nav.${item.key}`)

            if (item.href.startsWith('/offers')) {
              return (
                <NavLink
                  key={item.key}
                  to="/offers"
                  className={({ isActive }) =>
                    navLinkClass({ isActive, onHero })
                  }
                >
                  {label}
                </NavLink>
              )
            }

            return (
              <a
                key={item.key}
                href={item.href}
                className={navLinkClass({ isActive: false, onHero })}
              >
                {label}
              </a>
            )
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <LanguageSelector tone={controlTone} />
          <ThemeToggle tone={controlTone} />
          <button
            type="button"
            className={cn(
              'inline-flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 lg:hidden',
              onHero
                ? 'border-white/35 bg-white/12 text-white hover:border-[var(--accent)]'
                : 'border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:border-[var(--accent)]',
            )}
            aria-label={open ? t('common.closeMenu') : t('common.openMenu')}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-[var(--border)] bg-[var(--bg)] lg:hidden"
            aria-label="Mobile"
          >
            <div className="container-shell flex flex-col gap-1 py-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
              {site.nav.map((item) => (
                <a
                  key={item.key}
                  href={item.href.startsWith('/offers') ? '/offers' : item.href}
                  className="rounded-[18px] px-4 py-3.5 text-base font-medium text-[var(--text)] transition duration-300 hover:translate-x-1 hover:bg-[var(--accent-soft)] hover:text-[var(--text)]"
                  onClick={() => setOpen(false)}
                >
                  {t(`nav.${item.key}`)}
                </a>
              ))}
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
