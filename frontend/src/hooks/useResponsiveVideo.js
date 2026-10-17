import { useEffect, useState } from 'react'

const MOBILE_QUERY = '(max-width: 767px)'

/**
 * Switches video source between mobile and desktop breakpoints.
 */
export function useResponsiveVideo(desktopSrc, mobileSrc) {
  const [src, setSrc] = useState(() => {
    if (typeof window === 'undefined') return desktopSrc
    return window.matchMedia(MOBILE_QUERY).matches ? mobileSrc : desktopSrc
  })

  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY)
    const update = () => setSrc(media.matches ? mobileSrc : desktopSrc)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [desktopSrc, mobileSrc])

  return src
}
