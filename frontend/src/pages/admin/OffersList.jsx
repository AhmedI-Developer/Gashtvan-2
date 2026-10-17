import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import StatusBadge from '@/components/admin/StatusBadge'
import { deleteAdminOffer, fetchAdminOffers } from '@/lib/adminApi'

function formatPrice(offer) {
  if (offer.price == null) return 'Contact'
  return `${offer.currency || 'USD'} ${Number(offer.price).toLocaleString('en-US')}`
}

export default function AdminOffersList() {
  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deletingId, setDeletingId] = useState(null)

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      setOffers(await fetchAdminOffers())
    } catch (err) {
      setError(err.message || 'Failed to load offers')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void (async () => {
      await Promise.resolve()
      await load()
    })()
  }, [])

  const onDelete = async (offer) => {
    if (!window.confirm(`Delete “${offer.title}”? This cannot be undone.`)) return
    setDeletingId(offer.id)
    try {
      await deleteAdminOffer(offer.id)
      setOffers((list) => list.filter((item) => item.id !== offer.id))
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
          <h1 className="font-display text-3xl font-bold text-[var(--text)]">Offers</h1>
          <p className="mt-1 text-[var(--text-muted)]">Create, edit, or remove travel offers.</p>
        </div>
        <Button to="/admin/offers/new">
          <Plus size={16} />
          Add offer
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
                <th className="px-4 py-3 font-semibold">Offer</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Price</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-[var(--text-muted)]">
                    Loading offers…
                  </td>
                </tr>
              ) : null}
              {!loading && !offers.length ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-[var(--text-muted)]">
                    No offers yet.{' '}
                    <Link to="/admin/offers/new" className="font-semibold text-[var(--accent-text)]">
                      Add the first one
                    </Link>
                  </td>
                </tr>
              ) : null}
              {offers.map((offer) => (
                <tr key={offer.id} className="border-b border-[var(--border)] last:border-0">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {offer.image_url ? (
                        <img
                          src={offer.image_url}
                          alt=""
                          className="size-12 rounded-[12px] object-cover"
                        />
                      ) : (
                        <div className="size-12 rounded-[12px] bg-[var(--surface-2)]" />
                      )}
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-[var(--text)]">{offer.title}</p>
                        <p className="truncate text-xs text-[var(--text-muted)]">
                          {offer.destination || '—'} · /{offer.slug}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[var(--text-muted)]">
                    {(offer.category_labels || []).join(' · ') ||
                      offer.category_label ||
                      offer.category ||
                      '—'}
                  </td>
                  <td className="px-4 py-3 text-[var(--text)]">{formatPrice(offer)}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <StatusBadge active={offer.is_active} />
                      {offer.is_featured ? (
                        <span className="rounded-full bg-[var(--accent)] px-2.5 py-1 text-xs font-semibold text-[var(--navy)]">
                          Featured
                        </span>
                      ) : null}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`/admin/offers/${offer.id}/edit`}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text)] transition hover:border-[var(--accent)]"
                        aria-label={`Edit ${offer.title}`}
                      >
                        <Pencil size={16} />
                      </Link>
                      <button
                        type="button"
                        onClick={() => onDelete(offer)}
                        disabled={deletingId === offer.id}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text)] transition hover:border-red-400 hover:text-red-300 disabled:opacity-50"
                        aria-label={`Delete ${offer.title}`}
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
