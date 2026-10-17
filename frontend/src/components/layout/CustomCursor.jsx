import { useEffect, useState, useSyncExternalStore } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

function subscribeFinePointer(onStoreChange) {
  const mq = window.matchMedia('(pointer: fine)')
  mq.addEventListener('change', onStoreChange)
  return () => mq.removeEventListener('change', onStoreChange)
}

function getFinePointerSnapshot() {
  return window.matchMedia('(pointer: fine)').matches
}

function getFinePointerServerSnapshot() {
  return false
}

export default function CustomCursor() {
  const reduced = useReducedMotion()
  const finePointer = useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerSnapshot,
    getFinePointerServerSnapshot,
  )
  const enabled = finePointer && !reduced
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (!enabled) return undefined
    const move = (e) => setPos({ x: e.clientX, y: e.clientY })
    const over = (e) => {
      const t = e.target
      const interactive = t.closest('a, button, [role="button"], input, textarea')
      setActive(Boolean(interactive))
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerover', over)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      className={`cursor-dot ${active ? 'is-active' : ''}`}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)` }}
      aria-hidden="true"
    />
  )
}
