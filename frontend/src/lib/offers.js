import { apiBase } from '@/config/site'

const CATEGORY_LABELS = {
  ticket: 'Tickets',
  hotel: 'Hotels',
  visa: 'Visa',
  tour: 'Tours',
  bundle: 'Bundles',
}

function includeLabel(item) {
  if (typeof item === 'string') return item
  return item?.label || item?.value || ''
}

/** Map a Laravel OfferResource into the shape the offer pages render. */
export function mapOffer(raw) {
  if (raw?.shortDescription || raw?.coverImage) return raw

  const includes = (raw.includes || []).map(includeLabel).filter(Boolean)
  const days = raw.duration_days

  return {
    id: raw.id,
    slug: raw.slug,
    title: raw.title,
    category: raw.category || raw.category_label,
    categoryLabel: raw.category_label || CATEGORY_LABELS[raw.category] || raw.category,
    destination: raw.destination,
    shortDescription: raw.summary || '',
    fullDescription: raw.description || raw.summary || '',
    coverImage: raw.image_url || '',
    gallery: raw.image_url ? [raw.image_url] : [],
    price: raw.price,
    currency: raw.currency || 'USD',
    oldPrice: null,
    badge: raw.is_featured ? 'Featured' : null,
    validFrom: raw.created_at || null,
    validUntil: null,
    durationDays: days || null,
    includes,
    excludes: [],
    itinerary: [],
    terms: null,
    isFeatured: Boolean(raw.is_featured),
    sortOrder: raw.sort_order ?? 0,
  }
}

async function readOfferPage(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch offers')
  const payload = await res.json()
  const rows = Array.isArray(payload) ? payload : payload.data || payload.offers || []
  return {
    rows,
    lastPage: payload.meta?.last_page || 1,
    paginated: Boolean(payload.meta),
  }
}

/** Load every active offer. Follows API pages so nothing past the first page is dropped. */
export async function fetchOffers({ featured = false } = {}) {
  const rows = []
  let page = 1
  let lastPage = 1

  while (page <= lastPage && page <= 50) {
    const params = new URLSearchParams({ page: String(page) })
    if (featured) params.set('featured', '1')
    const result = await readOfferPage(`${apiBase}/offers?${params}`)
    rows.push(...result.rows)
    if (!result.paginated) break
    lastPage = result.lastPage
    page += 1
  }

  return rows.map(mapOffer)
}

export async function fetchOffer(slug) {
  const res = await fetch(`${apiBase}/offers/${encodeURIComponent(slug)}`)
  if (res.status === 404) return null
  if (!res.ok) throw new Error('Failed to fetch offer')
  const payload = await res.json()
  return mapOffer(payload.data ?? payload)
}

export function isOfferActive(offer, now = new Date()) {
  if (!offer?.validUntil) return true
  return new Date(offer.validUntil) >= now
}

export function getActiveOffers(offers) {
  return offers.filter((offer) => isOfferActive(offer))
}

export function daysUntil(date) {
  if (!date) return null
  const end = new Date(date)
  if (Number.isNaN(end.getTime())) return null
  const now = new Date()
  return Math.ceil((end - now) / (1000 * 60 * 60 * 24))
}

export function formatPrice(offer, contactLabel = 'Contact for price') {
  if (offer.price == null) return contactLabel
  const amount = new Intl.NumberFormat('en-US').format(offer.price)
  return `${offer.currency || 'USD'} ${amount}`
}

export function sortOffers(offers, mode) {
  const list = [...offers]
  switch (mode) {
    case 'ending':
      return list.sort((a, b) => {
        if (!a.validUntil && !b.validUntil) return 0
        if (!a.validUntil) return 1
        if (!b.validUntil) return -1
        return new Date(a.validUntil) - new Date(b.validUntil)
      })
    case 'price':
      return list.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity))
    case 'newest':
    default:
      return list.sort((a, b) => {
        if (a.sortOrder != null || b.sortOrder != null) {
          return (a.sortOrder ?? 999) - (b.sortOrder ?? 999)
        }
        return new Date(b.validFrom || 0) - new Date(a.validFrom || 0)
      })
  }
}

export function filterOffers(offers, { category, query, destination, destinationLabel }) {
  return offers.filter((offer) => {
    const catOk =
      !category || category === 'all' || category === 'All' || offer.category === category
    const destOk =
      !destination || destination === 'All' || offer.destination === destination
    const q = query.trim().toLowerCase()
    const textOk =
      !q ||
      [
        offer.title,
        offer.destination,
        destinationLabel?.(offer.destination),
        offer.shortDescription,
        offer.category,
        offer.categoryLabel,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(q)
    return catOk && destOk && textOk
  })
}

const baseCategories = ['All', 'Tickets', 'Hotels', 'Visa', 'Tours', 'Bundles']

export function categoriesFrom(offers) {
  const extra = [...new Set(offers.map((offer) => offer.category).filter(Boolean))].filter(
    (category) => !baseCategories.includes(category),
  )
  return [...baseCategories, ...extra]
}

export const categories = baseCategories
