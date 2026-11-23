import Image from 'next/image'
import Link from 'next/link'
import { galleryImages } from '@/data/gallery'
import { media } from '@/data/media'
import { BLUR_DATA_URL } from '@/lib/format'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'

const featured = ['image-04','image-23','image-19','drink-pdf-x17'].map(id => galleryImages.find(image => image.id === id)!)

const shapes = [
  'md:col-span-5 md:mt-0',
  'md:col-span-4 md:mt-24',
  'md:col-span-5 md:col-start-2',
  'md:col-span-4 md:mt-16',
]

export function GalleryTeaser() {
  return (
    <section className="section-space bg-paper" aria-labelledby="gallery-teaser-heading">
      <div className="frame">
        <SectionHeading
          id="gallery-teaser-heading"
          label="Inside Locale"
          title="A look around."
          copy="The room, the plates, the courtyard. The full gallery is waiting."
          action={
            <Link href="/gallery" className="inline-flex border-b border-terracotta pb-1 text-sm font-semibold text-terracotta transition-colors hover:text-ink">
              See the full gallery ↗
            </Link>
          }
        />

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-12 md:gap-6">
          {featured.map((image, index) => (
            <Reveal key={image.id} delay={index * 0.07} className={shapes[index]}>
              <div className="relative aspect-[3/4] overflow-hidden bg-sand">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 35vw"
                  placeholder={image.vector ? undefined : 'blur'}
                  blurDataURL={media.find(photo=>photo.src === image.src)?.blurDataURL ?? BLUR_DATA_URL}
                  unoptimized={image.vector}
                  className="object-cover transition-transform duration-[1200ms] ease-silky hover:scale-[1.05]"
                />
              </div>
              <p className="mt-3 text-[13px] text-umber/80">{image.caption}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
