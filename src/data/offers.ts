/** Offers and events. Add a new object here to publish a new promo anywhere it is listed. */

export interface Offer {
  id: string
  label: string
  title: string
  description: string
  details?: string
  price?: number | null
  days?: number[]
  start?: string
  end?: string
  ctaLabel: string
  ctaHref: string
  featured?: boolean
}

export const offers: Offer[] = [
  {
    id: 'happy-hour',
    label: 'Weekday ritual',
    title: 'Happy Hour',
    description: 'Unlimited cocktails and loaded fries.',
    details: 'Tuesday to Thursday · 5:00 PM to 10:00 PM',
    price: 30000,
    days: [2, 3, 4],
    start: '17:00',
    end: '22:00',
    ctaLabel: 'Reserve a table',
    ctaHref: 'https://wa.me/2349030009758?text=Hello%20Locale%2C%20I%27d%20like%20to%20reserve%20a%20table%20for%20___%20on%20___%20at%20___.',
    featured: true,
  },
  {
    id: 'private-dining',
    label: 'Your table, your people',
    title: 'Private Dining',
    description: 'A room of your own for the night.',
    details: 'Advance reservations recommended for private dining groups.',
    ctaLabel: 'Enquire on WhatsApp',
    ctaHref: 'https://wa.me/2349030009758?text=Hello%20Locale%2C%20I%27d%20like%20to%20enquire%20about%20private%20dining%20for%20___%20guests%20on%20___.',
  },
]
