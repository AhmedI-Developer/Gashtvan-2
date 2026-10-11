import { cn } from '@/lib/cn'

export default function Skeleton({ className }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-[20px] bg-[var(--surface-2)]',
        className,
      )}
      aria-hidden="true"
    />
  )
}
