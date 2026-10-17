import { cn } from '@/lib/cn'

/**
 * Clear “starting from” price block used on destination + offer cards.
 */
export default function PriceTag({
  label,
  currency,
  amount,
  fallback,
  className,
  size = 'md',
}) {
  if (amount == null || amount === '') {
    return (
      <p
        className={cn(
          'font-semibold text-[var(--text-muted)]',
          size === 'lg' ? 'text-base' : 'text-sm',
          className,
        )}
      >
        {fallback}
      </p>
    )
  }

  return (
    <div className={cn('min-w-0', className)}>
      {label ? (
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[var(--accent-text)]">
          {label}
        </p>
      ) : null}
      <p
        className={cn(
          'font-display font-bold tracking-tight text-[var(--text)]',
          size === 'lg' ? 'mt-1 text-2xl sm:text-3xl' : 'mt-0.5 text-xl sm:text-2xl',
        )}
      >
        {currency ? (
          <span className="me-1.5 align-middle text-sm font-semibold tracking-normal text-[var(--text-muted)] sm:text-base">
            {currency}
          </span>
        ) : null}
        <span className="align-middle tabular-nums">{amount}</span>
      </p>
    </div>
  )
}
