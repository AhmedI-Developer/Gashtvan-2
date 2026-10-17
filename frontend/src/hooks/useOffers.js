import { useEffect, useState } from 'react'
import { fetchOffers, getActiveOffers } from '@/lib/offers'

export function useOffers(options = {}) {
  const { featured = false, limit, fallbackAll = false } = options
  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let alive = true
    setLoading(true)
    setError(null)

    ;(async () => {
      try {
        let data = await fetchOffers({ featured, limit })
        let next = getActiveOffers(data)
        if (featured && fallbackAll && !next.length) {
          data = await fetchOffers({ limit: limit || 6 })
          next = getActiveOffers(data)
        }
        if (alive) setOffers(next)
      } catch (err) {
        if (alive) setError(err)
      } finally {
        if (alive) setLoading(false)
      }
    })()

    return () => {
      alive = false
    }
  }, [featured, limit, fallbackAll])

  return { offers, loading, error }
}
