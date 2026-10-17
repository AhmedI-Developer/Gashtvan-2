import { api, unwrapList } from '@/lib/api'

/** Region options — Kurdistan first, then Middle East, then Europe. */
export const newsRegions = ['Kurdistan', 'Middle East', 'Europe']

export function newsLocale(lng) {
  const base = (lng || 'en').split('-')[0]
  return base === 'ar' || base === 'ckb' ? base : 'en'
}

/** Load latest travel news from the Laravel API (optionally translated + region-filtered). */
export async function fetchNews({ lng = 'en', region } = {}) {
  const lang = newsLocale(lng)
  const params = { lang }
  if (region) params.region = region

  const { data: payload } = await api.get('/news', { params })
  return unwrapList(payload).map(mapNewsItem)
}

function mapNewsItem(raw) {
  return {
    id: raw.id,
    region: raw.region,
    title: raw.title,
    excerpt: raw.excerpt || '',
    body: raw.body || raw.excerpt || '',
    coverImage: raw.coverImage || raw.cover_image || '',
    icon: raw.icon || 'Newspaper',
    date: raw.date,
    tag: raw.tag || 'Travel',
    url: raw.url || null,
    source: raw.source || null,
  }
}

export function newsByRegion(items, region) {
  return items.filter((item) => item.region === region).slice(0, 4)
}

const kurdishMonths = [
  'کانوونی دووەم',
  'شوبات',
  'ئازار',
  'نیسان',
  'ئایار',
  'حوزەیران',
  'تەممووز',
  'ئاب',
  'ئەیلوول',
  'تشرینی یەکەم',
  'تشرینی دووەم',
  'کانوونی یەکەم',
]

export function formatNewsDate(date, lng = 'en') {
  if (!date) return ''
  const value = new Date(date)
  if (Number.isNaN(value.getTime())) return ''
  if (newsLocale(lng) === 'ckb') {
    return `${value.getUTCDate()} ${kurdishMonths[value.getUTCMonth()]} ${value.getUTCFullYear()}`
  }
  const locale = newsLocale(lng) === 'ar' ? 'ar' : 'en-GB'
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(value)
}
