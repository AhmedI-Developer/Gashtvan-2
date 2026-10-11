import { Moon, Sun } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/cn'

export default function ThemeToggle({ tone = 'default' }) {
  const { isDark, toggleTheme } = useTheme()
  const { t } = useTranslation()
  const heroDark = tone === 'hero-dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? t('common.switchLight') : t('common.switchDark')}
      className={cn(
        'inline-flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300',
        heroDark
          ? 'border-white/35 bg-white/12 text-white hover:border-[var(--accent)] hover:bg-white/18'
          : 'border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:border-[var(--accent)] hover:shadow-[0_0_0_3px_var(--accent-soft)]',
      )}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
