import { Moon, Sun } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/hooks/useTheme'
import { headerControlClass } from './controlStyles'

export default function ThemeToggle({ tone = 'default' }) {
  const { isDark, toggleTheme } = useTheme()
  const { t } = useTranslation()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? t('common.switchLight') : t('common.switchDark')}
      className={headerControlClass({
        tone,
        isDark,
        className:
          'inline-flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300',
      })}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
