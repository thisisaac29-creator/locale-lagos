'use client'

import { PatternBand } from '@/components/patterns/Patterns'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { ArrowLink } from '@/components/motion/ArrowLink'
import { Reveal } from '@/components/motion/Reveal'
import { ArchImage } from '@/components/ui/ArchImage'
import { OpenNowBadge } from '@/components/ui/OpenNowBadge'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { contact, reservationPolicy, site, valueProps } from '@/data/site'
import { useIsTouch, usePrefersReducedMotion } from '@/hooks/useMediaQuery'
import { BLUR_DATA_URL } from '@/lib/format'

const roomChapters = [
  {
    id: 'woven',
    label: 'Woven & warm',
    words: 'Rattan',
    accent: 'and wicker.',
    copy: 'Rattan and wicker furniture, woven lights and soft texture do the talking. Nothing too precious, everything meant to be lived in.',
  },
  {
    id: 'pattern',
    label: 'Pattern underfoot',
    words: 'Black',
    accent: '& white.',
    copy: 'Geometric black-and-white tiles bring a graphic rhythm to the floor — a quiet counterpoint to all that warmth.',
  },
  {
    id: 'green',
    label: 'Pattern & leaf',
    words: 'Bold lines',
    accent: 'new green.',
    copy: 'Bold patterned columns frame the room while lush greenery fills the courtyard. The line between inside and outside blurs.',
  },
] as const

