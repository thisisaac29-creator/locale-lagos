'use client'

import { PatternBand } from '@/components/patterns/Patterns'

import { useEffect, useState } from 'react'
import { offers, type Offer } from '@/data/offers'
import { contact, reservationPolicy, site } from '@/data/site'
import { ArrowLink } from '@/components/motion/ArrowLink'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { formatNaira, whatsappLink } from '@/lib/format'
import { isWithin } from '@/lib/time'

const isExternal = (href: string) => /^https?:\/\//.test(href)

/** Live Lagos-time status for a featured offer, refreshed once a minute. */
function HappeningNowBadge({ offer }: { offer: Offer }) {
  const [active, setActive] = useState(false)

  useEffect(() => {
    const tick = () => setActive(isWithin(offer))
    tick()
    const id = window.setInterval(tick, 60_000)
    return () => window.clearInterval(id)
  }, [offer])

  if (!active) return null

  return (
    <span
      className="inline-flex items-center gap-2 rounded-full bg-paper px-3 py-1 text-[13px] font-semibold uppercase tracking-[0.12em] text-terracotta"
      aria-live="polite"
      suppressHydrationWarning
    >
      <span className="h-1.5 w-1.5 rounded-full bg-terracotta motion-safe:animate-shimmer" aria-hidden="true" />
      Happening now
    </span>
  )
}

/** The lead promo: bold colour, oversized price, shimmer via CSS opacity only. */
function FeatureOfferCard({ offer }: { offer: Offer }) {
  return (
    <article className="relative overflow-hidden bg-terracotta px-6 py-12 text-paper sm:px-10 md:px-14 md:py-16"><PatternBand kind="marks" className="mb-8 text-paper"/>
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-center gap-4">
            <p className="label text-paper/80">{offer.label}</p>
            <HappeningNowBadge offer={offer} />
          </div>
          <h3 className="display mt-5 text-[clamp(3rem,9vw,7rem)]">{offer.title}</h3>
          <p className="mt-5 max-w-[34ch] text-lg leading-relaxed text-paper/90">{offer.description}</p>
          <p className="mt-3 text-sm text-paper/75">{offer.details}</p>
          <div className="mt-8 [&_a:focus-visible]:outline-paper">
            <ArrowLink href={offer.ctaHref} external={isExternal(offer.ctaHref)} variant="inverse">
              {offer.ctaLabel}
            </ArrowLink>
          </div>
        </div>

        <div className="lg:col-span-5 lg:text-right">
          <p className="label text-paper/80">Per person</p>
          <p className="display mt-2 text-[clamp(4rem,13vw,9rem)] leading-[0.8] motion-safe:animate-shimmer">
            {offer.price != null ? formatNaira(offer.price) : '—'}
          </p>
        </div>
      </div>
    </article>
  )
}

/** Every other promo, kept compact so new data entries need no new markup. */
function OfferCard({ offer }: { offer: Offer }) {
  return (
    <article className="flex h-full flex-col border-t border-ink/20 pt-6">
      <p className="label text-terracotta">{offer.label}</p>
      <h3 className="display mt-4 text-[clamp(2.4rem,6vw,4rem)]">{offer.title}</h3>
      <p className="mt-4 max-w-[40ch] text-base leading-relaxed text-umber">{offer.description}</p>
      {offer.details && <p className="mt-3 text-sm text-umber/80">{offer.details}</p>}
      {offer.price != null && (
        <p className="mt-5 text-lg font-semibold text-ink">
          {formatNaira(offer.price)}
          <span className="ml-2 text-sm font-normal text-umber/80">per person</span>
        </p>
      )}
      <div className="mt-auto pt-8">
        <ArrowLink href={offer.ctaHref} external={isExternal(offer.ctaHref)} variant="line">
          {offer.ctaLabel}
        </ArrowLink>
      </div>
    </article>
  )
}

/** Private dining enquiry built from the offers data and the shared contact number. */
function PrivateDining() {
  const offer = offers.find((item) => item.id === 'private-dining')
  if (!offer) return null

  const href = whatsappLink(contact.privateDiningMessage, contact.whatsappNumber)

  return (
    <section className="section-space bg-ink px-[var(--frame)] text-paper" aria-labelledby="private-dining-heading">
      <div className="mx-auto grid max-w-frame gap-10 lg:grid-cols-12 lg:items-end">
        <Reveal className="lg:col-span-7">
          <p className="label text-clay">{offer.label}</p>
          <h2 id="private-dining-heading" className="display mt-5 text-[clamp(3rem,8vw,6.5rem)]">
            {offer.title}
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
          <p className="max-w-[38ch] text-lg leading-relaxed text-paper/85">{offer.description}</p>
          {offer.details && <p className="mt-3 text-sm text-paper/60">{offer.details}</p>}
          <div className="mt-8 [&_a:focus-visible]:outline-paper">
            <ArrowLink href={href} external variant="inverse">
              {offer.ctaLabel}
            </ArrowLink>
          </div>
          <p className="mt-4 text-[13px] tracking-[0.12em] text-paper/50">WhatsApp {contact.whatsappNumber}</p>
        </Reveal>
      </div>
    </section>
  )
}

/** House rules, quoted verbatim from site data. */
function ReservationPolicy() {
  return (
    <section className="section-space bg-sand px-[var(--frame)]" aria-labelledby="reservations-heading">
      <div className="mx-auto max-w-frame">
        <Reveal>
          <p className="label eyebrow-rule text-terracotta">Good to know</p>
          <h2 id="reservations-heading" className="display mt-5 max-w-[16ch] text-[clamp(2.6rem,7vw,5.5rem)]">
            Reservations
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-16">
          <Reveal delay={0.06}>
            <p className="label text-terracotta">Walk-ins</p>
            <p className="mt-4 max-w-[42ch] text-lg leading-relaxed text-umber">{reservationPolicy.walkIns}</p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="label text-terracotta">Advance</p>
            <p className="mt-4 max-w-[42ch] text-lg leading-relaxed text-umber">{reservationPolicy.advance}</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export function OffersContent() {
  return (
    <>
      <section className="bg-cream px-[var(--frame)] pb-16 pt-32 md:pb-24 md:pt-40" aria-labelledby="offers-title">
        <div className="mx-auto max-w-frame">
          <Reveal>
            <p className="label eyebrow-rule mb-5 text-terracotta">{site.fullName}</p>
            <h1 id="offers-title" className="display text-[clamp(3.4rem,12vw,9rem)]">
              Offers
            </h1>
          </Reveal>

          <div className="mt-16 md:mt-24">
            <SectionHeading
              id="lineup-heading"
              label="What's on"
              title="The line-up"
              titleClassName="text-[clamp(2.2rem,5vw,4rem)]"
            />
            <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2">
              {offers.map((offer, index) => (
                <Reveal
                  key={offer.id}
                  delay={index * 0.06}
                  className={offer.featured ? 'md:col-span-2' : undefined}
                >
                  {offer.featured ? <FeatureOfferCard offer={offer} /> : <OfferCard offer={offer} />}
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PrivateDining />
      <ReservationPolicy />
    </>
  )
}
