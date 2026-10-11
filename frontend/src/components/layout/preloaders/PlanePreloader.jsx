/**
 * Plane preloader — calm fly-in for the large plane,
 * plus a green flight path with a smaller plane riding the line.
 */
import { motion } from 'framer-motion'
import Logo from '@/components/brand/Logo'
import PlaneIcon from './PlaneIcon'

/** Smooth low arc that fits the path container */
const FLIGHT_PATH = 'M 8 36 C 90 8, 160 54, 240 28 S 360 8, 412 30'

export default function PlanePreloader({ onSkip, skipLabel = 'Skip' }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--bg)]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
    >
      <button
        type="button"
        onClick={onSkip}
        className="absolute end-5 top-5 text-sm text-[var(--text-muted)] underline-offset-4 hover:text-[var(--accent-text)] hover:underline"
      >
        {skipLabel}
      </button>

      <div className="flex w-full max-w-lg flex-col items-center px-6">
        {/* Large plane — gentle glide in, then soft hover */}
        <div className="relative mb-2 h-20 w-full sm:h-24">
          <motion.div
            className="absolute inset-x-0 top-1/2 flex justify-center"
            style={{ y: '-50%' }}
            initial={{ x: '-55%', opacity: 0 }}
            animate={{ x: '0%', opacity: 1 }}
            transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{
                delay: 1.15,
                duration: 2.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <PlaneIcon size={110} className="max-w-[42vw]" />
            </motion.div>
          </motion.div>
        </div>

        {/* Logo reveal */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-28 sm:w-36"
        >
          <Logo className="w-full" />
        </motion.div>

        {/* Green flight path + small plane on the line */}
        <div className="relative mt-8 h-14 w-full max-w-[440px]">
          <svg
            className="absolute inset-0 h-full w-full overflow-visible"
            viewBox="0 0 420 60"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* Soft glow under the route */}
            <motion.path
              d={FLIGHT_PATH}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="7"
              strokeLinecap="round"
              opacity="0.18"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.85, duration: 1.15, ease: 'easeInOut' }}
            />
            {/* Dashed guide */}
            <path
              d={FLIGHT_PATH}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="3 9"
              opacity="0.35"
            />
            {/* Solid drawn route */}
            <motion.path
              d={FLIGHT_PATH}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2.25"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.85, duration: 1.15, ease: 'easeInOut' }}
            />
          </svg>

          <motion.div
            className="absolute left-0 top-0 will-change-transform"
            initial={{ offsetDistance: '0%' }}
            animate={{ offsetDistance: '100%' }}
            transition={{ delay: 0.85, duration: 1.15, ease: 'easeInOut' }}
            style={{
              offsetPath: `path('${FLIGHT_PATH}')`,
              offsetRotate: 'auto',
              offsetAnchor: 'center',
              width: 34,
              height: 20,
              marginLeft: -17,
              marginTop: -10,
            }}
            aria-hidden="true"
          >
            <PlaneIcon size={34} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
