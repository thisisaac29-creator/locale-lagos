'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { BLUR_DATA_URL } from '@/lib/format'

const chapters = [
  {
    id: 'the-plate',
    label: 'The plate',
    words: 'Lagos street food meets global comfort. Same table, different stories.',
    image: '/images/food/image-29.webp',
    alt: 'Dining, food and details at Locale Lagos',
  },
  {
    id: 'the-room',
    label: 'The room',
    words: 'Rattan. Wicker. Woven light. Graphic walls. A room that feels like an exhale.',
    image: '/images/about/image-04.webp',
    alt: 'Dining, food and details at Locale Lagos',
  },
  {
    id: 'the-courtyard',
    label: 'The courtyard',
    words: 'Greenery, open sky and a table worth staying at.',
    image: '/images/courtyard/image-19.webp',
    alt: 'Dining, food and details at Locale Lagos',
  },
]

export function BrandStatement() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)').matches) return
    let cancelled = false
    let dispose: (() => void) | undefined
    void Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{default: gsap}, {ScrollTrigger}]) => {
      if (cancelled) return

    if (!root.current) return
    gsap.registerPlugin(ScrollTrigger)
    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const section = root.current
      if (!section) return
      const panels = gsap.utils.toArray<HTMLElement>('[data-chapter]', section)
      const groups = panels.map((panel) => panel.querySelectorAll('[data-word]'))
      gsap.set(panels.slice(1), { autoAlpha: 0, yPercent: 6 })
      gsap.set(groups.map((group) => group[0]).filter(Boolean), { color: 'rgba(36,28,23,0.28)' })

      const tl = gsap.timeline({ defaults: { ease: 'none' } })
      tl.to(groups[0], { color: '#241c17', stagger: 0.08, duration: 0.6 }, 0)
        .to(panels[0], { autoAlpha: 0, yPercent: -6, duration: 0.45 }, 0.85)
        .to(panels[1], { autoAlpha: 1, yPercent: 0, duration: 0.45 }, 0.9)
        .to(groups[1], { color: '#241c17', stagger: 0.08, duration: 0.6 }, 1.05)
        .to(panels[1], { autoAlpha: 0, yPercent: -6, duration: 0.45 }, 1.85)
        .to(panels[2], { autoAlpha: 1, yPercent: 0, duration: 0.45 }, 1.9)
        .to(groups[2], { color: '#241c17', stagger: 0.08, duration: 0.6 }, 2.05)

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=100%',
        pin: true,
        scrub: 1,
        animation: tl,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      })
    })

    dispose = () => mm.revert()
  
    })
    return () => { cancelled = true; dispose?.() }
  }, [])

  return (
    <section ref={root} className="relative bg-cream py-24 motion-safe:lg:flex motion-safe:lg:min-h-screen motion-safe:lg:items-center motion-safe:lg:overflow-hidden motion-safe:lg:py-0" aria-labelledby="brand-heading">
      <h2 id="brand-heading" className="sr-only">
        The idea behind Locale
      </h2>
      <div className="frame relative motion-safe:lg:h-[76vh]">
        {chapters.map((chapter, index) => (
          <article
            key={chapter.id}
            data-chapter
            className="mb-20 grid items-center gap-10 last:mb-0 motion-safe:lg:absolute motion-safe:lg:inset-y-0 motion-safe:lg:left-[var(--frame)] motion-safe:lg:right-[var(--frame)] motion-safe:lg:mb-0 lg:grid-cols-12 lg:gap-12"
          >
            <div className="lg:col-span-7">
              <p className="label mb-7 text-terracotta">{chapter.label}</p>
              <p
                className={`display max-w-[26ch] text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.08] text-ink lg:motion-safe:text-[rgba(36,28,23,0.28)]`}
              >
                {chapter.words.split(' ').map((word, wordIndex) => (
                  <span key={`${word}-${wordIndex}`} data-word className="mr-[0.24em] inline-block">
                    {word}
                  </span>
                ))}
              </p>
              <p className="mt-8 max-w-[40ch] text-base text-umber">
                {index === 0
                  ? 'International dishes with a Lagos accent. Street-food energy, dining-room comfort.'
                  : index === 1
                    ? 'The details are borrowed from the room itself: natural texture, pattern and warm light.'
                    : 'Step outside. Stay a while.'}
              </p>
            </div>
            <div className="relative lg:col-span-5">
              <div className="arch relative aspect-[4/5] w-full overflow-hidden bg-sand">
                <Image
                  src={chapter.image}
                  alt={chapter.alt}
                  fill
                  sizes="(max-width: 1024px) 92vw, 40vw"
                  placeholder={chapter.image.endsWith('.svg') ? undefined : 'blur'}
                  blurDataURL={BLUR_DATA_URL}
                  unoptimized={chapter.image.endsWith('.svg')}
                  className="object-cover"
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
