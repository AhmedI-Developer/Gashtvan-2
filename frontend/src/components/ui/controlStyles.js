import { cn } from '@/lib/cn'

/** Shared glossy header control styles (lang + theme). */
export function headerControlClass({ tone = 'default', isDark = true, className }) {
  const onHeroDark = tone === 'hero-dark'

  if (onHeroDark || isDark) {
    return cn(
      'border-white/20 bg-white/10 text-white backdrop-blur-xl',
      'shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]',
      'hover:border-[var(--accent)] hover:bg-white/16',
      className,
    )
  }

  // Light theme: frosted glass, not solid white
  return cn(
    'border-[rgba(4,32,58,0.14)] bg-[rgba(255,255,255,0.42)] text-[var(--navy)] backdrop-blur-xl',
    'shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]',
    'hover:border-[var(--accent)] hover:bg-[rgba(255,255,255,0.58)] hover:shadow-[0_0_0_3px_var(--accent-soft)]',
    className,
  )
}

export function headerMenuClass({ isDark = true, className }) {
  if (isDark) {
    return cn(
      'border-white/15 bg-[rgba(29,40,51,0.82)] text-[var(--text)] backdrop-blur-xl',
      'shadow-[0_12px_40px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.08)]',
      className,
    )
  }

  return cn(
    'border-[rgba(4,32,58,0.12)] bg-[rgba(255,255,255,0.78)] text-[var(--text)] backdrop-blur-xl',
    'shadow-[0_12px_40px_rgba(4,32,58,0.12),inset_0_1px_0_rgba(255,255,255,0.7)]',
    className,
  )
}
