import { api, unwrapItem, unwrapList } from '@/lib/api'
import { mediaUrl } from '@/config/site'

export const OFFER_CATEGORY_KEYS = ['ticket', 'hotel', 'visa']

const CATEGORY_LABELS = {
  ticket: 'Tickets',
  hotel: 'Hotels',
  visa: 'Visa',
}

function normalizeCategories(raw) {
  if (Array.isArray(raw?.categories) && raw.categories.length) {
    return raw.categories.filter((key) => OFFER_CATEGORY_KEYS.includes(key))
  }
  if (raw?.category && OFFER_CATEGORY_KEYS.includes(raw.category)) {
    return [raw.category]
  }
  return []
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

  const categories = normalizeCategories(raw)
  const category = categories[0] || raw.category || null

  return {
    id: raw.id,
    slug: raw.slug,
    title: raw.title,
    categories,
    category,
    categoryLabels: raw.category_labels?.length
      ? raw.category_labels
      : categories.map((key) => CATEGORY_LABELS[key] || key),
    categoryLabel:
      raw.category_label ||
      CATEGORY_LABELS[category] ||
      categories.map((key) => CATEGORY_LABELS[key] || key).join(' · ') ||
      category,
    destination: raw.destination,
    shortDescription: raw.summary || '',
    fullDescription: raw.description || raw.summary || '',
    coverImage: mediaUrl(raw.image_url || ''),
    gallery: raw.image_url ? [mediaUrl(raw.image_url)] : [],
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

/** Load active offers from the Laravel API via Axios. */
export async function fetchOffers({ featured = false, limit } = {}) {
  const rows = []
  let page = 1
  let lastPage = 1

  while (page <= lastPage && page <= 50) {
    const params = { page }
    if (featured) params.featured = 1
    if (limit) params.limit = limit

    const { data: payload } = await api.get('/offers', { params })
    const pageRows = unwrapList(payload)
    rows.push(...pageRows)

    const metaLast = payload?.meta?.last_page
    if (!metaLast || limit) break
    lastPage = metaLast
    page += 1
  }

  return rows.map(mapOffer)
}

export async function fetchOffer(slug) {
  try {
    const { data: payload } = await api.get(`/offers/${encodeURIComponent(slug)}`)
    return mapOffer(unwrapItem(payload))
  } catch (err) {
    if (err?.response?.status === 404) return null
    throw err
  }
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

export function offerPriceParts(offer) {
  if (offer?.price == null) {
    return { hasPrice: false, currency: null, amount: null }
  }

  return {
    hasPrice: true,
    currency: offer.currency || 'USD',
    amount: new Intl.NumberFormat('en-US').format(offer.price),
  }
}

/**
 * @param {object} offer
 * @param {((key: string, opts?: object) => string)|string} [tOrContact]
 */
export function formatPrice(offer, tOrContact) {
  const parts = offerPriceParts(offer)
  if (!parts.hasPrice) {
    if (typeof tOrContact === 'function') return tOrContact('offers.contactForPrice')
    if (typeof tOrContact === 'string') return tOrContact
    return 'Contact for price'
  }
  if (typeof tOrContact === 'function') {
    return tOrContact('offers.fromPrice', {
      currency: parts.currency,
      amount: parts.amount,
    })
  }
  return `Starting from ${parts.currency} ${parts.amount}`
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

export function offerHasCategory(offer, category) {
  if (!category || category === 'all' || category === 'All') return true
  const list = Array.isArray(offer.categories) ? offer.categories : []
  if (list.includes(category)) return true
  return offer.category === category
}

export function filterOffers(offers, { category, query, destination, destinationLabel }) {
  return offers.filter((offer) => {
    const catOk = offerHasCategory(offer, category)
    const destOk =
      !destination || destination === 'All' || offer.destination === destination
    const q = (query || '').trim().toLowerCase()
    const textOk =
      !q ||
      [
        offer.title,
        offer.destination,
        destinationLabel?.(offer.destination),
        offer.shortDescription,
        ...(offer.categories || []),
        ...(offer.categoryLabels || []),
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

export const categories = ['all', ...OFFER_CATEGORY_KEYS]
