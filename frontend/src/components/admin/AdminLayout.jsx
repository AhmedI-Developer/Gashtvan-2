import { NavLink, Outlet, Navigate, useNavigate } from 'react-router-dom'
import { LayoutDashboard, MapPinned, Package, LogOut, Menu, X, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import Logo from '@/components/brand/Logo'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/cn'

const links = [
  { to: '/admin', end: true, label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/offers', label: 'Offers', icon: Package },
  { to: '/admin/destinations', label: 'Destinations', icon: MapPinned },
]

export default function AdminLayout() {
  const { user, booting, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  if (booting) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-[var(--bg)] text-[var(--text-muted)]">
        Checking session…
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  const onLogout = async () => {
    await logout()
    navigate('/admin/login', { replace: true })
  }

  const nav = (
    <nav className="flex flex-col gap-1 p-3">
      {links.map(({ to, end, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          onClick={() => setOpen(false)}
          className={({ isActive }) =>
            cn(
              'inline-flex items-center gap-3 rounded-[16px] px-3 py-2.5 text-sm font-medium transition',
              isActive
                ? 'bg-[var(--accent)] text-[var(--navy)]'
                : 'text-[var(--text-muted)] hover:bg-[var(--accent-soft)] hover:text-[var(--text)]',
            )
          }
        >
          <Icon size={18} />
          {label}
        </NavLink>
      ))}
    </nav>
  )

  return (
    <div lang="en" dir="ltr" className="min-h-svh bg-[var(--bg)] text-[var(--text)]">
      <div className="mx-auto flex min-h-svh max-w-[1400px]">
        <aside className="sticky top-0 hidden h-svh w-64 shrink-0 flex-col border-e border-[var(--border)] bg-[var(--bg-alt)] lg:flex">
          <div className="flex items-center gap-3 border-b border-[var(--border)] px-4 py-5">
            <Logo className="w-9" />
            <div>
              <p className="font-display text-sm font-bold">Gashtvan Admin</p>
              <p className="text-xs text-[var(--text-muted)]">{user?.email}</p>
            </div>
          </div>
          {nav}
          <div className="mt-auto space-y-1 border-t border-[var(--border)] p-3">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center gap-3 rounded-[16px] px-3 py-2.5 text-sm font-medium text-[var(--text-muted)] transition hover:bg-[var(--accent-soft)] hover:text-[var(--text)]"
            >
              <ExternalLink size={18} />
              View site
            </a>
            <button
              type="button"
              onClick={onLogout}
              className="inline-flex w-full items-center gap-3 rounded-[16px] px-3 py-2.5 text-sm font-medium text-[var(--text-muted)] transition hover:bg-[var(--accent-soft)] hover:text-[var(--text)]"
            >
              <LogOut size={18} />
              Log out
            </button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--bg)_90%,transparent)] px-4 py-3 backdrop-blur-xl lg:px-8">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] lg:hidden"
                aria-label={open ? 'Close menu' : 'Open menu'}
                onClick={() => setOpen((v) => !v)}
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
              <div>
                <p className="font-display text-sm font-bold lg:hidden">Gashtvan Admin</p>
                <p className="hidden text-sm text-[var(--text-muted)] sm:block lg:text-base">
                  Manage offers and destinations
                </p>
              </div>
            </div>
            <p className="truncate text-sm text-[var(--text-muted)]">{user?.name}</p>
          </header>

          {open ? (
            <div className="border-b border-[var(--border)] bg-[var(--bg-alt)] lg:hidden">
              {nav}
              <div className="space-y-1 border-t border-[var(--border)] p-3">
                <button
                  type="button"
                  onClick={onLogout}
                  className="inline-flex w-full items-center gap-3 rounded-[16px] px-3 py-2.5 text-sm font-medium text-[var(--text-muted)]"
                >
                  <LogOut size={18} />
                  Log out
                </button>
              </div>
            </div>
          ) : null}

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
