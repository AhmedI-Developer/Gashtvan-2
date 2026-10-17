import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/cn'

/**
 * Sticky service image panel (desktop).
 * Swap images in `/src/data/services.js` only.
 */
export default function ServiceImagePanel({
  service,
  reduced,
  onOpen,
  className,
}) {
  return (
    <div
      className={cn(
        'relative aspect-[3/4] w-full overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--navy)] shadow-[var(--shadow)]',
        className,
      )}
    >
      <AnimatePresence initial={false} mode="sync">
        <motion.img
          key={service.id}
          src={service.image}
          alt={service.imageAlt}
          width={1000}
          height={1333}
          initial={
            reduced
              ? { opacity: 0 }
              : { clipPath: 'inset(100% 0 0 0)', scale: 1.08, opacity: 1 }
          }
          animate={
            reduced
              ? { opacity: 1 }
              : { clipPath: 'inset(0% 0 0 0)', scale: 1, opacity: 1 }
          }
          exit={
            reduced
              ? { opacity: 0 }
              : { clipPath: 'inset(0 0 100% 0)', opacity: 0.85 }
          }
          transition={{ duration: reduced ? 0.25 : 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>

      {/* Deep navy overlay — same in both themes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(165deg,transparent_20%,#04203Acc_55%,#04203Af0_100%)]"
      />

      <button
        type="button"
        onClick={onOpen}
        aria-label={service.title}
        className="group absolute bottom-5 end-5 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--navy)] transition hover:bg-[var(--accent-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
      >
        <ArrowUpRight
          size={22}
          strokeWidth={2.25}
          className="transition-transform duration-300 group-hover:rotate-45 rtl:-scale-x-100 rtl:group-hover:-rotate-45"
        />
      </button>
    </div>
  )
}
