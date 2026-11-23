import { Hero } from '@/components/home/Hero'
import { BrandStatement } from '@/components/home/BrandStatement'
import { TileDivider } from '@/components/ui/TileDivider'
import { SeatingZones } from '@/components/home/SeatingZones'
import { SignatureDishes } from '@/components/home/SignatureDishes'
import { HappyHourFeature } from '@/components/home/HappyHourFeature'
import { GalleryTeaser } from '@/components/home/GalleryTeaser'
import { VisitUs } from '@/components/home/VisitUs'

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandStatement />
      <TileDivider />
      <SeatingZones />
      <SignatureDishes />
      <HappyHourFeature />
      <TileDivider />
      <GalleryTeaser />
      <VisitUs />
    </>
  )
}
