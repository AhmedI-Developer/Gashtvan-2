import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'

const base =
  'inline-flex items-center justify-center gap-2 min-h-12 px-6 rounded-[22px] font-semibold transition-all duration-300 will-change-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]'

const variants = {
  primary:
    'bg-[var(--accent)] text-[var(--navy)] hover:bg-[var(--accent-hover)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(160,194,58,0.35)]',
  secondary:
    'border border-[var(--border)] text-[var(--text)] bg-transparent hover:bg-[var(--accent)] hover:text-[var(--navy)] hover:border-[var(--accent)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(160,194,58,0.35)]',
  ghost:
    'border border-white/40 text-white bg-transparent hover:bg-[var(--accent)] hover:text-[var(--navy)] hover:border-[var(--accent)] hover:-translate-y-0.5',
}

const Button = forwardRef(function Button(
  {
    as,
    to,
    href,
    variant = 'primary',
    className,
    children,
    type = 'button',
    ...props
  },
  ref,
) {
  const classes = cn(base, variants[variant], className)

  if (to) {
    return (
      <Link ref={ref} to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  if (href || as === 'a') {
    return (
      <a ref={ref} href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button ref={ref} type={type} className={classes} {...props}>
      {children}
    </button>
  )
})

export default Button
