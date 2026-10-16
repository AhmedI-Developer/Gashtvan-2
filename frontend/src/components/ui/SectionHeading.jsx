import { motion } from 'framer-motion'
import GreenShape from '@/components/brand/GreenShape'
import { cn } from '@/lib/cn'

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'start',
  light = false,
  className,
  titleId,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'mb-7 max-w-3xl sm:mb-10',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow ? (
        <div
          className={cn(
            'mb-3 inline-flex items-center gap-2.5',
            align === 'center' && 'justify-center',
          )}
        >
          <GreenShape size={14} />
          <p className="eyebrow">{eyebrow}</p>
        </div>
      ) : null}
      <h2
        id={titleId}
        className={cn(
          'font-display text-balance text-[1.65rem] font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl',
          light ? 'text-white' : 'text-[var(--text)]',
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            'mt-3 text-[0.95rem] sm:mt-4 sm:text-base md:text-lg',
            light ? 'text-white/80' : 'text-[var(--text-muted)]',
          )}
        >
          {description}
        </p>
      ) : null}
    </motion.div>
  )
}
