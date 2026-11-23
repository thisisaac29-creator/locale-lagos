import { contact, openingHours, site } from '@/data/site'

export function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: site.fullName,
    description: site.description,
    servesCuisine: ['Afro-Bohemian', 'Nigerian', 'International comfort food'],
    priceRange: site.priceRange,
    telephone: contact.phoneDisplay,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '2 Saka Jojo Street',
      addressLocality: 'Victoria Island, Lagos',
      postalCode: '101241',
      addressCountry: 'NG',
    },
    openingHoursSpecification: openingHours.map((hour) =>
      hour.closed
        ? { dayOfWeek: `https://schema.org/${hour.day}`, opens: '00:00', closes: '00:00' }
        : {
            dayOfWeek: `https://schema.org/${hour.day}`,
            opens: hour.open,
            closes: hour.close,
          },
    ),
    sameAs: [contact.instagram, contact.linktree],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