export function AboutContent() {
  const roomRef = useRef<HTMLElement>(null)
  const storiesRef = useRef<HTMLDivElement>(null)
  const touch = useIsTouch()
  const reduced = usePrefersReducedMotion()
  const cinematic = !touch && !reduced

  useEffect(() => {
    if (!window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)').matches) return
    let cancelled = false
    let dispose: (() => void) | undefined
    void Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{default: gsap}, {ScrollTrigger}]) => {
      if (cancelled) return

    const room = roomRef.current
    const stories = storiesRef.current
    if (!cinematic || !room || !stories) return

    gsap.registerPlugin(ScrollTrigger)
    const mm = gsap.matchMedia()

    mm.add(
      '(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
      () => {
        const lines = gsap.utils.toArray<HTMLElement>('[data-room-line]', room)
        if (lines.length < 2) return

        gsap.set(lines.slice(1), { opacity: 0, y: 16 })
        const tl = gsap.timeline({ defaults: { ease: 'none' } })

        lines.slice(1).forEach((line, index) => {
          const at = index + 0.55
          tl.to(lines[index], { opacity: 0, y: -16, duration: 0.45 }, at)
          tl.to(line, { opacity: 1, y: 0, duration: 0.45 }, at + 0.15)
        })

        const trigger = ScrollTrigger.create({
          trigger: stories,
          start: 'top 70%',
          end: 'bottom 80%',
          scrub: 0.7,
          animation: tl,
          invalidateOnRefresh: true,
        })

        return () => {
          trigger.kill()
          tl.kill()
          gsap.set(lines, { clearProps: 'opacity,transform' })
        }
      },
    )

    dispose = () => mm.revert()
  
    })
    return () => { cancelled = true; dispose?.() }
  }, [cinematic])

  return (
    <>
      <section className="overflow-hidden bg-cream pb-20 pt-14 sm:pt-20" aria-labelledby="about-heading">
        <div className="frame">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="label eyebrow-rule text-terracotta">About Locale</p>
            <OpenNowBadge className="text-umber/80" />
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
            <div className="lg:col-span-7">
              <h1 id="about-heading" className="display text-[clamp(4rem,15vw,11rem)]">
                About
                <br />
                <span className="italic text-terracotta">Locale.</span>
              </h1>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 lg:pb-3">
              <p className="label text-umber/80">
                {site.pronunciation} · {site.area}
              </p>
              <p className="mt-5 max-w-[42ch] text-[17px] leading-relaxed text-umber">
                {site.description}
              </p>
              <p className="mt-4 max-w-[30ch] text-sm font-medium text-terracotta">
                {site.tagline}
              </p>
            </div>
          </div>

          <div className="pattern-frame mt-14 grid gap-4 sm:mt-16 sm:grid-cols-[1.4fr_1fr]"><PatternBand kind="tile" className="sm:col-span-2"/>
            <ArchImage
              src="/images/about/image-04.webp"
              alt="Guests painting around a table beneath geometric murals"
              width={800}
              height={1000}
              sizes="(max-width: 640px) 92vw, 45vw"
              className="aspect-[4/5] w-full sm:aspect-[5/4]"
            />
            <div className="arch relative aspect-[4/5] w-full overflow-hidden bg-sand sm:aspect-[5/4]">
              <Image
                src="/images/space/image-15.webp"
                alt="Covered seating facing the patterned bar"
                fill
                sizes="(max-width: 640px) 92vw, 45vw"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                className="object-cover"
              />
            </div>
          </div>
          <p className="mt-3 text-[13px] text-umber/80">
            Around the table at Locale: patterned walls, woven light and shared moments.
          </p>
        </div>
      </section>

      <section className="section-space border-t border-ink/10 bg-paper" aria-labelledby="idea-heading">
        <div className="frame">
          <SectionHeading
            id="idea-heading"
            label="01 / The idea"
            title="A dining room for two cities."
            copy="Locale is a modern Afro-Bohemian dining room in Victoria Island, Lagos. Lagos street-food culture sits alongside international comfort dishes."
          />
          <div className="mt-14 grid gap-8 md:grid-cols-12 md:gap-6">
            <Reveal className="md:col-span-4">
              <p className="label text-terracotta">The short version</p>
            </Reveal>
            <Reveal delay={0.08} className="md:col-span-7 md:col-start-6">
              <p className="display text-[clamp(1.8rem,3.6vw,3.2rem)] leading-[1.12]">
                Familiar enough to settle into. Unexpected enough to remember. One room, one table,{' '}
                <span className="italic text-terracotta">two food stories.</span>
              </p>
              <p className="mt-7 max-w-[52ch] text-[15px] leading-relaxed text-umber/80">
                The welcome is easy, the details considered: warm light, natural texture and plates
                that move between the street and the dining room without losing either point of view.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section
        ref={roomRef}
        className="section-space overflow-hidden bg-umber text-paper"
        aria-labelledby="room-heading"
      >
        <div className="frame">
          <Reveal>
            <p className="label eyebrow-rule mb-5 text-clay">02 / The room</p>
            <h2 id="room-heading" className="display max-w-[18ch] text-[clamp(2.8rem,6vw,5.8rem)]">
              Afro-Bohemian, in the details.
            </h2>
            <p className="mt-6 max-w-[46ch] text-[15px] leading-relaxed text-paper/75">
              Rattan, wicker, woven lights. Geometric black-and-white tiles. Patterned columns
              and lush greenery. The design language is pulled straight from the room.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-6">
              <div className={cinematic ? 'lg:sticky lg:top-24' : ''}>
                <Reveal>
                  <div className="relative">
                    {roomChapters.map((chapter, index) => (
                      <p
                        key={chapter.id}
                        data-room-line
                        className={`display mb-6 text-[clamp(2.8rem,7vw,6rem)] leading-[0.95] ${
                          cinematic ? 'lg:absolute lg:inset-x-0 lg:top-0' : ''
                        } ${cinematic && index > 0 ? 'lg:opacity-0' : ''}`}
                      >
                        {chapter.words} <span className="italic text-clay">{chapter.accent}</span>
                      </p>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>

            <div ref={storiesRef} className="lg:col-span-5 lg:col-start-8">
              {roomChapters.map((chapter) => (
                <Reveal
                  key={chapter.id}
                  className="border-t border-paper/20 py-8 first:border-t-0 first:pt-0 lg:py-14"
                >
                  <p className="label text-clay">{chapter.label}</p>
                  <p className="mt-4 max-w-[38ch] text-[15px] leading-relaxed text-paper/80">
                    {chapter.copy}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
            <Reveal className="lg:col-span-7">
              <ArchImage
                src="/images/courtyard/image-19.webp"
                alt="Games on a table beside the leafy courtyard"
                width={1000}
                height={800}
                  sizes="(max-width: 1024px) 92vw, 55vw"
                className="aspect-[4/3] w-full"
              />
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
              <p className="label text-clay">Inside & outside</p>
              <p className="mt-4 max-w-[34ch] text-[15px] leading-relaxed text-paper/75">
                Greenery softens the edges of the room. Linger a little longer in the courtyard.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-space bg-cream" aria-labelledby="plate-heading">
        <div className="frame">
          <SectionHeading
            id="plate-heading"
            label="03 / The plate"
            title="Two food stories, one table."
            copy="Lagos street-food culture alongside international comfort dishes. That is the whole idea."
          />
          <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-8">
            <Reveal className="lg:col-span-6">
              <p className="display text-[clamp(3rem,8vw,7rem)] leading-[0.94]">
                Where <span className="italic text-terracotta">#GlobalMeetsLocal</span>
              </p>
              <p className="mt-8 max-w-[46ch] text-[15px] leading-relaxed text-umber/80">
                Smoke, spice and the energy of the street meet the comfort of a familiar plate.
                Nothing over-explained — just food that feels at home in Lagos.
              </p>
              <div className="mt-8">
                <ArrowLink href="/menu" variant="line">
                  See the menu
                </ArrowLink>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
              <ArchImage
                src="/images/food/image-53.webp"
                alt="Pork ribs against a geometric wall"
                width={800}
                height={1000}
                sizes="(max-width: 1024px) 92vw, 40vw"
                className="aspect-[4/5] w-full"
              />
              <p className="mt-3 text-[13px] text-umber/80">Pork ribs, photographed at Locale.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-space bg-paper" aria-labelledby="essentials-heading">
        <div className="frame">
          <SectionHeading
            id="essentials-heading"
            label="04 / The essentials"
            title="The good bits, plainly put."
            copy="Good food should feel generous, not guarded. Here is what to expect before you walk in."
          />
          <div className="mt-14 grid grid-cols-1 gap-px border border-ink/15 bg-ink/15 sm:grid-cols-2 lg:grid-cols-4">
            {valueProps.map((prop, index) => (
              <Reveal
                key={prop.title}
                delay={index * 0.06}
                className="bg-paper px-6 py-9 sm:px-7 lg:px-8 lg:py-11"
              >
                <p className="label text-umber/80">0{index + 1}</p>
                <h3 className="display mt-8 text-[clamp(1.75rem,2.4vw,2.5rem)] leading-[1.02]">
                  {prop.title}
                </h3>
                <p className="mt-4 max-w-[30ch] text-sm leading-relaxed text-umber/80">
                  {prop.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>



      <section className="section-space bg-ink text-paper" aria-labelledby="visit-heading">
        <div className="frame grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-7">
            <p className="label eyebrow-rule mb-5 text-clay">06 / Come by</p>
            <h2 id="visit-heading" className="display max-w-[16ch] text-[clamp(3rem,8vw,7rem)]">
              See you in Victoria Island.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <p className="max-w-[38ch] text-[15px] leading-relaxed text-paper/80">
              {site.name} — {contact.addressLines.join(', ')}
            </p>
            <p className="mt-5 max-w-[38ch] text-sm leading-relaxed text-paper/60">
              {reservationPolicy.walkIns}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <ArrowLink href="/contact" variant="inverse">
                Plan your visit
              </ArrowLink>
              <ArrowLink href="/menu" variant="line" className="text-paper">
                View the menu
              </ArrowLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
