/**
 * Plane preloader — logo reveal + small plane riding above the green path to the end.
 * Track uses a fixed 420×60 coordinate box scaled to fit, so offset-path matches the SVG on mobile.
 */
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Logo from '@/components/brand/Logo'
import PlaneIcon from './PlaneIcon'

const TRACK_W = 420
const TRACK_H = 60
const FLIGHT_PATH = 'M 8 36 C 90 8, 160 54, 240 28 S 360 8, 412 30'

export default function PlanePreloader({ onSkip, skipLabel = 'Skip' }) {
  const shellRef = useRef(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const shell = shellRef.current
    if (!shell) return

    const update = () => {
      const width = shell.clientWidth
      setScale(width > 0 ? Math.min(1, width / TRACK_W) : 1)
    }

    update()
    const ro = new ResizeObserver(update)
    ro.observe(shell)
    return () => ro.disconnect()
  }, [])

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

      <div className="flex w-full max-w-xl flex-col items-center px-6">
        <motion.div
          className="mb-6 w-28 sm:w-36"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Logo className="w-full" />
        </motion.div>

        <div
          ref={shellRef}
          className="relative w-full max-w-[440px] overflow-visible"
          style={{ height: TRACK_H * scale }}
        >
          <div
            className="absolute left-0 top-0 origin-top-left"
            style={{
              width: TRACK_W,
              height: TRACK_H,
              transform: `scale(${scale})`,
            }}
          >
            <svg
              className="absolute inset-0 h-full w-full overflow-visible"
              viewBox={`0 0 ${TRACK_W} ${TRACK_H}`}
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <motion.path
                d={FLIGHT_PATH}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="7"
                strokeLinecap="round"
                opacity="0.18"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.25, duration: 1.6, ease: 'easeInOut' }}
              />
              <path
                d={FLIGHT_PATH}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="3 9"
                opacity="0.35"
              />
              <motion.path
                d={FLIGHT_PATH}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2.25"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.25, duration: 1.6, ease: 'easeInOut' }}
              />
            </svg>

            <motion.div
              className="absolute left-0 top-0 will-change-transform"
              initial={{ offsetDistance: '0%' }}
              animate={{ offsetDistance: '100%' }}
              transition={{ delay: 0.25, duration: 1.6, ease: 'easeInOut' }}
              style={{
                offsetPath: `path('${FLIGHT_PATH}')`,
                offsetRotate: 'auto',
                offsetAnchor: 'center',
                width: 36,
                height: 22,
                marginLeft: -18,
                marginTop: -11,
              }}
              aria-hidden="true"
            >
              <div style={{ transform: 'translateY(-10px)' }}>
                <PlaneIcon size={36} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
