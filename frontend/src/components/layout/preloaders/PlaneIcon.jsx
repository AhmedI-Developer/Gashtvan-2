import { cn } from '@/lib/cn'

/**
 * Uses /public/plane.png, recolored to brand accent green via CSS mask.
 */
export default function PlaneIcon({ size = 64, className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={cn('inline-block', className)}
      style={{
        width: size,
        maxWidth: '100%',
        aspectRatio: '2 / 1',
        backgroundColor: 'var(--accent)',
        WebkitMaskImage: 'url(/plane.png)',
        maskImage: 'url(/plane.png)',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        filter: 'drop-shadow(0 4px 14px rgba(160, 194, 58, 0.45))',
      }}
    />
  )
}
