import { useMemo, useState } from 'react'

/** Client-side paging for filtered lists (Offers / Destinations). */
export function usePagination(items, { pageSize = 12, resetKey = '' } = {}) {
  const [page, setPage] = useState(1)
  const [seenResetKey, setSeenResetKey] = useState(resetKey)
  const total = Array.isArray(items) ? items.length : 0
  const totalPages = Math.max(1, Math.ceil(total / pageSize) || 1)

  if (seenResetKey !== resetKey) {
    setSeenResetKey(resetKey)
    setPage(1)
  }

  const safePage = Math.min(Math.max(1, page), totalPages)
  if (safePage !== page) {
    setPage(safePage)
  }

  const pageItems = useMemo(() => {
    const list = Array.isArray(items) ? items : []
    const start = (safePage - 1) * pageSize
    return list.slice(start, start + pageSize)
  }, [items, safePage, pageSize])

  return {
    page: safePage,
    setPage,
    pageSize,
    total,
    totalPages,
    pageItems,
    hasPagination: total > pageSize,
  }
}
