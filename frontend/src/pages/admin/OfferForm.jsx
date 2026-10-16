import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Button from '@/components/ui/Button'
import { CheckboxField, Field, controlClass } from '@/components/admin/Field'
import {
  AdminApiError,
  OFFER_CATEGORIES,
  OFFER_INCLUDES,
  createAdminOffer,
  fetchAdminOffer,
  updateAdminOffer,
} from '@/lib/adminApi'

const empty = {
  title: '',
  slug: '',
  categories: ['ticket'],
  destination: '',
  summary: '',
  description: '',
  includes: [],
  price: '',
  currency: 'USD',
  duration_days: '',
  sort_order: '0',
  is_featured: false,
  is_active: true,
}

export default function AdminOfferForm() {
  const { id } = useParams()
  const editing = Boolean(id)
  const navigate = useNavigate()
  const [form, setForm] = useState(empty)
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState('')
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [loading, setLoading] = useState(editing)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!editing) return undefined
    let alive = true
    ;(async () => {
      try {
        const offer = await fetchAdminOffer(id)
        if (!alive) return
        const categories =
          Array.isArray(offer.categories) && offer.categories.length
            ? offer.categories
            : offer.category
              ? [offer.category]
              : ['ticket']
        setForm({
          title: offer.title || '',
          slug: offer.slug || '',
          categories,
          destination: offer.destination || '',
          summary: offer.summary || '',
          description: offer.description || '',
          includes: (offer.includes || []).map((item) =>
            typeof item === 'string' ? item : item.value,
          ),
          price: offer.price ?? '',
          currency: offer.currency || 'USD',
          duration_days: offer.duration_days ?? '',
          sort_order: String(offer.sort_order ?? 0),
          is_featured: Boolean(offer.is_featured),
          is_active: Boolean(offer.is_active),
        })
        setPreview(offer.image_url || '')
      } catch (err) {
        if (alive) setFormError(err.message || 'Failed to load offer')
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

  const toggleInclude = (value) => {
    setForm((current) => {
      const next = current.includes.includes(value)
        ? current.includes.filter((item) => item !== value)
        : [...current.includes, value]
      return { ...current, includes: next }
    })
  }

  const toggleCategory = (value) => {
    setForm((current) => {
      const selected = current.categories.includes(value)
      if (selected && current.categories.length === 1) return current
      const next = selected
        ? current.categories.filter((item) => item !== value)
        : [...current.categories, value]
      return { ...current, categories: next }
    })
  }

  const onImageChange = (e) => {
    const file = e.target.files?.[0]
    setImage(file || null)
    if (file) setPreview(URL.createObjectURL(file))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setErrors({})
    setFormError('')

    const data = new FormData()
    data.append('title', form.title.trim())
    if (form.slug.trim()) data.append('slug', form.slug.trim())
    data.append('categories', JSON.stringify(form.categories))
    data.append('destination', form.destination.trim())
    data.append('summary', form.summary.trim())
    data.append('description', form.description.trim())
    data.append('currency', form.currency.trim() || 'USD')
    data.append('sort_order', String(form.sort_order || 0))
    data.append('is_featured', form.is_featured ? '1' : '0')
    data.append('is_active', form.is_active ? '1' : '0')
    if (form.price !== '' && form.price != null) data.append('price', String(form.price))
    if (form.duration_days !== '' && form.duration_days != null) {
      data.append('duration_days', String(form.duration_days))
    }
    data.append('includes', JSON.stringify(form.includes))
    if (image) data.append('image', image)

    try {
      if (editing) await updateAdminOffer(id, data)
      else await createAdminOffer(data)
      navigate('/admin/offers')
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
    return <p className="text-[var(--text-muted)]">Loading offer…</p>
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <p className="text-sm text-[var(--text-muted)]">
          <Link to="/admin/offers" className="hover:text-[var(--accent-text)]">
            Offers
          </Link>{' '}
          / {editing ? 'Edit' : 'New'}
        </p>
        <h1 className="mt-1 font-display text-3xl font-bold text-[var(--text)]">
          {editing ? 'Edit offer' : 'Add offer'}
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
        <Field
          label="Title"
          name="title"
          required
          value={form.title}
          onChange={(e) => setField('title', e.target.value)}
          error={errors.title?.[0]}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Slug (optional)"
            name="slug"
            value={form.slug}
            onChange={(e) => setField('slug', e.target.value)}
            error={errors.slug?.[0]}
            placeholder="auto-from-title"
          />
          <Field
            label="Categories"
            error={errors.categories?.[0] || errors['categories.0']?.[0]}
          >
            <div className="flex flex-wrap gap-3 pt-1">
              {OFFER_CATEGORIES.map((item) => (
                <CheckboxField
                  key={item.value}
                  label={item.label}
                  checked={form.categories.includes(item.value)}
                  onChange={() => toggleCategory(item.value)}
                />
              ))}
            </div>
            <p className="mt-2 text-xs text-[var(--text-muted)]">
              Select one or more — tickets, hotel, and visa can all apply to the same offer.
            </p>
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Destination"
            name="destination"
            value={form.destination}
            onChange={(e) => setField('destination', e.target.value)}
            error={errors.destination?.[0]}
          />
          <Field
            label="Duration (days)"
            name="duration_days"
            type="number"
            min="1"
            value={form.duration_days}
            onChange={(e) => setField('duration_days', e.target.value)}
            error={errors.duration_days?.[0]}
          />
        </div>
        <Field
          label="Summary"
          name="summary"
          as="textarea"
          rows={3}
          value={form.summary}
          onChange={(e) => setField('summary', e.target.value)}
          error={errors.summary?.[0]}
        />
        <Field
          label="Description"
          name="description"
          as="textarea"
          rows={6}
          value={form.description}
          onChange={(e) => setField('description', e.target.value)}
          error={errors.description?.[0]}
        />

        <fieldset>
          <legend className="text-sm font-semibold text-[var(--text)]">Includes</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {OFFER_INCLUDES.map((item) => (
              <label
                key={item.value}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2 text-sm"
              >
                <input
                  type="checkbox"
                  checked={form.includes.includes(item.value)}
                  onChange={() => toggleInclude(item.value)}
                  className="accent-[var(--accent)]"
                />
                {item.label}
              </label>
            ))}
          </div>
          {errors.includes?.[0] ? (
            <span className="mt-1 block text-xs text-red-400">{errors.includes[0]}</span>
          ) : null}
        </fieldset>

        <div className="grid gap-4 sm:grid-cols-3">
          <Field
            label="Price"
            name="price"
            type="number"
            min="0"
            step="0.01"
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

        <Field label="Cover image" error={errors.image?.[0]}>
          <input
            type="file"
            accept="image/*"
            name="image"
            className={controlClass}
            onChange={onImageChange}
          />
        </Field>
        {preview ? (
          <img
            src={preview}
            alt="Offer preview"
            className="h-40 w-full rounded-[18px] object-cover sm:h-52"
          />
        ) : null}

        <div className="flex flex-wrap gap-3">
          <CheckboxField
            label="Featured on homepage"
            checked={form.is_featured}
            onChange={(e) => setField('is_featured', e.target.checked)}
          />
          <CheckboxField
            label="Active (visible on site)"
            checked={form.is_active}
            onChange={(e) => setField('is_active', e.target.checked)}
          />
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Button type="submit" disabled={saving}>
            {saving ? 'Saving…' : editing ? 'Save changes' : 'Create offer'}
          </Button>
          <Button to="/admin/offers" variant="secondary">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
