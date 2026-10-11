import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from './locales/en.json'
import ar from './locales/ar.json'
import ckb from './locales/ckb.json'

export const supportedLocales = [
  { code: 'en', label: 'English', short: 'EN', dir: 'ltr' },
  { code: 'ar', label: 'العربية', short: 'AR', dir: 'rtl' },
  { code: 'ckb', label: 'کوردی', short: 'KU', dir: 'rtl' },
]

function applyDocumentLocale(lng) {
  const locale = supportedLocales.find((l) => l.code === lng) || supportedLocales[0]
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
      lookupLocalStorage: 'gashtvan-lang',
    },
  })

applyDocumentLocale(i18n.resolvedLanguage || 'en')
i18n.on('languageChanged', applyDocumentLocale)

export default i18n
