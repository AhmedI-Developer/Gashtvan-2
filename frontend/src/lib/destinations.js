import { apiBase } from '@/config/site'

/** Unique flight destinations from `/api/fares`, cheapest fare first per city. */
export async function fetchDestinations() {
  const res = await fetch(`${apiBase}/fares`)
  if (!res.ok) throw new Error('Failed to fetch destinations')
  const payload = await res.json()
  const fares = Array.isArray(payload) ? payload : payload.data || []
  const grouped = new Map()

  for (const fare of fares) {
    const key = fare.destination_code || fare.destination
    if (!key) continue
    const price = fare.price == null ? null : Number(fare.price)
    const existing = grouped.get(key)

    if (!existing) {
      grouped.set(key, {
        name: fare.destination,
        code: fare.destination_code || '',
        origin: fare.origin || 'Erbil',
        originCode: fare.origin_code || 'EBL',
        fromPrice: price,
        currency: fare.currency || 'USD',
        airlines: fare.airline ? [fare.airline] : [],
      })
      continue
    }

    if (price != null && (existing.fromPrice == null || price < existing.fromPrice)) {
      existing.fromPrice = price
      existing.currency = fare.currency || existing.currency
    }
    if (fare.airline && !existing.airlines.includes(fare.airline)) {
      existing.airlines.push(fare.airline)
    }
  }

  return [...grouped.values()]
}

export function formatFromPrice(destination) {
  if (destination.fromPrice == null) return 'Ask for fare'
  const amount = new Intl.NumberFormat('en-US').format(destination.fromPrice)
  return `From ${destination.currency || 'USD'} ${amount}`
}
