import { useEffect, useState } from 'react'
import { fetchOffers, getActiveOffers } from '@/lib/offers'

export function useOffers() {
  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const data = await fetchOffers()
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
  }, [])

  return { offers, loading, error }
}
