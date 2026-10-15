import localNews from '@/data/news.json'
import newsAr from '@/data/news.ar.json'
import newsCkb from '@/data/news.ckb.json'

const copies = { ar: newsAr, ckb: newsCkb }

export function newsLocale(lng) {
  const base = (lng || 'en').split('-')[0]
  return base === 'ar' || base === 'ckb' ? base : 'en'
}

export function localizeNews(items, lng) {
  const pack = copies[newsLocale(lng)]
  if (!pack) return items
  return items.map((item) => {
    const copy = pack[item.id]
    return copy ? { ...item, ...copy } : item
  })
}

/** Region load order — Kurdistan first, then Middle East, then Europe. */
export const newsRegions = ['Kurdistan', 'Middle East', 'Europe']

export function fetchNews() {
  return Promise.resolve(localNews)
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
