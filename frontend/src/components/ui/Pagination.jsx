import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/cn'

function pageWindow(current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const pages = new Set([1, total, current, current - 1, current + 1])
  if (current <= 3) {
    pages.add(2)
    pages.add(3)
    pages.add(4)
  }
  if (current >= total - 2) {
    pages.add(total - 1)
    pages.add(total - 2)
    pages.add(total - 3)
  }

  return [...pages].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b)
}

export default function Pagination({ page, totalPages, onChange, className }) {
  const { t } = useTranslation()

  if (!totalPages || totalPages <= 1) return null

  const pages = pageWindow(page, totalPages)

  return (
    <nav
      aria-label={t('common.pagination')}
      className={cn('mt-10 flex flex-wrap items-center justify-center gap-2', className)}
    >
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        aria-label={t('common.prevPage')}
        className={cn(
          'inline-flex h-11 items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3.5 text-sm font-semibold text-[var(--text)] transition',
          'hover:border-[var(--accent)] hover:bg-[var(--accent-soft)] disabled:pointer-events-none disabled:opacity-40',
        )}
      >
        <ChevronLeft size={16} strokeWidth={2.25} className="rtl:rotate-180" aria-hidden="true" />
        <span className="hidden sm:inline">{t('common.prevPage')}</span>
      </button>

      <ol className="flex flex-wrap items-center justify-center gap-1.5">
        {pages.map((n, index) => {
          const prev = pages[index - 1]
          const showGap = prev != null && n - prev > 1

          return (
            <li key={n} className="flex items-center gap-1.5">
              {showGap ? (
                <span className="px-1 text-sm text-[var(--text-muted)]" aria-hidden="true">
                  …
                </span>
              ) : null}
              <button
                type="button"
                onClick={() => onChange(n)}
                aria-label={t('common.pageN', { n })}
                aria-current={n === page ? 'page' : undefined}
                className={cn(
                  'inline-flex h-11 min-w-11 items-center justify-center rounded-full border px-3 text-sm font-semibold transition',
                  n === page
                    ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--navy)]'
                    : 'border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]',
                )}
              >
                {n}
              </button>
            </li>
          )
        })}
      </ol>

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        aria-label={t('common.nextPage')}
        className={cn(
          'inline-flex h-11 items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3.5 text-sm font-semibold text-[var(--text)] transition',
          'hover:border-[var(--accent)] hover:bg-[var(--accent-soft)] disabled:pointer-events-none disabled:opacity-40',
        )}
      >
        <span className="hidden sm:inline">{t('common.nextPage')}</span>
        <ChevronRight size={16} strokeWidth={2.25} className="rtl:rotate-180" aria-hidden="true" />
      </button>
    </nav>
  )
}
