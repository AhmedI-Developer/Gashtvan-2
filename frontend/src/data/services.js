/**
 * Homepage Services — editorial list data.
 *
 * Swap images: edit only `image`, `imageAlt`, and `imageCredit` here.
 * Keep `id` in sync with `company.services` for localized titles/bodies.
 *
 * List size: tune `clamp(...)` on `.services-title` in Services.jsx.
 * Panel size: tune sticky panel classes in ServiceImagePanel.jsx.
 */

function summary(text, maxSentences = 2) {
  const parts = text.match(/[^.!?]+[.!?]+/g) || [text]
  return parts.slice(0, maxSentences).join(' ').trim()
}

const bodies = {
  'air-ticketing':
    'Gashtvan provides professional air ticketing services as an IATA Member, with distribution through Amadeus and proficiency in Galileo and Sabre. As Royal Jordanian Airlines – GSA Kurdistan, the team supports seamless connections through trusted airline partnerships for leisure and business travelers.',
  mice:
    'Gashtvan designs and coordinates MICE programs — meetings, incentives, conferences, and exhibitions — combining venue insight, travel logistics, and on-ground support so corporate and institutional events run with clarity from brief to close.',
  'hospitality-tours':
    'From hotel and lodge reservations to curated tours and transfers, Gashtvan arranges the ground experience around each itinerary — so arrival, movement, and stay feel connected rather than fragmented.',
  corporate:
    'Gashtvan supports corporate travel management with policy-aware booking, multi-GDS capability, and responsive coordination — helping companies move teams efficiently while maintaining service quality and cost visibility.',
  'visa-admissions':
    'Gashtvan assists travelers and students with visa services and academic admissions support, helping prepare documentation pathways and travel timing so study and mobility plans stay on track.',
  training:
    'Gashtvan delivers travel and tourism training with a focus on GDS proficiency — Amadeus, Galileo, and Sabre — preparing professionals with practical skills that mirror real booking and operations workflows.',
}

export const services = [
  {
    id: 'air-ticketing',
    number: '01',
    shortLabel: 'AIR TICKETING',
    title: 'Air Ticketing',
    summary: summary(bodies['air-ticketing']),
    fullText: bodies['air-ticketing'],
    icon: 'Plane',
    image:
      'https://images.unsplash.com/photo-1474302770737-173a5371ce91?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Airplane wing above clouds at sunset',
    imageCredit: 'Unsplash',
  },
  {
    id: 'mice',
    number: '02',
    shortLabel: 'MICE',
    title: 'MICE',
    summary: summary(bodies.mice),
    fullText: bodies.mice,
    icon: 'Users',
    image:
      'https://images.unsplash.com/photo-1519167758481-83f29da8f2f5?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Grand event hall with banquet tables under a high ceiling',
    imageCredit: 'Unsplash',
  },
  {
    id: 'hospitality-tours',
    number: '03',
    shortLabel: 'HOTELS & TOURS',
    title: 'Hotels, Lodge Reservations, Tours & Transfers',
    summary: summary(bodies['hospitality-tours']),
    fullText: bodies['hospitality-tours'],
    icon: 'Hotel',
    image:
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Luxury hotel lobby with warm lighting',
    imageCredit: 'Unsplash',
  },
  {
    id: 'corporate',
    number: '04',
    shortLabel: 'CORPORATE TRAVEL',
    title: 'Corporate Travel Management',
    summary: summary(bodies.corporate),
    fullText: bodies.corporate,
    icon: 'Briefcase',
    image:
      'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Business traveler walking through an airport terminal',
    imageCredit: 'Unsplash',
  },
  {
    id: 'visa-admissions',
    number: '05',
    shortLabel: 'VISA SERVICES',
    title: 'Visa Services & Academic Admissions',
    summary: summary(bodies['visa-admissions']),
    fullText: bodies['visa-admissions'],
    icon: 'FileCheck',
    image:
      'https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Passport, boarding pass, and a globe on a desk',
    imageCredit: 'Unsplash',
  },
  {
    id: 'training',
    number: '06',
    shortLabel: 'TRAINING',
    title: 'Travel & Tourism Training',
    summary: summary(bodies.training),
    fullText: bodies.training,
    icon: 'GraduationCap',
    image:
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Training room with people working at laptops',
    imageCredit: 'Unsplash',
  },
]
