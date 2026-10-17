/** Central site configuration — edit contact & brand microcopy here only. */
export const site = {
  name: 'Gashtvan',
  legalName: 'Gashtvan Travel & Tourism',
  tagline: 'Elevating Travel Experiences Beyond Boundaries',
  ctaBanner: 'Your extraordinary adventure awaits!',
  region: 'Erbil, Kurdistan Region, Iraq',
  url: 'https://gashtvan-travel.com',
  whatsapp: '+9647501234567',
  phones: ['+964 750 123 4567', '+964 770 987 6543'],
  emails: ['info@gashtvan-travel.com', 'sales@gashtvan-travel.com'],
  address: 'House No. 168 English Village - Erbil - Iraq',
  hours: 'Sat–Thu, 9:00 AM – 6:00 PM',
  mapsUrl: 'https://maps.app.goo.gl/PMConNsqqukvrXaG8',
  location: {
    lat: 36.194421,
    lng: 43.9685105,
    label: 'Gashtvan Travel Agency',
  },
  social: {
    facebook: 'https://www.facebook.com/gashtvan.travel',
    instagram: 'https://www.instagram.com/gashtvan.travel',
  },
  trustBadges: [
    'IATA Member',
    'Royal Jordanian Airlines – GSA Kurdistan',
    'Amadeus GDS Distributor',
    'Galileo Proficiency',
    'Sabre Proficiency',
  ],
  heroStats: [
    { label: '12+ Years', value: 12, suffix: '+' },
    { label: 'IATA Member', value: null },
    { label: 'Top 5 in Kurdistan', value: 5, prefix: 'Top ' },
    { label: '24/7 Support', value: 24, suffix: '/7' },
  ],
  nav: [
    { key: 'home', href: '/#home' },
    { key: 'destinations', href: '/destinations' },
    { key: 'offers', href: '/offers' },
    { key: 'news', href: '/#news' },
    { key: 'contact', href: '/contact' },
    { key: 'about', href: '/about' },
  ],
}

/**
 * Laravel API base.
 * - Dev: `/api` (Vite proxies to local artisan — no CORS)
 * - Prod fallback: live API host
 * Override anytime with VITE_API_URL.
 */
export const apiBase =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? '/api' : 'https://gashtvan.ahmed-dev.org/api')

/**
 * Resolve offer/news media against the API host.
 * Prefers /api/media/... (works behind SPA hosts). Also rewrites old /storage/... links.
 */
export function mediaUrl(path) {
  if (!path) return ''

  let pathname = path
  if (/^https?:\/\//i.test(path)) {
    try {
      const absolute = new URL(path)
      // Rewrite leftover local APP_URL links from a misconfigured backend.
      if (
        absolute.hostname === '127.0.0.1' ||
        absolute.hostname === 'localhost'
      ) {
        pathname = absolute.pathname
      } else if (absolute.pathname.startsWith('/api/media/')) {
        return path
      } else if (absolute.pathname.startsWith('/storage/')) {
        pathname = absolute.pathname
      } else {
        return path
      }
    } catch {
      return path
    }
  }

  if (!pathname.startsWith('/')) pathname = `/${pathname}`

  // Normalize legacy /storage/foo → /api/media/foo
  if (pathname.startsWith('/storage/')) {
    pathname = `/api/media/${pathname.slice('/storage/'.length)}`
  }

  if (!pathname.startsWith('/api/media/')) return pathname

  try {
    const api = new URL(apiBase, typeof window !== 'undefined' ? window.location.origin : 'http://localhost')
    // apiBase is like https://host/api or /api — media path already includes /api/media
    return `${api.origin}${pathname}`
  } catch {
    return pathname
  }
}
