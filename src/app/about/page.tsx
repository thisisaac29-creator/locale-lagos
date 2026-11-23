import type { Metadata } from 'next'
import { AboutContent } from '@/components/about/AboutContent'
import { site } from '@/data/site'

export const metadata: Metadata = {
  title: 'About',
  description: `${site.description} Explore the Afro-Bohemian room, its details and the ${site.tagline} food philosophy.`,
}

export default function AboutPage() {
  return <AboutContent />
}
