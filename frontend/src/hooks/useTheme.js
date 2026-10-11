import { useEffect, useState } from 'react'

const KEY = 'gashtvan-theme'

function getInitial() {
  if (typeof document === 'undefined') return 'dark'
  return document.documentElement.getAttribute('data-theme') || 'dark'
}

export function useTheme() {
  const [theme, setThemeState] = useState(getInitial)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem(KEY, theme)
    } catch {
      /* ignore */
    }
  }, [theme])

  const setTheme = (next) => setThemeState(next)
  const toggleTheme = () =>
    setThemeState((t) => (t === 'dark' ? 'light' : 'dark'))

  return { theme, setTheme, toggleTheme, isDark: theme === 'dark' }
}
