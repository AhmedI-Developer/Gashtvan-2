import { cn } from '@/lib/cn'

export default function StatusBadge({ active }) {
  return (
    <span
      className={cn(
        'inline-flex rounded-full px-2.5 py-1 text-xs font-semibold',
        active
          ? 'bg-[var(--accent-soft)] text-[var(--accent-text)]'
          : 'bg-[var(--surface-2)] text-[var(--text-muted)]',
      )}
    >
      {active ? 'Active' : 'Hidden'}
    </span>
  )
}
