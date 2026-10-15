import { useEffect, useState } from 'react'
import { fetchDestinations } from '@/lib/destinations'

export function useDestinations() {
  const [destinations, setDestinations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const data = await fetchDestinations()
        if (alive) setDestinations(data)
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

  return { destinations, loading, error }
}
