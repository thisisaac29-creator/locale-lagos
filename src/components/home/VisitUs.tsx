import { contact, openingHours, reservationPolicy } from '@/data/site'
import { whatsappLink } from '@/lib/format'
import { Reveal } from '@/components/motion/Reveal'
import { ArrowLink } from '@/components/motion/ArrowLink'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { OpenNowBadge } from '@/components/ui/OpenNowBadge'

const mapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(contact.mapsQuery)}&output=embed`

export function VisitUs() {
  return (
    <section className="section-space bg-cream" aria-labelledby="visit-heading">
      <div className="frame">
        <SectionHeading
          id="visit-heading"
          label="Find us"
          title="Walk in. Stay a while."
          copy={reservationPolicy.walkIns}
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          <Reveal className="order-2 lg:order-1 lg:col-span-7">
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

          <Reveal delay={0.1} className="order-1 lg:order-2 lg:col-span-4 lg:col-start-9">
            <OpenNowBadge className="mb-6 text-umber" />
            <h3 className="display text-[clamp(2rem,3.4vw,3.2rem)]">Victoria Island</h3>
            <address className="mt-4 space-y-1 text-base not-italic leading-relaxed text-umber">
              {contact.addressLines.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </address>
            <div className="mt-8 border-t border-ink/15 pt-6">
              <p className="label mb-4 text-umber/80">Opening hours</p>
              <ul className="space-y-2 text-sm">
                {openingHours.map((hour) => (
                  <li key={hour.day} className="flex justify-between gap-6">
                    <span>{hour.day}</span>
                    <span>{hour.closed ? 'Closed' : `${hour.open} – ${hour.close}`}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <ArrowLink href={contact.phoneHref} variant="line">
                Call {contact.phoneDisplay}
              </ArrowLink>
              <ArrowLink
                href={whatsappLink(contact.reservationMessage, contact.whatsappNumber)}
                external
                magnetic
              >
                Reserve on WhatsApp
              </ArrowLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
