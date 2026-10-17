/**
 * Homepage Services — bento grid data.
 *
 * Swap images: edit `image` (card), optional `imageOpen` (modal), `imageAlt`.
 * Keep `id` in sync with `company.services` for localized full titles/bodies.
 *
 * Grid spans: `gridClass` below + `.services-bento` in Services.jsx.
 * Card chrome: `ServiceCard.jsx`. CTA card is rendered in Services.jsx.
 */

import airTicketImage from '@/assets/backgroundImage/services/airTicket.jpg'
import airTicketOpenImage from '@/assets/backgroundImage/services/airTicketOpen.jpg'
import miceImage from '@/assets/backgroundImage/services/MICE.jpg'
import hotelImage from '@/assets/backgroundImage/services/hotel.jpg'
import corporateImage from '@/assets/backgroundImage/services/corparate.jpg'
import visaImage from '@/assets/backgroundImage/services/visa.jpg'
import teamTrainingImage from '@/assets/backgroundImage/services/teamTraining.jpg'

const bodies = {
  'air-ticketing':
    'Gashtvan provides professional air ticketing services as an IATA Member, with distribution through Amadeus and proficiency in Galileo and Sabre. As Royal Jordanian Airlines – GSA Kurdistan, the team supports seamless connections through trusted airline partnerships for leisure and business travelers.',
  mice:
    'Gashtvan designs and coordinates MICE programs — meetings, incentives, conferences, and exhibitions — combining venue insight, travel logistics, and on-ground support so corporate and institutional events run with clarity from brief to close.',
  'hospitality-tours':
    'From hotel and lodge reservations to curated tours, car rental, and transfers, Gashtvan arranges the ground experience around each itinerary — so arrival, movement, and stay feel connected rather than fragmented.',
  corporate:
    'Gashtvan supports corporate travel management with policy-aware booking, multi-GDS capability, and responsive coordination — helping companies move teams efficiently while maintaining service quality and cost visibility.',
  'visa-admissions':
    'Gashtvan assists travelers and students with visa services and academic admissions support, helping prepare documentation pathways and travel timing so study and mobility plans stay on track.',
  training:
    'Gashtvan delivers travel and tourism training with a focus on GDS proficiency — Amadeus, Galileo, and Sabre — preparing professionals with practical skills that mirror real booking and operations workflows.',
}

/**
 * Desktop (lg): 12 cols × 3 rows
 * Air 5×3 | CTA 2×2 + MICE 5 | Hotels 5 | Corp 2 + Visa 2 + Training 3
 */
export const services = [
  {
    id: 'air-ticketing',
    cardTitle: 'Air Ticketing',
    fullTitle: 'Air Ticketing',
    fullText: bodies['air-ticketing'],
    icon: 'Plane',
    layout: 'photo',
    image: airTicketImage,
    imageOpen: airTicketOpenImage,
    imageAlt: 'Airplane wing and winglet above clouds at sunset',
    gridClass:
      'order-1 col-span-1 min-h-[320px] sm:col-span-2 sm:min-h-[340px] lg:col-span-5 lg:row-span-3 lg:min-h-0',
  },
  {
    id: 'mice',
    cardTitle: 'MICE',
    fullTitle: 'MICE',
    fullText: bodies.mice,
    icon: 'Handshake',
    layout: 'wide',
    image: miceImage,
    imageAlt: 'Conference and events gathering',
    gridClass:
      'order-2 col-span-1 min-h-[160px] sm:col-span-1 sm:min-h-[180px] lg:order-none lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:min-h-0',
  },
  {
    id: 'hospitality-tours',
    cardTitle: 'Hotels, Tours & Car Rental',
    fullTitle: 'Hotels, Lodge Reservations, Tours, Car Rental & Transfers',
    fullText: bodies['hospitality-tours'],
    icon: 'Hotel',
    layout: 'wide',
    image: hotelImage,
    imageAlt: 'Hotel stay and hospitality',
    gridClass:
      'order-3 col-span-1 min-h-[160px] sm:col-span-1 sm:min-h-[180px] lg:order-none lg:col-span-5 lg:col-start-8 lg:row-start-2 lg:min-h-0',
  },
  {
    id: 'corporate',
    cardTitle: 'Corporate Travel',
    fullTitle: 'Corporate Travel Management',
    fullText: bodies.corporate,
    icon: 'Briefcase',
    layout: 'small',
    image: corporateImage,
    imageAlt: 'Corporate travel and business journey',
    gridClass:
      'order-4 col-span-1 min-h-[160px] sm:col-span-1 sm:min-h-[180px] lg:order-none lg:col-span-2 lg:col-start-6 lg:row-start-3 lg:min-h-0',
  },
  {
    id: 'visa-admissions',
    cardTitle: 'Visa Services',
    fullTitle: 'Visa Services & Academic Admissions',
    fullText: bodies['visa-admissions'],
    icon: 'FileCheck',
    layout: 'small',
    image: visaImage,
    imageAlt: 'Visa and travel documents',
    gridClass:
      'order-5 col-span-1 min-h-[160px] sm:col-span-1 sm:min-h-[180px] lg:order-none lg:col-span-2 lg:col-start-8 lg:row-start-3 lg:min-h-0',
  },
  {
    id: 'training',
    cardTitle: 'Training',
    fullTitle: 'Travel & Tourism Training',
    fullText: bodies.training,
    icon: 'GraduationCap',
    layout: 'small',
    image: teamTrainingImage,
    imageAlt: 'Gashtvan team training session around a conference table',
    gridClass:
      'order-6 col-span-1 min-h-[160px] sm:col-span-2 sm:min-h-[180px] lg:order-none lg:col-span-3 lg:col-start-10 lg:row-start-3 lg:min-h-0',
  },
]

/** CTA card grid placement (rendered separately in Services.jsx). */
export const ctaGridClass =
  'order-7 col-span-1 min-h-[200px] sm:order-2 sm:col-span-2 sm:min-h-[200px] lg:order-none lg:col-span-2 lg:col-start-6 lg:row-start-1 lg:row-span-2 lg:min-h-0'
