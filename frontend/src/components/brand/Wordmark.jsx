import { cn } from '@/lib/cn'

/** Text wordmark placeholder — swap for Logo when preferred. */
export default function Wordmark({ className }) {
  return (
    <span
      className={cn(
        'font-display text-lg font-800 tracking-tight text-[var(--text)]',
        className,
      )}
      style={{ fontWeight: 800 }}
    >
      <span className="text-[var(--logo-g)]">GASHT</span>
      <span className="text-[var(--accent)]">VAN</span>
    </span>
  )
}
