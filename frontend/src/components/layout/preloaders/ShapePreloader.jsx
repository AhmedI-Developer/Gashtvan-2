/**
 * Original brand preloader — green rounded shape leads the logo reveal.
 * Kept as a reusable animation module.
 */
import { motion } from 'framer-motion'
import GreenShape from '@/components/brand/GreenShape'
import Logo from '@/components/brand/Logo'

export default function ShapePreloader({ onSkip, skipLabel = 'Skip' }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--bg)]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button
        type="button"
        onClick={onSkip}
        className="absolute end-5 top-5 text-sm text-[var(--text-muted)] underline-offset-4 hover:text-[var(--accent-text)] hover:underline"
      >
        {skipLabel}
      </button>

      <div className="relative flex h-36 w-[min(16rem,70vw)] items-center justify-center sm:h-40 sm:w-64">
        <motion.div
          initial={{ scale: 0, rotate: 0 }}
          animate={{
            scale: [0, 1.2, 0.7, 0.7],
            rotate: [0, 0, -30, -30],
            x: [0, 0, 0, 90],
            y: [0, 0, 0, -20],
          }}
          transition={{ duration: 1.4, times: [0, 0.25, 0.45, 1], ease: 'easeInOut' }}
          className="absolute"
        >
          <GreenShape size={18} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
          animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
          transition={{ delay: 0.7, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="w-28 sm:w-36"
        >
          <Logo className="w-full" />
        </motion.div>
      </div>

      <svg
        className="mt-6 h-8 w-[min(420px,80vw)] overflow-visible"
        viewBox="0 0 420 32"
        aria-hidden="true"
      >
        <motion.path
          d="M10,22 C80,4 140,30 210,14 C280,-2 340,26 410,10"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.1, duration: 0.9, ease: 'easeInOut' }}
        />
      </svg>
    </motion.div>
  )
}
