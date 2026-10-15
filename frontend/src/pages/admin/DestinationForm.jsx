import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Button from '@/components/ui/Button'
import { CheckboxField, Field, controlClass } from '@/components/admin/Field'
import {
  AdminApiError,
  CABINS,
  TRIP_TYPES,
  createAdminFare,
  fetchAdminFare,
  updateAdminFare,
} from '@/lib/adminApi'

const empty = {
  origin: 'Erbil',
  origin_code: 'EBL',
  destination: '',
  destination_code: '',
  airline: '',
  airline_logo: '',
  price: '',
  currency: 'USD',
  trip_type: 'round_trip',
  cabin: 'economy',
  notes: '',
  sort_order: '0',
  is_active: true,
}

export default function AdminDestinationForm() {
  const { id } = useParams()
  const editing = Boolean(id)
  const navigate = useNavigate()
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [loading, setLoading] = useState(editing)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!editing) return undefined
    let alive = true
    ;(async () => {
      try {
        const fare = await fetchAdminFare(id)
        if (!alive) return
        setForm({
          origin: fare.origin || 'Erbil',
          origin_code: fare.origin_code || 'EBL',
          destination: fare.destination || '',
          destination_code: fare.destination_code || '',
          airline: fare.airline || '',
          airline_logo: fare.airline_logo || '',
          price: fare.price ?? '',
          currency: fare.currency || 'USD',
          trip_type: fare.trip_type || 'round_trip',
          cabin: fare.cabin || 'economy',
          notes: fare.notes || '',
          sort_order: String(fare.sort_order ?? 0),
          is_active: Boolean(fare.is_active),
        })
      } catch (err) {
        if (alive) setFormError(err.message || 'Failed to load destination')
      } finally {
        if (alive) setLoading(false)
      }
    })()
    return () => {
      alive = false
    }
  }, [editing, id])

  const setField = (name, value) => {
    setForm((current) => ({ ...current, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setErrors({})
    setFormError('')

    const body = {
      origin: form.origin.trim() || 'Erbil',
      origin_code: form.origin_code.trim() || 'EBL',
      destination: form.destination.trim(),
      destination_code: form.destination_code.trim() || null,
      airline: form.airline.trim(),
      airline_logo: form.airline_logo.trim() || null,
      price: Number(form.price),
      currency: form.currency.trim() || 'USD',
      trip_type: form.trip_type,
      cabin: form.cabin,
      notes: form.notes.trim() || null,
      sort_order: Number(form.sort_order || 0),
      is_active: form.is_active,
    }

    try {
      if (editing) await updateAdminFare(id, body)
      else await createAdminFare(body)
      navigate('/admin/destinations')
    } catch (err) {
      if (err instanceof AdminApiError) {
        setErrors(err.errors || {})
        setFormError(err.message)
      } else {
        setFormError('Save failed.')
      }
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <p className="text-[var(--text-muted)]">Loading destination…</p>
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <p className="text-sm text-[var(--text-muted)]">
          <Link to="/admin/destinations" className="hover:text-[var(--accent-text)]">
            Destinations
          </Link>{' '}
          / {editing ? 'Edit' : 'New'}
        </p>
        <h1 className="mt-1 font-display text-3xl font-bold text-[var(--text)]">
          {editing ? 'Edit destination fare' : 'Add destination fare'}
        </h1>
      </div>

      {formError ? (
        <p className="rounded-[16px] border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-300">
          {formError}
        </p>
      ) : null}

      <form
        onSubmit={onSubmit}
        className="space-y-5 rounded-[22px] border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Origin city"
            name="origin"
            value={form.origin}
            onChange={(e) => setField('origin', e.target.value)}
            error={errors.origin?.[0]}
          />
          <Field
            label="Origin code"
            name="origin_code"
            value={form.origin_code}
            onChange={(e) => setField('origin_code', e.target.value.toUpperCase())}
            error={errors.origin_code?.[0]}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Destination city"
            name="destination"
            required
            value={form.destination}
            onChange={(e) => setField('destination', e.target.value)}
            error={errors.destination?.[0]}
          />
          <Field
            label="Destination code"
            name="destination_code"
            value={form.destination_code}
            onChange={(e) => setField('destination_code', e.target.value.toUpperCase())}
            error={errors.destination_code?.[0]}
            placeholder="IST"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Airline"
            name="airline"
            required
            value={form.airline}
            onChange={(e) => setField('airline', e.target.value)}
            error={errors.airline?.[0]}
          />
          <Field
            label="Airline logo (optional URL/path)"
            name="airline_logo"
            value={form.airline_logo}
            onChange={(e) => setField('airline_logo', e.target.value)}
            error={errors.airline_logo?.[0]}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field
            label="Price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            required
            value={form.price}
            onChange={(e) => setField('price', e.target.value)}
            error={errors.price?.[0]}
          />
          <Field
            label="Currency"
            name="currency"
            value={form.currency}
            onChange={(e) => setField('currency', e.target.value)}
            error={errors.currency?.[0]}
          />
          <Field
            label="Sort order"
            name="sort_order"
            type="number"
            min="0"
            value={form.sort_order}
            onChange={(e) => setField('sort_order', e.target.value)}
            error={errors.sort_order?.[0]}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Trip type" error={errors.trip_type?.[0]}>
            <select
              name="trip_type"
              className={controlClass}
              value={form.trip_type}
              onChange={(e) => setField('trip_type', e.target.value)}
            >
              {TRIP_TYPES.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Cabin" error={errors.cabin?.[0]}>
            <select
              name="cabin"
              className={controlClass}
              value={form.cabin}
              onChange={(e) => setField('cabin', e.target.value)}
            >
              {CABINS.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <Field
          label="Notes"
          name="notes"
          as="textarea"
          rows={3}
          value={form.notes}
          onChange={(e) => setField('notes', e.target.value)}
          error={errors.notes?.[0]}
        />
        <CheckboxField
          label="Active (visible on site)"
          checked={form.is_active}
          onChange={(e) => setField('is_active', e.target.checked)}
        />

        <div className="flex flex-wrap gap-3 pt-2">
          <Button type="submit" disabled={saving}>
            {saving ? 'Saving…' : editing ? 'Save changes' : 'Create destination'}
          </Button>
          <Button to="/admin/destinations" variant="secondary">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
