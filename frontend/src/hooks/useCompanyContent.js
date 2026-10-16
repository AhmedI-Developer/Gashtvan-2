import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { localizedCompany } from '@/content/localizeCompany'

export function useCompanyContent() {
  const { i18n } = useTranslation()
  return useMemo(() => localizedCompany(i18n.language), [i18n.language])
}
