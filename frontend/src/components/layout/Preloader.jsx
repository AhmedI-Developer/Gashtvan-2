import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import ShapePreloader from './preloaders/ShapePreloader'
import PlanePreloader from './preloaders/PlanePreloader'

const SESSION_KEY = 'gashtvan-preloader-seen'
/** Active intro: plane variant. ShapePreloader kept in ./preloaders for reuse. */
const ACTIVE_VARIANT = 'plane'

function shouldShowPreloader() {
  try {
    return !sessionStorage.getItem(SESSION_KEY)
  } catch {
    return true
  }
}

export default function Preloader() {
  const { t } = useTranslation()
  const reduced = useReducedMotion()
  const [show, setShow] = useState(shouldShowPreloader)

  const dismiss = () => {
    setShow(false)
    try {
      sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      /* ignore */
    }
  }

  useEffect(() => {
    if (!show) return undefined
    const max = window.setTimeout(dismiss, reduced ? 400 : 2600)
    return () => window.clearTimeout(max)
  }, [show, reduced])

  const skipLabel = t('common.skip')
  const Variant = ACTIVE_VARIANT === 'plane' ? PlanePreloader : ShapePreloader

  return (
    <AnimatePresence>
      {show ? <Variant onSkip={dismiss} skipLabel={skipLabel} /> : null}
    </AnimatePresence>
  )
}
