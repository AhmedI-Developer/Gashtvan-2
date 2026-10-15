import localNews from '@/data/news.json'

/** Region load order — Kurdistan first, then Middle East, then Europe. */
export const newsRegions = ['Kurdistan', 'Middle East', 'Europe']

export function fetchNews() {
  return Promise.resolve(localNews)
}

export function newsByRegion(items, region) {
  return items.filter((item) => item.region === region).slice(0, 4)
}

export function formatNewsDate(date) {
  if (!date) return ''
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}
