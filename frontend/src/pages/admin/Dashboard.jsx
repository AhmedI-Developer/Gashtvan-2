import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPinned, Package, Plus } from 'lucide-react'
import Button from '@/components/ui/Button'
import { fetchAdminFares, fetchAdminOffers } from '@/lib/adminApi'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ offers: 0, activeOffers: 0, fares: 0, activeFares: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const [offers, fares] = await Promise.all([fetchAdminOffers(), fetchAdminFares()])
        if (!alive) return
        setStats({
          offers: offers.length,
          activeOffers: offers.filter((o) => o.is_active).length,
          fares: fares.length,
          activeFares: fares.filter((f) => f.is_active).length,
        })
      } catch (err) {
        if (alive) setError(err.message || 'Failed to load dashboard')
      } finally {
        if (alive) setLoading(false)
      }
    })()
    return () => {
      alive = false
    }
  }, [])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-[var(--text)]">Dashboard</h1>
        <p className="mt-1 text-[var(--text-muted)]">
          Add, edit, or remove offers and destination fares.
        </p>
      </div>

      {error ? (
        <p className="rounded-[16px] border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Offers', value: stats.offers, hint: `${stats.activeOffers} active` },
          { label: 'Destinations', value: stats.fares, hint: `${stats.activeFares} active` },
        ].map((card) => (
          <article
            key={card.label}
            className="rounded-[22px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow)]"
          >
            <p className="text-sm text-[var(--text-muted)]">{card.label}</p>
            <p className="mt-2 font-display text-3xl font-bold text-[var(--text)]">
              {loading ? '—' : card.value}
            </p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">{loading ? '…' : card.hint}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <section className="rounded-[22px] border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-flex rounded-[14px] bg-[var(--accent-soft)] p-2 text-[var(--accent-text)]">
              <Package size={20} />
            </span>
            <div>
              <h2 className="font-display text-xl font-bold">Offers</h2>
              <p className="text-sm text-[var(--text-muted)]">Packages, hotels, visas, tours</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button to="/admin/offers/new">
              <Plus size={16} />
              Add offer
            </Button>
            <Button to="/admin/offers" variant="secondary">
              Manage offers
            </Button>
          </div>
        </section>

        <section className="rounded-[22px] border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-flex rounded-[14px] bg-[var(--accent-soft)] p-2 text-[var(--accent-text)]">
              <MapPinned size={20} />
            </span>
            <div>
              <h2 className="font-display text-xl font-bold">Destinations</h2>
              <p className="text-sm text-[var(--text-muted)]">Flight fares shown on the site</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button to="/admin/destinations/new">
              <Plus size={16} />
              Add destination
            </Button>
            <Button to="/admin/destinations" variant="secondary">
              Manage destinations
            </Button>
          </div>
        </section>
      </div>

      <p className="text-sm text-[var(--text-muted)]">
        Public site:{' '}
        <Link to="/" className="font-semibold text-[var(--accent-text)] hover:underline">
          open homepage
        </Link>
      </p>
    </div>
  )
}
