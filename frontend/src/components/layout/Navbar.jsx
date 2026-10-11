import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Logo from '@/components/brand/Logo'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { site } from '@/config/site'
import { cn } from '@/lib/cn'

export default function Navbar() {
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

  const overHero = onHome && !scrolled && !open

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled || !onHome || open
          ? 'border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--bg)_88%,transparent)] backdrop-blur-xl'
          : 'bg-transparent',
        scrolled || open ? 'py-2' : 'py-3 sm:py-4',
      )}
    >
      <div className="container-shell flex items-center justify-between gap-2 sm:gap-4">
        <Link
          to="/"
          className="flex min-w-0 items-center gap-2 sm:gap-3"
          aria-label="Gashtvan home"
        >
          <Logo
            className={cn(
              'w-8 shrink-0 sm:w-10',
              overHero && '[&_path:first-of-type]:fill-white',
            )}
          />
          <span
            className={cn(
              'font-display truncate text-base font-bold tracking-tight transition-colors sm:text-lg',
              overHero ? 'text-white' : 'text-[var(--text)]',
            )}
          >
            Gashtvan
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {site.nav.map((item) => {
            const className = ({ isActive }) =>
              cn(
                'relative px-3 py-2 text-sm font-medium transition-colors after:absolute after:inset-x-3 after:bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-[var(--accent)] after:transition-transform',
                overHero
                  ? 'text-white/90 hover:text-white'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)]',
                isActive && 'after:scale-x-100',
              )

            if (item.href.startsWith('/offers')) {
              return (
                <NavLink key={item.label} to="/offers" className={className}>
                  {item.label}
                </NavLink>
              )
            }

            return (
              <a
                key={item.label}
                href={item.href}
                className={className({ isActive: false })}
              >
                {item.label}
              </a>
            )
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
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
                  key={item.label}
                  href={item.href.startsWith('/offers') ? '/offers' : item.href}
                  className="rounded-[18px] px-4 py-3.5 text-base font-medium text-[var(--text)] transition active:bg-[var(--accent-soft)]"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
