import { useEffect, useState } from 'react'
import { fetchNews, newsByRegion, newsRegions } from '@/lib/news'

const REGION_DELAY_MS = 700

/**
 * Loads news in regional order: Kurdistan → Middle East → Europe.
 * Each region unlocks after a short delay so the UI can reveal progressively.
 */
export function useNews() {
  const [allNews, setAllNews] = useState([])
  const [unlockedRegions, setUnlockedRegions] = useState([])
  const [activeRegion, setActiveRegion] = useState(newsRegions[0])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    const timers = []

    ;(async () => {
      const data = await fetchNews()
      if (!alive) return
      setAllNews(data)

      newsRegions.forEach((region, index) => {
        const timer = setTimeout(() => {
          if (!alive) return
          setUnlockedRegions((prev) =>
            prev.includes(region) ? prev : [...prev, region],
          )
          if (index === 0) setLoading(false)
        }, index * REGION_DELAY_MS)
        timers.push(timer)
      })
    })()

    return () => {
      alive = false
      timers.forEach(clearTimeout)
    }
  }, [])

  const regionReady = unlockedRegions.includes(activeRegion)
  const items = regionReady ? newsByRegion(allNews, activeRegion) : []

  return {
    items,
    loading: loading || !regionReady,
    regions: newsRegions,
    unlockedRegions,
    activeRegion,
    setActiveRegion,
  }
}
