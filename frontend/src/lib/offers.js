import localOffers from '@/data/offers.json'
import { apiUrl } from '@/config/site'

export async function fetchOffers() {
  if (apiUrl) {
    try {
      const res = await fetch(apiUrl)
      if (!res.ok) throw new Error('Failed to fetch offers')
      const data = await res.json()
      return Array.isArray(data) ? data : data.offers || []
    } catch (error) {
      console.warn('Offers API failed, falling back to local JSON', error)
    }
  }
  return localOffers
}

export function isOfferActive(offer, now = new Date()) {
  if (!offer?.validUntil) return true
  return new Date(offer.validUntil) >= now
}

export function getActiveOffers(offers) {
  return offers.filter((offer) => isOfferActive(offer))
}

export function daysUntil(date) {
  const end = new Date(date)
  const now = new Date()
  const diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24))
  return diff
}

export function formatPrice(offer) {
  if (offer.price == null) return 'Contact for price'
  const amount = new Intl.NumberFormat('en-US').format(offer.price)
  return `${offer.currency || 'USD'} ${amount}`
}

export function sortOffers(offers, mode) {
  const list = [...offers]
  switch (mode) {
    case 'ending':
      return list.sort(
        (a, b) => new Date(a.validUntil) - new Date(b.validUntil),
      )
    case 'price':
      return list.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity))
    case 'newest':
    default:
      return list.sort(
        (a, b) => new Date(b.validFrom) - new Date(a.validFrom),
      )
  }
}

export function filterOffers(offers, { category, query }) {
  return offers.filter((offer) => {
    const catOk = !category || category === 'All' || offer.category === category
    const q = query.trim().toLowerCase()
    const textOk =
      !q ||
      [offer.title, offer.destination, offer.shortDescription, offer.category]
        .join(' ')
        .toLowerCase()
        .includes(q)
    return catOk && textOk
  })
}

export const categories = [
  'All',
  'Flights',
  'Hotels',
  'Tours',
  'Umrah/Religious',
  'Medical',
  'MICE',
  'Visa',
  'Packages',
]
