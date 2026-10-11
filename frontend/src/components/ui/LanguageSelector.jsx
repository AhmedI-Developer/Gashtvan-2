import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react'
import { supportedLocales } from '@/i18n'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/cn'
import { headerControlClass, headerMenuClass } from './controlStyles'

export default function LanguageSelector({ tone = 'default' }) {
  const { i18n, t } = useTranslation()
  const { isDark } = useTheme()
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const current =
    supportedLocales.find((l) => l.code === i18n.resolvedLanguage) ||
    supportedLocales[0]

  useEffect(() => {
    const onDoc = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', onDoc)
    return () => document.removeEventListener('pointerdown', onDoc)
  }, [])

  const setLang = (code) => {
    i18n.changeLanguage(code)
    setOpen(false)
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t('common.language')}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={headerControlClass({
          tone,
          isDark,
          className:
            'inline-flex h-11 min-w-11 items-center justify-center gap-1.5 rounded-full px-2.5 text-sm font-semibold transition-all duration-300',
        })}
      >
        <Globe size={16} />
        <span className="hidden sm:inline">{current.short}</span>
      </button>

      {open ? (
        <ul
          role="listbox"
          aria-label={t('common.language')}
          className={headerMenuClass({
            isDark,
            className:
              'absolute end-0 top-[calc(100%+0.4rem)] z-50 min-w-[10.5rem] overflow-hidden rounded-[18px] py-1',
          })}
        >
          {supportedLocales.map((locale) => (
            <li key={locale.code}>
              <button
                type="button"
                role="option"
                aria-selected={locale.code === current.code}
                onClick={() => setLang(locale.code)}
                className={cn(
                  'flex w-full items-center justify-between gap-3 px-3.5 py-2.5 text-start text-sm transition duration-200',
                  locale.code === current.code
                    ? 'bg-[var(--accent-soft)] font-semibold text-[var(--text)]'
                    : 'text-[var(--text-muted)] hover:bg-[var(--accent-soft)] hover:text-[var(--text)]',
                )}
              >
                <span>{locale.label}</span>
                <span className="text-xs text-[var(--accent-text)]">{locale.short}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
