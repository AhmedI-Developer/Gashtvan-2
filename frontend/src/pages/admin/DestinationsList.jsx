import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import StatusBadge from '@/components/admin/StatusBadge'
import { deleteAdminFare, fetchAdminFares } from '@/lib/adminApi'

function formatPrice(fare) {
  if (fare.price == null) return '—'
  return `${fare.currency || 'USD'} ${Number(fare.price).toLocaleString('en-US')}`
}

export default function AdminDestinationsList() {
  const [fares, setFares] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deletingId, setDeletingId] = useState(null)

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      setFares(await fetchAdminFares())
    } catch (err) {
      setError(err.message || 'Failed to load destinations')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const onDelete = async (fare) => {
    if (
      !window.confirm(
        `Delete fare to ${fare.destination}? This removes it from the destinations section.`,
      )
    ) {
      return
    }
    setDeletingId(fare.id)
    try {
      await deleteAdminFare(fare.id)
      setFares((list) => list.filter((item) => item.id !== fare.id))
    } catch (err) {
      setError(err.message || 'Delete failed')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-[var(--text)]">Destinations</h1>
          <p className="mt-1 text-[var(--text-muted)]">
            Flight fares that power the destinations list on the site.
          </p>
        </div>
        <Button to="/admin/destinations/new">
          <Plus size={16} />
          Add destination
        </Button>
      </div>

      {error ? (
        <p className="rounded-[16px] border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      ) : null}

      <div className="overflow-hidden rounded-[22px] border border-[var(--border)] bg-[var(--surface)]">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-[var(--border)] bg-[var(--bg-alt)] text-[var(--text-muted)]">
              <tr>
                <th className="px-4 py-3 font-semibold">Route</th>
                <th className="px-4 py-3 font-semibold">Airline</th>
                <th className="px-4 py-3 font-semibold">Price</th>
                <th className="px-4 py-3 font-semibold">Cabin</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-[var(--text-muted)]">
                    Loading destinations…
                  </td>
                </tr>
              ) : null}
              {!loading && !fares.length ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-[var(--text-muted)]">
                    No destinations yet.{' '}
                    <Link
                      to="/admin/destinations/new"
                      className="font-semibold text-[var(--accent-text)]"
                    >
                      Add the first one
                    </Link>
                  </td>
                </tr>
              ) : null}
              {fares.map((fare) => (
                <tr key={fare.id} className="border-b border-[var(--border)] last:border-0">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-[var(--text)]">
                      {fare.origin_code || 'EBL'} → {fare.destination_code || fare.destination}
                    </p>
                    <p className="text-xs text-[var(--text-muted)]">
                      {fare.origin || 'Erbil'} to {fare.destination}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-[var(--text-muted)]">{fare.airline}</td>
                  <td className="px-4 py-3 text-[var(--text)]">{formatPrice(fare)}</td>
                  <td className="px-4 py-3 capitalize text-[var(--text-muted)]">
                    {(fare.cabin || 'economy').replaceAll('_', ' ')}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge active={fare.is_active} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`/admin/destinations/${fare.id}/edit`}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text)] transition hover:border-[var(--accent)]"
                        aria-label={`Edit ${fare.destination}`}
                      >
                        <Pencil size={16} />
                      </Link>
                      <button
                        type="button"
                        onClick={() => onDelete(fare)}
                        disabled={deletingId === fare.id}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text)] transition hover:border-red-400 hover:text-red-300 disabled:opacity-50"
                        aria-label={`Delete ${fare.destination}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
