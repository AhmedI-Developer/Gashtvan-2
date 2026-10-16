/**
 * Faint network lines behind the bento grid.
 * Primary path draws on scroll via ScrollTrigger in Services.jsx.
 */
export default function ServicesBackgroundLine({ pathRef }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full text-[var(--border)] opacity-30"
      viewBox="0 0 1280 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <path
        d="M 80 40 L 220 120 L 180 260 L 340 300 L 420 160 L 560 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M 700 80 L 860 140 L 820 280 L 980 340 L 1100 200 L 1240 260"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        ref={pathRef}
        d="M -20 420 C 200 360, 360 520, 560 440 S 880 300, 1080 420 S 1260 560, 1340 500"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        pathLength={1}
        style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
      />
      <circle cx="220" cy="120" r="2.5" fill="currentColor" opacity="0.8" />
      <circle cx="560" cy="200" r="2.5" fill="currentColor" opacity="0.8" />
      <circle cx="860" cy="140" r="2.5" fill="currentColor" opacity="0.7" />
      <circle cx="1100" cy="200" r="2.5" fill="currentColor" opacity="0.7" />
    </svg>
  )
}
