/** Central site configuration — edit contact & brand microcopy here only. */
export const site = {
  name: 'Gashtvan',
  legalName: 'Gashtvan Travel & Tourism',
  tagline: 'Elevating Travel Experiences Beyond Boundaries',
  ctaBanner: 'Your extraordinary adventure awaits!',
  region: 'Erbil, Kurdistan Region, Iraq',
  url: 'https://gashtvan-travel.com',
  whatsapp: '+9647501234567',
  phones: ['+964 750 123 4567', '+964 770 987 6543'],
  emails: ['info@gashtvan-travel.com', 'sales@gashtvan-travel.com'],
  address:
    '5th Floor, Empire Business Tower, 100m Road, Erbil, Kurdistan Region, Iraq',
  hours: 'Sat–Thu, 9:00 AM – 6:00 PM',
  mapsUrl: 'https://maps.app.goo.gl/PMConNsqqukvrXaG8',
  location: {
    lat: 36.194421,
    lng: 43.9685105,
    label: 'Gashtvan Travel Agency',
  },
  social: {
    facebook: 'https://www.facebook.com/gashtvan.travel',
    instagram: 'https://www.instagram.com/gashtvan.travel',
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
    { key: 'home', href: '/#home' },
    { key: 'services', href: '/#services' },
    { key: 'offers', href: '/offers' },
    { key: 'news', href: '/#news' },
    { key: 'contact', href: '/contact' },
    {
      key: 'about',
      children: [
        { key: 'visionMission', href: '/vision' },
        { key: 'team', href: '/#team' },
        { key: 'companyProfile', href: '/company' },
      ],
    },
  ],
}

/** Laravel API base. In dev, Vite proxies `/api` to the backend. */
export const apiBase = import.meta.env.VITE_API_URL || '/api'
