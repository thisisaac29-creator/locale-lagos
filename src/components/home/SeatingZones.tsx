'use client'

import Image from 'next/image'
import { Pattern } from '@/components/patterns/Patterns'
import { useEffect, useRef } from 'react'
import { ArchImage } from '@/components/ui/ArchImage'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { seatingZones } from '@/data/seating'

export function SeatingZones() {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)').matches) return
    let cancelled = false
    let dispose: (() => void) | undefined
    void Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{default: gsap}, {ScrollTrigger}]) => {
      if (cancelled) return

    if (!root.current || !track.current) return
    gsap.registerPlugin(ScrollTrigger)
    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const distance = () => Math.max(0, (track.current?.scrollWidth ?? 0) - window.innerWidth)
      const tween = gsap.to(track.current, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })
      return () => tween.kill()
    })

    dispose = () => mm.revert()
  
    })
    return () => { cancelled = true; dispose?.() }
  }, [])

  return (
    <section
      ref={root}
      className="section-space bg-paper lg:flex lg:min-h-screen lg:flex-col lg:justify-center lg:py-20"
      aria-labelledby="seating-heading"
    >
      <div className="frame">
        <SectionHeading
          id="seating-heading"
          label="Four ways to sit"
          title="Pick your corner."
          copy="A dining room, a bar counter, a leafy courtyard and a private room. Same kitchen, different mood."
        />
      </div>

      <div className="mt-12 w-full overflow-hidden lg:mt-16">
      <div ref={track} tabIndex={0} role="region" aria-label="Four seating spaces" className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--frame)] pb-6 lg:snap-none lg:pb-0">
        {seatingZones.map((zone) => (
          <article
            key={zone.id}
            className="group w-[82vw] shrink-0 snap-center sm:w-[62vw] lg:w-[40vw] xl:w-[34vw]"
            aria-labelledby={`zone-${zone.id}`}
          >
            {zone.image ? <ArchImage
              src={zone.image}
              alt={zone.alt}
              width={800}
              height={1000}
              vector={zone.image.endsWith('.svg')}
              sizes="(max-width: 640px) 82vw, 45vw"
              className="aspect-[3/2] w-full"
              imageClassName="transition-transform duration-[1200ms] ease-silky group-hover:scale-[1.05]"
            /> : <div className="arch relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-umber text-paper"><Pattern kind="weave" opacity={.18}/><p className="absolute px-8 text-center font-serif text-4xl">A table of your own.</p></div>}
            {zone.additionalPhotos && (
              <div className="mt-3 grid grid-cols-2 gap-3">
                {zone.additionalPhotos.map((photo) => (
                  <div key={photo.src} className="relative aspect-[4/5] overflow-hidden bg-sand">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 639px) 40vw, (max-width: 1023px) 30vw, (max-width: 1279px) 20vw, 17vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="mt-6 flex items-baseline justify-between gap-4">
              <h3 id={`zone-${zone.id}`} className="display text-[clamp(2rem,3.4vw,3.4rem)]">
                {zone.name}
              </h3>
              <span className="label hidden shrink-0 text-umber/80 sm:block">Locale</span>
            </div>
            <p className="mt-2 max-w-[38ch] text-sm leading-relaxed text-umber sm:text-base">{zone.description}</p>
          </article>
        ))}
      </div>
      </div>

      <p className="frame mt-8 text-[13px] text-umber/80 lg:block">Keep scrolling to explore the room →</p>
    </section>
  )
}
