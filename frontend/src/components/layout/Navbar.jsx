import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ChevronDown, Menu, X } from 'lucide-react'
import Logo from '@/components/brand/Logo'
import ThemeToggle from '@/components/ui/ThemeToggle'
import LanguageSelector from '@/components/ui/LanguageSelector'
import { useTheme } from '@/hooks/useTheme'
import { headerControlClass } from '@/components/ui/controlStyles'
import { site } from '@/config/site'
import { cn } from '@/lib/cn'

function navLinkClass({ isActive, lightOnHero }) {
  return cn(
    'nav-link relative px-3 py-2 text-sm font-medium transition-all duration-300',
    'after:absolute after:inset-x-3 after:bottom-1 after:h-0.5 after:origin-center after:scale-x-0 after:rounded-full after:bg-[var(--accent)] after:transition-transform after:duration-300 after:ease-out',
    'hover:-translate-y-0.5 hover:after:scale-x-100',
    // Important on hero so light-theme body/link inherit cannot darken chrome over the video.
    lightOnHero
      ? '!text-white/85 hover:!text-white'
      : 'text-[var(--text-muted)] hover:text-[var(--text)]',
    isActive && 'after:scale-x-100',
    isActive && (lightOnHero ? '!text-white' : 'text-[var(--text)]'),
  )
}

function childIsActive(child, location) {
  const hashAt = child.href.indexOf('#')
  if (hashAt !== -1) {
    const path = child.href.slice(0, hashAt) || '/'
    const hash = child.href.slice(hashAt)
    return location.pathname === path && location.hash === hash
  }
  return location.pathname === child.href
}

function SubLink({ child, location, onNavigate, className }) {
  const { t } = useTranslation()
  const active = childIsActive(child, location)
  const classes = cn(
    className,
    active && 'bg-[var(--accent-soft)] text-[var(--text)]',
  )

  if (child.href.includes('#')) {
    return (
      <a href={child.href} className={classes} onClick={onNavigate}>
        {t(`nav.${child.key}`)}
      </a>
    )
  }

  return (
    <NavLink to={child.href} className={classes} onClick={onNavigate}>
      {t(`nav.${child.key}`)}
    </NavLink>
  )
}

