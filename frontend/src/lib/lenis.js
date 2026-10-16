/** Shared Lenis instance for modal lock / nested scroll. */

let lenis = null

export function setLenisInstance(instance) {
  lenis = instance
}

export function getLenis() {
  return lenis
}

export function stopLenis() {
  lenis?.stop()
}

export function startLenis() {
  lenis?.start()
}
