import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from './locales/en.json'
import ar from './locales/ar.json'
import ckb from './locales/ckb.json'

export const LANG_STORAGE_KEY = 'gashtvan-lang'

export const supportedLocales = [
  { code: 'en', label: 'English', short: 'EN', dir: 'ltr' },
  { code: 'ar', label: 'العربية', short: 'AR', dir: 'rtl' },
  { code: 'ckb', label: 'کوردی', short: 'KU', dir: 'rtl' },
]

/** When true, document stays English LTR (admin panel). */
let adminLocaleLocked = false

export function setAdminLocaleLock(locked) {
  adminLocaleLocked = Boolean(locked)
  if (adminLocaleLocked) {
    document.documentElement.lang = 'en'
    document.documentElement.dir = 'ltr'
    return
  }
  applyDocumentLocale(i18n.resolvedLanguage || i18n.language || 'en')
}

function resolveLocale(lng) {
  const base = String(lng || 'en').split('-')[0]
  return supportedLocales.find((l) => l.code === base) || supportedLocales[0]
}

function applyDocumentLocale(lng) {
  if (adminLocaleLocked || window.location.pathname.startsWith('/admin')) {
    document.documentElement.lang = 'en'
    document.documentElement.dir = 'ltr'
    return
  }
  const locale = resolveLocale(lng)
  document.documentElement.lang = locale.code
  document.documentElement.dir = locale.dir
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
      ckb: { translation: ckb },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'ar', 'ckb'],
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: LANG_STORAGE_KEY,
    },
  })

applyDocumentLocale(i18n.resolvedLanguage || 'en')
i18n.on('languageChanged', applyDocumentLocale)

export default i18n
