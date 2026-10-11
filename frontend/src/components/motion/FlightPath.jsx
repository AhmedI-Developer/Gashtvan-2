import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import GreenShape from '@/components/brand/GreenShape'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

export default function FlightPath({
  path = 'M20,120 C160,20 280,220 460,80',
  className = '',
}) {
  const wrap = useRef(null)
  const line = useRef(null)
  const marker = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!wrap.current || !line.current || reduced) return undefined
    const length = line.current.getTotalLength()
    gsap.set(line.current, {
      strokeDasharray: length,
      strokeDashoffset: length,
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrap.current,
        start: 'top 75%',
        end: 'bottom 40%',
        scrub: 1,
      },
    })

    tl.to(line.current, { strokeDashoffset: 0, ease: 'none' }, 0)

    if (marker.current) {
      tl.to(
        marker.current,
        {
          motionPath: {
            path: line.current,
            align: line.current,
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
          },
          ease: 'none',
        },
        0,
      )
    }

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [path, reduced])

  return (
    <div ref={wrap} className={`relative ${className}`} aria-hidden="true">
      <svg viewBox="0 0 480 160" className="h-auto w-full overflow-visible">
        <path
          d={path}
          fill="none"
          stroke="var(--border)"
          strokeWidth="2"
          strokeDasharray="4 8"
          opacity="0.5"
        />
        <path
          ref={line}
          d={path}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      <div ref={marker} className="absolute start-0 top-0">
        <GreenShape size={12} />
      </div>
    </div>
  )
}
