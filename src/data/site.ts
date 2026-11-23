/**
 * Single source of truth for brand, contact, hours and navigation.
 * Edit here — never in components.
 */

export interface NavItem {
  label: string
  href: string
}

export interface OpeningHour {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'
  closed?: boolean
  open?: string
  close?: string
}

export const site = {
  name: 'Locale',
  fullName: 'Locale Lagos',
  handle: '@locale.lagos',
  pronunciation: 'Low-Kal',
  tagline: 'Where #GlobalMeetsLocal',
  description:
    'A modern Afro-Bohemian dining room in Victoria Island, Lagos. Lagos street-food culture alongside international comfort dishes.',
  area: 'Victoria Island, Lagos',
  priceRange: '₦₦',
  timezone: 'Africa/Lagos',
  url: 'https://localelagos.vercel.app', // [EDIT] replace with the live domain before launch
  heroVideo: {
    src: '/video/hero.mp4',
    available: true,
  },
} as const

export const navigation: NavItem[] = [
  { label: 'About', href: '/about' },
  { label: 'Menu', href: '/menu' },
  { label: 'Offers', href: '/offers' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
]

export const contact = {
  address: '2 Saka Jojo Street, Victoria Island, Lagos 101241, Nigeria',
  addressLines: ['2 Saka Jojo Street', 'Victoria Island, Lagos 101241', 'Nigeria'],
  mapsQuery: '2 Saka Jojo Street, Victoria Island, Lagos 101241, Nigeria',
  phoneDisplay: '+234 803 527 1497',
  phoneHref: 'tel:+2348035271497',
  whatsappNumber: '2349030009758',
  reservationMessage: "Hello Locale, I'd like to reserve a table for ___ on ___ at ___.",
  privateDiningMessage: "Hello Locale, I'd like to enquire about private dining for ___ guests on ___.",
  instagram: 'https://www.instagram.com/locale.lagos/',
  linktree: 'https://linktr.ee/localelagos',
} as const

export const openingHours: OpeningHour[] = [
  { day: 'Monday', closed: true },
  { day: 'Tuesday', open: '12:00', close: '23:00' },
  { day: 'Wednesday', open: '12:00', close: '23:00' },
  { day: 'Thursday', open: '12:00', close: '23:00' },
  { day: 'Friday', open: '12:00', close: '23:00' },
  { day: 'Saturday', open: '12:00', close: '23:00' },
  { day: 'Sunday', open: '12:00', close: '23:00' },
]

export const amenities = [
  'Dine-in — indoor, courtyard and private dining',
  'Takeout',
  'Bar seating',
  'Shisha lounge',
  'Walk-ins welcome',
] as const

export const reservationPolicy = {
  walkIns: 'Walk-ins welcome for casual lunches and weeknights.',
  advance:
    'Advance reservations recommended for courtyard tables, private dining groups and weekend evenings.',
} as const

export const valueProps = [
  {
    title: 'Easy on the pocket',
    body: 'Most meals land between ₦20,000 and ₦30,000 per head. Good food, no performance.',
  },
  {
    title: 'Four ways to sit',
    body: 'Main dining room, bar counter, leafy courtyard and a private room for your own people.',
  },
  {
    title: 'Plants welcome',
    body: 'Vegetarian and vegan options on the menu, not as an afterthought.',
  },
  {
    title: 'Happy Hour',
    body: 'Unlimited cocktails and loaded fries, Tuesday to Thursday. See you there.',
  },
] as const
