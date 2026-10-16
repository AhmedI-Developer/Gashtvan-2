/**
 * Straight vertical route.
 * viewBox: 0 0 200 1400
 */
export const STRAIGHT_ROUTE_D = 'M 100 10 L 100 1390'

export default function VerticalRoute({ className, pathRef, trackRef }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 1400"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        ref={trackRef}
        d={STRAIGHT_ROUTE_D}
        fill="none"
        stroke="var(--text)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="2 12"
        opacity="0.22"
      />
      <path
        ref={pathRef}
        d={STRAIGHT_ROUTE_D}
        fill="none"
        stroke="var(--text)"
        strokeWidth="7"
        strokeLinecap="round"
        pathLength={1}
        style={{
          strokeDasharray: 1,
          strokeDashoffset: 1,
          filter: 'drop-shadow(0 0 10px color-mix(in srgb, var(--text) 35%, transparent))',
        }}
      />
    </svg>
  )
}
