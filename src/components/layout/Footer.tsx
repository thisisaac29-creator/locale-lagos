'use client'

import { PatternBand } from '@/components/patterns/Patterns'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { contact, navigation, openingHours, site } from '@/data/site'
import { whatsappLink } from '@/lib/format'
import { Wordmark } from '@/components/ui/Wordmark'

export function Footer() {
  const reduced = useReducedMotion()

  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <PatternBand kind="tile" className="mb-12 text-paper"/>
      <div className="frame relative z-10 pt-24 md:pt-36">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="label mb-6 text-clay">Come by</p>
            <h2 className="display max-w-[12ch] text-[clamp(2.8rem,6vw,5.4rem)]">
              See you at Locale.
            </h2>
            <p className="mt-6 max-w-[34ch] text-base text-paper/80">
              {site.tagline} · {site.area}
            </p>
            <a
              href={whatsappLink(contact.reservationMessage, contact.whatsappNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex border-b border-paper/50 pb-1 text-sm font-semibold tracking-wide transition-colors hover:text-clay"
            >
              Reserve on WhatsApp ↗
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-3">
            <div>
              <p className="label mb-5 text-clay">Explore</p>
              <ul className="space-y-3 text-sm">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="transition-colors hover:text-clay">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label mb-5 text-clay">Find us</p>
              <address className="space-y-2 text-sm not-italic leading-relaxed text-paper/80">
                {contact.addressLines.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </address>
              <a href={contact.phoneHref} className="mt-4 block text-sm hover:text-clay">
                {contact.phoneDisplay}
              </a>
              <a
                href={whatsappLink(contact.reservationMessage, contact.whatsappNumber)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block text-sm hover:text-clay"
              >
                WhatsApp {contact.whatsappNumber}
              </a>
            </div>
            <div>
              <p className="label mb-5 text-clay">Hours</p>
              <ul className="space-y-2 text-sm text-paper/80">
                {openingHours.map((hour) => (
                  <li key={hour.day} className="flex justify-between gap-4">
                    <span>{hour.day.slice(0, 3)}</span>
                    <span>{hour.closed ? 'Closed' : `${hour.open}–${hour.close}`}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[13px] text-clay">Closed Mondays</p>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-between gap-6 border-t border-paper/15 py-6 text-[13px] tracking-wide text-paper/60">
          <div className="flex items-center gap-5">
            <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-paper">
              Instagram
            </a>
            <a href={contact.linktree} target="_blank" rel="noopener noreferrer" className="hover:text-paper">
              Linktree
            </a>
          </div>
          <p>Images from Locale</p>
        </div>
      </div>

      <motion.div
        className="relative z-0 -mb-[7vw] mt-4 select-none whitespace-nowrap text-center"
        initial={{ y: reduced ? 0 : '28%', opacity: reduced ? 1 : 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: reduced ? 0.25 : 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <Wordmark className="text-[clamp(7rem,25vw,30rem)] leading-[0.7]" inverse />
      </motion.div>
    </footer>
  )
}
