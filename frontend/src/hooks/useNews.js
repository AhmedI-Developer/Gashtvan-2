import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { fetchNews, newsLocale, newsRegions } from '@/lib/news'

/**
 * Loads live travel news for the active region, translated to the UI language.
 */
export function useNews() {
  const { i18n } = useTranslation()
  const lang = newsLocale(i18n.language)
  const [items, setItems] = useState([])
  const [activeRegion, setActiveRegion] = useState(newsRegions[0])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let alive = true

    ;(async () => {
      await Promise.resolve()
      if (!alive) return
      setLoading(true)
      setError(null)

      try {
        const data = await fetchNews({ lng: lang, region: activeRegion })
        if (!alive) return
        setItems(data)
      } catch (err) {
        if (!alive) return
        setItems([])
        setError(err)
      } finally {
        if (alive) setLoading(false)
      }
    })()

    return () => {
      alive = false
    }
  }, [lang, activeRegion])

  return {
    items,
    articles: items,
    loading,
    error,
    regions: newsRegions,
    activeRegion,
    setActiveRegion,
  }
}
