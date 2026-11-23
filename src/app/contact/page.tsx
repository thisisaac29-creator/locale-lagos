import { PatternBand } from '@/components/patterns/Patterns'
import type { Metadata } from 'next'
import { amenities, contact, openingHours, reservationPolicy, site } from '@/data/site'
import { whatsappLink } from '@/lib/format'
import { Reveal } from '@/components/motion/Reveal'
import { ArrowLink } from '@/components/motion/ArrowLink'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { OpenNowBadge } from '@/components/ui/OpenNowBadge'
import { ReservationForm } from '@/components/contact/ReservationForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Find Locale at ${contact.address}. Call us or reserve a table on WhatsApp.`,
}

const mapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(contact.mapsQuery)}&output=embed`

export default function ContactPage() {
  const whatsappHref = whatsappLink(contact.reservationMessage, contact.whatsappNumber)

  return (
    <>
      <section className="section-space bg-cream pt-[clamp(7rem,12vw,11rem)]" aria-labelledby="contact-title">
        <div className="frame"><PatternBand kind="weave" className="mb-10"/>
          <Reveal>
            <p className="label eyebrow-rule mb-5 text-terracotta">Find us</p>
            <h1 id="contact-title" className="display max-w-[12ch] text-[clamp(3.5rem,10vw,8rem)]">
              Contact
            </h1>
            <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-umber">
              Reserve a table or come find us in {site.area}.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-8">
            <Reveal className="lg:col-span-7">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-sand">
                <iframe
                  title="Map showing Locale at 2 Saka Jojo Street, Victoria Island, Lagos"
                  src={mapsUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full border-0"
                />
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
              <OpenNowBadge className="mb-6 text-umber" />
              <h2 className="display text-[clamp(2rem,3.4vw,3.2rem)]">Victoria Island</h2>
              <address className="mt-4 space-y-1 text-base not-italic leading-relaxed text-umber">
                {contact.addressLines.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </address>

              <div className="mt-8 flex flex-col items-start gap-4 border-t border-ink/15 pt-6">
                <ArrowLink href={contact.phoneHref} variant="line">
                  Call {contact.phoneDisplay}
                </ArrowLink>
                <ArrowLink href={whatsappHref} variant="line" external>
                  Reserve on WhatsApp
                </ArrowLink>
              </div>

              <div className="mt-9">
                <p className="label mb-4 text-umber/80">Follow along</p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-umber">
                  <a
                    href={contact.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b border-current pb-0.5 transition-colors hover:text-terracotta"
                  >
                    Instagram
                  </a>
                  <a
                    href={contact.linktree}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b border-current pb-0.5 transition-colors hover:text-terracotta"
                  >
                    Linktree
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-space bg-paper" aria-labelledby="visit-heading">
        <div className="frame">
          <SectionHeading
            id="visit-heading"
            label="Plan your visit"
            title="Good to know."
            copy={reservationPolicy.advance}
          />

          <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-8">
            <Reveal className="lg:col-span-5">
              <h3 className="label mb-5 text-umber/80">Opening hours</h3>
              <ul className="space-y-2 text-sm text-umber">
                {openingHours.map((hour) => (
                  <li key={hour.day} className="flex justify-between gap-6">
                    <span>{hour.day}</span>
                    <span>{hour.closed ? 'Closed' : `${hour.open} – ${hour.close}`}</span>
                  </li>
                ))}
              </ul>

              <h3 className="label mb-5 mt-10 text-umber/80">Amenities</h3>
              <ul className="space-y-2 text-sm text-umber">
                {amenities.map((amenity) => (
                  <li key={amenity} className="flex gap-3">
                    <span aria-hidden="true" className="text-terracotta">
                      —
                    </span>
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>

              <h3 className="label mb-4 mt-10 text-umber/80">Reservations</h3>
              <p className="max-w-[46ch] text-sm leading-relaxed text-umber">{reservationPolicy.walkIns}</p>
              <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-umber">
                {reservationPolicy.advance}
              </p>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
              <h3 className="display mb-8 text-[clamp(2rem,3.4vw,3.2rem)]">Reserve a table</h3>
              <ReservationForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
