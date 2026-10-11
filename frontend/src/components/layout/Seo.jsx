import { Helmet } from 'react-helmet-async'
import { site } from '@/config/site'

export default function Seo({
  title,
  description = `${site.tagline}. Premium travel & tourism in ${site.location}.`,
  path = '/',
  image = '/Gashtvan.svg',
}) {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} | ${site.tagline}`
  const url = `${site.url}${path}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: site.legalName,
    url: site.url,
    logo: `${site.url}/Gashtvan.svg`,
    description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address,
      addressLocality: 'Erbil',
      addressRegion: 'Kurdistan Region',
      addressCountry: 'IQ',
    },
    telephone: site.phones[0],
    email: site.emails[0],
    openingHours: 'Mo-Th,Sa 09:00-18:00',
  }

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  )
}
