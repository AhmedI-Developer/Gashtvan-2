import GreenShape from '@/components/brand/GreenShape'
import { cn } from '@/lib/cn'

export default function PageHero({
  image,
  imageAlt = '',
  eyebrow,
  title,
  description,
  children,
  className,
}) {
  return (
    <section
      className={cn(
        'relative min-h-[42svh] overflow-hidden text-white sm:min-h-[48svh]',
        className,
      )}
    >
      <img
        src={image}
        alt={imageAlt}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,24,40,0.42)_0%,rgba(4,24,40,0.72)_45%,rgba(4,24,40,0.92)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,transparent,var(--bg))]"
      />

      <div className="container-shell relative z-10 flex min-h-[42svh] flex-col justify-end pb-10 pt-28 sm:min-h-[48svh] sm:pb-12 sm:pt-32">
        <div className="max-w-2xl">
          {eyebrow ? (
            <div className="mb-3 inline-flex items-center gap-2.5">
              <GreenShape size={14} />
              <p className="eyebrow text-[var(--accent)]">{eyebrow}</p>
            </div>
          ) : null}
          <h1 className="font-display text-balance text-[1.75rem] font-bold tracking-tight sm:text-4xl md:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-3 max-w-xl text-sm text-white/80 sm:mt-4 sm:text-base md:text-lg">
              {description}
            </p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  )
}
