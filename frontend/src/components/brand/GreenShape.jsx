import { cn } from '@/lib/cn'

/** Small green rounded-corner motif that leads animated lines. */
export default function GreenShape({ className, size = 14 }) {
  return (
    <span
      aria-hidden="true"
      className={cn('inline-block shrink-0 bg-[var(--accent)]', className)}
      style={{
        width: size,
        height: size,
        borderRadius: '4px 10px 4px 10px',
        boxShadow: '0 0 12px rgba(160,194,58,0.55)',
      }}
    />
  )
}
