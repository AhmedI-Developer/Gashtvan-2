import { cn } from '@/lib/cn'

export default function Skeleton({ className }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[20px] bg-[var(--surface-2)]',
        'before:absolute before:inset-0 before:-translate-x-full before:animate-[skeleton-shimmer_1.4s_ease_infinite]',
        'before:bg-[linear-gradient(90deg,transparent,color-mix(in_srgb,var(--text)_08%,transparent),transparent)]',
        className,
      )}
      aria-hidden="true"
    />
  )
}

export function OfferCardSkeleton({ className }) {
  return (
    <div
      className={cn(
        'flex h-full w-full flex-col overflow-hidden rounded-[22px] border border-[var(--border)] bg-[var(--surface)] sm:rounded-[26px]',
        className,
      )}
      aria-hidden="true"
    >
      <Skeleton className="aspect-[16/11] w-full rounded-none" />
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <Skeleton className="h-3 w-20 rounded-full" />
        <Skeleton className="h-5 w-[88%] rounded-full" />
        <Skeleton className="h-5 w-[62%] rounded-full" />
        <Skeleton className="mt-auto h-4 w-28 rounded-full" />
      </div>
    </div>
  )
}

export function NewsCardSkeleton() {
  return (
    <div
      className="flex h-full w-full flex-col overflow-hidden rounded-[22px] border border-[var(--border)] bg-[var(--surface)]"
      aria-hidden="true"
    >
      <Skeleton className="aspect-[5/4] w-full rounded-none sm:aspect-[4/3]" />
      <div className="flex flex-1 flex-col gap-2.5 px-3.5 py-3.5 sm:px-4 sm:py-4">
        <Skeleton className="h-4 w-full rounded-full" />
        <Skeleton className="h-4 w-[78%] rounded-full" />
        <Skeleton className="mt-auto h-3 w-24 rounded-full" />
      </div>
    </div>
  )
}

export function DestinationCardSkeleton() {
  return (
    <div
      className="rounded-[22px] border border-[var(--border)] bg-[var(--surface)] p-5 sm:rounded-[26px]"
      aria-hidden="true"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1 space-y-2">
          <Skeleton className="h-3 w-24 rounded-full" />
          <Skeleton className="h-6 w-40 rounded-full" />
        </div>
        <Skeleton className="h-5 w-20 shrink-0 rounded-full" />
      </div>
      <Skeleton className="mt-4 h-4 w-3/4 rounded-full" />
    </div>
  )
}
