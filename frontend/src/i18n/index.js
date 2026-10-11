/**
 * i18n-ready stub.
 * English is the default UI language. Structure is prepared for Arabic / Kurdish (RTL)
 * via document.dir and logical CSS (start/end/ps/pe) already used across the site.
 *
 * When adding locales:
 * 1. Install/configure react-i18next resources (already a dependency)
 * 2. Set document.documentElement.dir = 'rtl' | 'ltr'
 * 3. Move user-facing strings into locale JSON files under src/i18n/locales/
 */

export const supportedLocales = [
  { code: 'en', label: 'English', dir: 'ltr' },
  { code: 'ar', label: 'العربية', dir: 'rtl' },
  { code: 'ckb', label: 'کوردی', dir: 'rtl' },
]

export default supportedLocales
