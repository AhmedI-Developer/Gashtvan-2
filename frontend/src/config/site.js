/** Central site configuration — edit contact & brand microcopy here only. */
export const site = {
  name: 'Gashtvan',
  legalName: 'Gashtvan Travel & Tourism',
  tagline: 'Elevating Travel Experiences Beyond Boundaries',
  ctaBanner: 'Your extraordinary adventure awaits!',
  location: 'Erbil, Kurdistan Region, Iraq',
  url: 'https://gashtvan-travel.com',
  whatsapp: '+9647501234567',
  phones: ['+964 750 123 4567', '+964 770 987 6543'],
  emails: ['info@gashtvan-travel.com', 'sales@gashtvan-travel.com'],
  address:
    '5th Floor, Empire Business Tower, 100m Road, Erbil, Kurdistan Region, Iraq',
  hours: 'Sat–Thu, 9:00 AM – 6:00 PM',
  social: {
    facebook: 'https://facebook.com/',
    instagram: 'https://instagram.com/',
    linkedin: 'https://linkedin.com/',
    x: 'https://x.com/',
  },
  trustBadges: [
    'IATA Member',
    'Royal Jordanian Airlines – GSA Kurdistan',
    'Amadeus GDS Distributor',
    'Galileo Proficiency',
    'Sabre Proficiency',
  ],
  heroStats: [
    { label: '12+ Years', value: 12, suffix: '+' },
    { label: 'IATA Member', value: null },
    { label: 'Top 5 in Kurdistan', value: 5, prefix: 'Top ' },
    { label: '24/7 Support', value: 24, suffix: '/7' },
  ],
  nav: [
    { label: 'Home', href: '/#home' },
    { label: 'About', href: '/#about' },
    { label: 'Services', href: '/#services' },
    { label: 'Offers', href: '/offers' },
    { label: 'Team', href: '/#team' },
    { label: 'Contact', href: '/#contact' },
  ],
}

export const apiUrl = import.meta.env.VITE_API_URL || ''
