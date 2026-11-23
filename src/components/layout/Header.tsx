'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { navigation, site } from '@/data/site'
import { contact } from '@/data/site'
import { whatsappLink } from '@/lib/format'
import { Wordmark } from '@/components/ui/Wordmark'

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [pathname])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[padding,background-color] duration-500 ease-silky ${
        scrolled ? 'bg-cream/95 py-2' : 'bg-cream py-5'
      }`}
    >
      <div className="frame flex items-center justify-between gap-6">
        <Link href="/" className="relative z-10 shrink-0" aria-label={`${site.fullName} — home`}>
          <Wordmark className={scrolled ? 'text-3xl' : 'text-4xl'} />
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative py-1 text-[13px] font-medium tracking-[0.04em]"
              aria-current={pathname === item.href ? 'page' : undefined}
            >
              {item.label}
              <span
                className={`absolute inset-x-0 bottom-0 h-px origin-left bg-terracotta transition-transform duration-500 ease-silky ${
                  pathname === item.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <a
            href={whatsappLink(contact.reservationMessage, contact.whatsappNumber)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden border-b border-terracotta pb-1 text-[13px] font-semibold tracking-[0.04em] text-terracotta transition-colors hover:text-ink sm:block"
          >
            Reserve
          </a>
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((value) => !value)}
            className="relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-[6px] lg:hidden"
          >
            <motion.span
              className="block h-px w-6 bg-ink"
              animate={menuOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.3 }}
            />
            <motion.span
              className="block h-px w-6 bg-ink"
              animate={menuOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.3 }}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile navigation"
            className="fixed inset-0 z-0 flex flex-col justify-center gap-2 bg-cream px-[var(--frame)] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.3 }}
          >
            {[{ label: 'Home', href: '/' }, ...navigation].map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: reduced ? 0 : 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduced ? 0 : 0.06 * index, duration: reduced ? 0 : 0.4 }}
              >
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="display block py-1.5 text-[clamp(2.6rem,11vw,4rem)]"
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