export default function Navbar() {
  const { t } = useTranslation()
  const { isDark } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const location = useLocation()
  const onHome = location.pathname === '/'

  useEffect(() => {
    // Home: stay transparent until the hero video section fully leaves the top.
    // Other pages: tighten padding after a short scroll.
    const update = () => {
      if (!onHome) {
        setScrolled(window.scrollY > 24)
        return
      }

      const hero = document.getElementById('home')
      if (!hero) {
        setScrolled(window.scrollY > 24)
        return
      }

      setScrolled(hero.getBoundingClientRect().bottom <= 72)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [onHome])

  const [navLocationKey, setNavLocationKey] = useState(
    () => `${location.pathname}${location.search}${location.hash}`,
  )
  const locationKey = `${location.pathname}${location.search}${location.hash}`
  if (navLocationKey !== locationKey) {
    setNavLocationKey(locationKey)
    setOpen(false)
    setAboutOpen(false)
  }

  useEffect(() => {
    document.body.classList.toggle('nav-open', open)
    return () => document.body.classList.remove('nav-open')
  }, [open])

  const aboutActive = site.nav
    .find((item) => item.key === 'about')
    ?.children?.some((child) => childIsActive(child, location))
  /** Home only: transparent header + white chrome over the hero video. */
  const onHero = onHome && !scrolled && !open
  const lightOnHero = onHero
  const controlTone = lightOnHero ? 'hero-dark' : 'default'

  return (
    <header
      dir="ltr"
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
          aria-label={t('common.brandHome')}
        >
          <Logo
            className={cn(
              'w-8 shrink-0 transition-[fill,color] duration-300 sm:w-10',
              lightOnHero && '[&_path:first-of-type]:fill-white',
            )}
            title={t('common.brandName')}
          />
          <span
            className={cn(
              'font-display truncate text-base font-bold tracking-tight transition-colors duration-300 sm:text-lg',
              lightOnHero ? 'text-white' : 'text-[var(--text)]',
              'group-hover:text-[var(--accent-text)]',
              lightOnHero && 'group-hover:text-[var(--accent)]',
            )}
          >
            {t('common.brandName')}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {site.nav.filter((item) => item.key !== 'news').map((item) => {
            const label = t(`nav.${item.key}`)

            if (item.children) {
              return (
                <div
                  key={item.key}
                  className="group relative"
                  onMouseEnter={() => setAboutOpen(true)}
                  onMouseLeave={(event) => {
                    if (!event.currentTarget.contains(document.activeElement)) {
                      setAboutOpen(false)
                    }
                  }}
                  onFocus={() => setAboutOpen(true)}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                      setAboutOpen(false)
                    }
                  }}
                >
                  <button
                    type="button"
                    className={cn(
                      navLinkClass({ isActive: aboutActive, lightOnHero }),
                      // Match link size; keep hero white (do not force inherit over light-on-hero).
                      'inline-flex cursor-pointer appearance-none items-center gap-1 !text-sm !font-medium !leading-5',
                      !lightOnHero && '!text-inherit',
                    )}
                    aria-haspopup="true"
                    aria-expanded={aboutOpen}
                  >
                    {label}
                    <ChevronDown
                      size={14}
                      className={cn(
                        'transition duration-300 group-hover:rotate-180 group-focus-within:rotate-180',
                        aboutOpen && 'rotate-180',
                      )}
                    />
                  </button>
                  <div className="invisible absolute end-0 top-full z-30 pt-2 opacity-0 transition duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="min-w-52 rounded-[18px] border border-[var(--border)] bg-[var(--surface)] p-2 shadow-[var(--shadow)]">
                      {item.children.map((child) => (
                        <SubLink
                          key={child.key}
                          child={child}
                          location={location}
                          className="block rounded-[14px] px-3 py-2.5 text-sm font-medium text-[var(--text-muted)] transition duration-300 hover:bg-[var(--accent-soft)] hover:text-[var(--text)]"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )
            }

            if (item.href.startsWith('/') && !item.href.includes('#')) {
              return (
                <NavLink
                  key={item.key}
                  to={item.href}
                  className={({ isActive }) =>
                    navLinkClass({ isActive, lightOnHero })
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
                className={navLinkClass({ isActive: false, lightOnHero })}
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
            className={headerControlClass({
              tone: controlTone,
              isDark,
              className:
                'inline-flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 lg:hidden',
            })}
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
              {site.nav.filter((item) => item.key !== 'news').map((item) =>
                item.children ? (
                  <div key={item.key}>
                    <button
                      type="button"
                      className="flex w-full cursor-pointer appearance-none items-center justify-between rounded-[18px] px-4 py-3.5 !text-base !font-medium !leading-normal !text-inherit transition duration-300 hover:bg-[var(--accent-soft)]"
                      aria-expanded={aboutOpen}
                      onClick={() => setAboutOpen((value) => !value)}
                    >
                      {t(`nav.${item.key}`)}
                      <ChevronDown
                        size={16}
                        className={cn('transition duration-300', aboutOpen && 'rotate-180')}
                      />
                    </button>
                    {aboutOpen ? (
                      <div className="ms-3 flex flex-col gap-1 border-s border-[var(--accent)] ps-3">
                        {item.children.map((child) => (
                          <SubLink
                            key={child.key}
                            child={child}
                            location={location}
                            onNavigate={() => setOpen(false)}
                            className="rounded-[14px] px-3 py-3 text-sm font-medium text-[var(--text-muted)] transition duration-300 hover:bg-[var(--accent-soft)] hover:text-[var(--text)]"
                          />
                        ))}
                      </div>
                    ) : null}
                  </div>
                ) : item.href.startsWith('/') && !item.href.includes('#') ? (
                  <Link
                    key={item.key}
                    to={item.href}
                    className="rounded-[18px] px-4 py-3.5 text-base font-medium text-[var(--text)] transition duration-300 hover:translate-x-1 hover:bg-[var(--accent-soft)] hover:text-[var(--text)]"
                    onClick={() => setOpen(false)}
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                ) : (
                  <a
                    key={item.key}
                    href={item.href}
                    className="rounded-[18px] px-4 py-3.5 text-base font-medium text-[var(--text)] transition duration-300 hover:translate-x-1 hover:bg-[var(--accent-soft)] hover:text-[var(--text)]"
                    onClick={() => setOpen(false)}
                  >
                    {t(`nav.${item.key}`)}
                  </a>
                ),
              )}
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
