import { company } from '@/content/company'
import { companyAr } from '@/content/company.ar'
import { companyCkb } from '@/content/company.ckb'

const packs = { ar: companyAr, ckb: companyCkb }

function locale(lng) {
  const base = (lng || 'en').split('-')[0]
  return base === 'ar' || base === 'ckb' ? base : 'en'
}

export function localizedCompany(lng) {
  const pack = packs[locale(lng)]
  if (!pack) return company

  return {
    profile: {
      ...company.profile,
      eyebrow: pack.profile.eyebrow,
      title: pack.profile.title,
      paragraphs: pack.profile.paragraphs,
      stats: company.profile.stats.map((stat, index) => ({
        ...stat,
        label: pack.profile.stats[index] || stat.label,
      })),
    },
    vision: { ...company.vision, ...pack.vision },
    mission: { ...company.mission, ...pack.mission },
    coreValues: {
      title: pack.coreValues.title,
      items: company.coreValues.items.map((item, index) => ({
        ...item,
        ...pack.coreValues.items[index],
      })),
    },
    services: company.services.map((service) => {
      const copy = pack.services.find((item) => item.id === service.id) || {}
      return {
        ...service,
        title: copy.title || service.title,
        cardTitle: copy.cardTitle || service.cardTitle || copy.title || service.title,
        summary: copy.summary || service.summary,
        body: copy.body || service.body,
      }
    }),
    why: company.why.map((item, index) => ({ ...item, ...pack.why[index] })),
    management: {
      ...company.management,
      eyebrow: pack.management.eyebrow,
      title: pack.management.title,
      paragraphs: pack.management.paragraphs,
      timeline: company.management.timeline.map((item, index) => ({
        ...item,
        title: pack.management.timeline[index]?.title || item.title,
        detail: pack.management.timeline[index]?.detail || item.detail,
      })),
    },
    future: {
      ...company.future,
      eyebrow: pack.future.eyebrow,
      title: pack.future.title,
      body: pack.future.body,
      markers: company.future.markers.map((marker) => ({
        ...marker,
        label:
          pack.future.markers.find((item) => item.id === marker.id)?.label || marker.label,
      })),
    },
  }
}
