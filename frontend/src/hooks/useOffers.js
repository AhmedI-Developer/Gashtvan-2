import { useEffect, useState } from 'react'
import { fetchOffers, getActiveOffers } from '@/lib/offers'

export function useOffers(options = {}) {
  const { featured = false, limit = 24 } = options
  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const data = await fetchOffers({ featured, limit })
        if (alive) setOffers(getActiveOffers(data))
      } catch (err) {
        if (alive) setError(err)
      } finally {
        if (alive) setLoading(false)
      }
    })()
    return () => {
      alive = false
    }
  }, [featured, limit])

  return { offers, loading, error }
}
