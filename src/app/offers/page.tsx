import type { Metadata } from 'next'
import { OffersContent } from '@/components/offers/OffersContent'

export const metadata: Metadata = {
  title: 'Offers',
}

export default function OffersPage() {
  return <OffersContent />
}
