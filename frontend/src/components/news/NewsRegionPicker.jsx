import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Check, ChevronDown, Globe2, Landmark, MapPinned, X } from 'lucide-react'
import { cn } from '@/lib/cn'

const REGION_ICONS = {
  Kurdistan: MapPinned,
  'Middle East': Globe2,
  Europe: Landmark,
}

export default function NewsRegionPicker({
  regions,
  value,
  onChange,
  disabled = false,
}) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const triggerRef = useRef(null)
  const titleId = useId()
  const Icon = REGION_ICONS[value] || Globe2

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const select = (region) => {
    onChange(region)
    setOpen(false)
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className={cn(
          'inline-flex min-h-12 min-w-[14rem] items-center justify-between gap-3 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-start shadow-[var(--shadow)] transition',
          'hover:border-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]',
          disabled && 'cursor-not-allowed opacity-60',
        )}
      >
        <span className="flex min-w-0 items-center gap-2.5">
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/15 text-[var(--accent-text)]">
            <Icon size={16} strokeWidth={2.25} />
          </span>
          <span className="min-w-0">
            <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
              {t('news.regionPickerLabel')}
            </span>
            <span className="block truncate text-sm font-semibold text-[var(--text)]">
              {t(`news.regions.${value}`)}
            </span>
          </span>
        </span>
        <ChevronDown
          size={18}
          className={cn(
            'shrink-0 text-[var(--text-muted)] transition',
            open && 'rotate-180 text-[var(--accent-text)]',
          )}
        />
      </button>

      {typeof document !== 'undefined'
        ? createPortal(
            <AnimatePresence>
              {open ? (
                <motion.div
                  className="fixed inset-0 z-[90] flex items-end justify-center p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:items-center sm:p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <button
                    type="button"
                    aria-label={t('common.close')}
                    className="absolute inset-0 bg-[var(--overlay)]"
                    onClick={() => setOpen(false)}
                  />
                  <motion.div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={titleId}
                    initial={{ opacity: 0, y: 28, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 16, scale: 0.98 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10 w-full max-w-md overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-5 text-[var(--text)] shadow-[var(--shadow)] sm:p-6"
                  >
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div>
                        <p
                          id={titleId}
                          className="font-display text-xl font-bold tracking-tight"
                        >
                          {t('news.regionPickerTitle')}
                        </p>
                        <p className="mt-1 text-sm text-[var(--text-muted)]">
                          {t('news.regionPickerLead')}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        aria-label={t('common.close')}
                        className="rounded-full border border-[var(--border)] p-2 transition hover:border-[var(--accent)]"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <ul className="space-y-2" role="listbox" aria-label={t('news.regionsLabel')}>
                      {regions.map((region) => {
                        const RegionIcon = REGION_ICONS[region] || Globe2
                        const selected = region === value
                        return (
                          <li key={region}>
                            <button
                              type="button"
                              role="option"
                              aria-selected={selected}
                              onClick={() => select(region)}
                              className={cn(
                                'flex w-full items-center gap-3 rounded-[20px] border px-3.5 py-3.5 text-start transition',
                                selected
                                  ? 'border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_14%,transparent)]'
                                  : 'border-[var(--border)] bg-[var(--bg)] hover:border-[var(--accent)]',
                              )}
                            >
                              <span
                                className={cn(
                                  'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl',
                                  selected
                                    ? 'bg-[var(--accent)] text-[var(--navy)]'
                                    : 'bg-[var(--surface-2)] text-[var(--text)]',
                                )}
                              >
                                <RegionIcon size={20} strokeWidth={2} />
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block font-display text-base font-semibold">
                                  {t(`news.regions.${region}`)}
                                </span>
                                <span className="mt-0.5 block text-sm text-[var(--text-muted)]">
                                  {t(`news.regionHints.${region}`)}
                                </span>
                              </span>
                              {selected ? (
                                <Check
                                  size={18}
                                  className="shrink-0 text-[var(--accent-text)]"
                                  strokeWidth={2.5}
                                />
                              ) : null}
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  )
}
