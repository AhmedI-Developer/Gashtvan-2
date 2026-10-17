import { api, unwrapList } from '@/lib/api'

/** Unique flight destinations from `/api/fares`, cheapest fare first per city. */
export async function fetchDestinations() {
  const { data: payload } = await api.get('/fares')
  const fares = unwrapList(payload)
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

export function cityLabel(name, t) {
  if (!name) return ''
  if (!t) return name
  const key = `destinations.cities.${name}`
  const label = t(key)
  return label === key ? name : label
}

export function formatFromPrice(destination, t) {
  if (destination.fromPrice == null) return t ? t('destinations.ask') : 'Ask for fare'
  const amount = new Intl.NumberFormat('en-US').format(destination.fromPrice)
  const currency = destination.currency || 'USD'
  return t
    ? t('destinations.fromPrice', { currency, amount })
    : `From ${currency} ${amount}`
}
