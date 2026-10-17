import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import i18n, { LANG_STORAGE_KEY, setAdminLocaleLock } from '@/i18n'

/**
 * Admin is always English + LTR, regardless of the public site language.
 * Restores the visitor language preference when leaving /admin.
 */
export default function AdminLocaleLock() {
  useEffect(() => {
    const previousLng = i18n.language
    const storedPreference = localStorage.getItem(LANG_STORAGE_KEY)

    setAdminLocaleLock(true)

    void i18n.changeLanguage('en').then(() => {
      // changeLanguage writes the detector cache — put the public preference back
      if (storedPreference) localStorage.setItem(LANG_STORAGE_KEY, storedPreference)
      else localStorage.removeItem(LANG_STORAGE_KEY)
      setAdminLocaleLock(true)
    })

    return () => {
      setAdminLocaleLock(false)
      const restore = storedPreference || previousLng || 'en'
      void i18n.changeLanguage(restore).then(() => {
        if (storedPreference) localStorage.setItem(LANG_STORAGE_KEY, storedPreference)
        else localStorage.removeItem(LANG_STORAGE_KEY)
      })
    }
  }, [])

  return (
    <div lang="en" dir="ltr" className="min-h-svh">
      <Outlet />
    </div>
  )
}
