'use client'

import { PatternBand } from '@/components/patterns/Patterns'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { offers } from '@/data/offers'
import { isWithin } from '@/lib/time'
import { formatNaira } from '@/lib/format'
import { ArrowLink } from '@/components/motion/ArrowLink'
import { Reveal } from '@/components/motion/Reveal'

export function HappyHourFeature() {
  const offer = offers[0]
  const [active, setActive] = useState(false)

  useEffect(() => {
    const tick = () => setActive(isWithin(offer))
    tick()
    const id = window.setInterval(tick, 60_000)
    return () => window.clearInterval(id)
  }, [offer])

  return (
    <section className="bg-cream px-[var(--frame)] py-8 md:py-16" aria-labelledby="happy-hour-heading">
      <Reveal className="relative overflow-hidden bg-terracotta px-6 py-14 text-paper md:px-14 md:py-20">
        <PatternBand kind="marks" className="mb-8 text-paper"/>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <div className="flex flex-wrap items-center gap-4">
              <p className="label text-paper/80">{offer.label}</p>
              {active && (
                <span className="inline-flex items-center gap-2 rounded-full bg-paper px-3 py-1 text-[13px] font-semibold uppercase tracking-[0.12em] text-terracotta">
                  <span className="h-1.5 w-1.5 rounded-full bg-terracotta motion-safe:animate-shimmer" aria-hidden="true" />
                  Happening now
                </span>
              )}
            </div>
            <h2 id="happy-hour-heading" className="display mt-6 text-[clamp(3rem,8vw,7rem)]">
              {offer.title}
            </h2>
            <p className="mt-5 max-w-[36ch] text-lg leading-relaxed text-paper/90">{offer.description}</p>
            <p className="mt-2 text-sm text-paper/75">{offer.details}</p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <ArrowLink href={offer.ctaHref} external variant="inverse" magnetic>
                {offer.ctaLabel}
              </ArrowLink>
              <Link href="/offers" className="border-b border-paper/60 pb-1 text-sm transition-colors hover:text-clay">
                All offers
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8 lg:text-right">
            <p className="label text-paper/80">Per person</p>
            <p className="display mt-2 text-[clamp(4.5rem,13vw,12rem)] leading-[0.8] motion-safe:animate-shimmer">
              {offer.price ? formatNaira(offer.price) : '—'}
            </p>
            <p className="mt-5 max-w-[30ch] text-sm text-paper/80 lg:ml-auto">
              Unlimited cocktails and loaded fries. Come with an appetite.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
