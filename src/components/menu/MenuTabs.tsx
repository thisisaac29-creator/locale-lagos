'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { KeyboardEvent, MouseEvent } from 'react'
import { useState } from 'react'
import {
  dietaryTagLabels,
  menuData,
  type MenuItem,
  type MenuSection,
} from '@/data/menu'
import Image from 'next/image'
import { PatternBand, PatternTexture } from '@/components/patterns/Patterns'
import { contact } from '@/data/site'
import { formatNaira, whatsappLink } from '@/lib/format'

function MenuItemRow({ item }: { item: MenuItem }) {
  return (
    <li
      className="hairline flex items-start justify-between gap-4 py-4 sm:gap-8"
    >
      <div className="min-w-0">
        {item.group && <p className="mb-2 text-xs font-semibold">{item.group}</p>}
        <h3 className="font-serif text-lg font-normal leading-snug tracking-normal text-ink">
          {item.name}
        </h3>
        {item.description && (
          <p className="mt-1 text-base leading-relaxed text-umber">{item.description}</p>
        )}
        {item.dietaryNote && <p className="mt-2 text-sm text-leaf">{item.dietaryNote}</p>}
        {item.tags && item.tags.length > 0 && (
          <ul className="mt-2 flex flex-wrap gap-2" aria-label="Dietary information">
            {item.tags.map((tag) => (
              <li
                key={tag}
                className="label rounded-full border border-leaf/40 px-2.5 py-1 text-[13px] text-leaf"
              >
                <abbr title={dietaryTagLabels[tag]} className="no-underline">
                  {tag}
                </abbr>
              </li>
            ))}
          </ul>
        )}
      </div>
      {item.price !== null && (
        <span
          className="max-w-[40%] shrink-0 text-right font-serif text-lg tabular-nums text-terracotta"
        >
          {typeof item.price === 'number' ? formatNaira(item.price) : item.price}
        </span>
      )}
    </li>
  )
}

export function MenuTabs() {
  const reduced = !!useReducedMotion()
  const [activeId, setActiveId] = useState<MenuSection['id']>(menuData[0].id)
  const active = menuData.find((section) => section.id === activeId) ?? menuData[0]

  const selectTab = (index: number) => {
    setActiveId(menuData[index].id)
    document.getElementById(`menu-tab-${menuData[index].id}`)?.focus()
  }

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    if (event.key === 'ArrowRight') selectTab((index + 1) % menuData.length)
    else if (event.key === 'ArrowLeft') selectTab((index - 1 + menuData.length) % menuData.length)
    else if (event.key === 'Home') selectTab(0)
    else selectTab(menuData.length - 1)
  }

  const jumpToCategory = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id)
    if (!target) return
    event.preventDefault()
    target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
    window.history.replaceState(null, '', `#${id}`)
  }

  return (
    <section className="bg-cream pb-20 pt-4 md:pb-28 md:pt-8" aria-label="Menu categories">
      <div className="frame">
        <div
          role="tablist"
          aria-label="Menu type"
          className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-ink/15"
        >
          {menuData.map((section, index) => (
            <button
              key={section.id}
              type="button"
              role="tab"
              id={`menu-tab-${section.id}`}
              aria-controls="menu-panel"
              aria-selected={activeId === section.id}
              tabIndex={activeId === section.id ? 0 : -1}
              onClick={() => setActiveId(section.id)}
              onKeyDown={(event) => onTabKeyDown(event, index)}
              className={`relative py-4 text-base font-medium transition-colors duration-300 sm:text-lg ${
                activeId === section.id ? 'text-ink' : 'text-umber/80 hover:text-ink'
              }`}
            >
              {section.name}
              {activeId === section.id && (
                <motion.span
                  layoutId="menu-tab-underline"
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-px h-0.5 bg-terracotta"
                  transition={
                    reduced
                      ? { duration: 0 }
                      : { type: 'spring', stiffness: 420, damping: 36 }
                  }
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <nav
        aria-label="Categories on this menu"
        className="sticky top-14 z-30 border-b border-ink/10 bg-cream/95 backdrop-blur-sm"
      >
        <div className="no-scrollbar frame flex gap-6 overflow-x-auto py-3">
          {active.categories.map((category) => (
            <a
              key={category.id}
              href={`#${category.id}`}
              onClick={(event) => jumpToCategory(event, category.id)}
              className="shrink-0 whitespace-nowrap text-base text-umber transition-colors hover:text-terracotta"
            >
              {category.name}
            </a>
          ))}
        </div>
      </nav>

      <div className="frame">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            id="menu-panel"
            role="tabpanel"
            aria-labelledby={`menu-tab-${active.id}`}
            tabIndex={0}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.2 }}
          >
            <p className="mt-8 max-w-[44ch] text-base leading-relaxed text-umber">{active.intro}. Prices in naira. Please inform your server of any possible allergies.</p>

            {active.categories.map((category, categoryIndex) => (
              <section
                key={category.id}
                id={category.id}
                aria-labelledby={`${category.id}-heading`}
                className="scroll-mt-32 pt-12 md:scroll-mt-36 md:pt-16"
              >
                <PatternBand kind="tile" className="mb-6 max-w-40"/>
                <h2
                  id={`${category.id}-heading`}
                  className="display text-[clamp(1.75rem,4vw,2.75rem)]"
                >
                  {category.name}
                </h2>

                {category.note && <p className="mt-4 text-base text-umber">{category.note}</p>}
                {active.id==='food' && categoryIndex % 3 === 2 && <div className="relative mt-8 hidden aspect-[4/1] overflow-hidden lg:block"><Image src={['/images/food/image-25.webp','/images/food/image-41.webp','/images/food/image-49.webp'][Math.floor(categoryIndex/3)]} alt="Dishes photographed at Locale" fill sizes="90vw" className="object-cover"/></div>}
                <div className="relative mt-5"><PatternTexture kind="weave" opacity={.025}/>
                  {category.items.length > 0 ? (
                    <ul className="menu-items">
                      {category.items.map((item) => (
                        <MenuItemRow key={item.name} item={item} />
                      ))}
                    </ul>
                  ) : category.note?.startsWith('[EDIT]') ? (
                    <p className="max-w-[54ch] border-l-2 border-clay/60 pl-4 text-base italic leading-relaxed text-umber/80">
                      {category.note}
                    </p>
                  ) : null}
                </div>
              </section>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="hairline mt-16 flex flex-col gap-6 pt-8 sm:flex-row sm:items-center sm:justify-between md:mt-20">
          <a
            href={active.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 self-start border-b border-terracotta pb-1 text-base font-medium text-terracotta transition-colors hover:text-ink"
          >
            Download full menu (PDF)
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M12 4v12m0 0 5-5m-5 5-5-5M5 20h14" />
            </svg>
          </a>
          <a
            href={whatsappLink(contact.reservationMessage, contact.whatsappNumber)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-terracotta px-6 py-3.5 text-base font-semibold tracking-[0.04em] text-paper transition-colors hover:bg-ink"
          >
            Reserve a table on WhatsApp
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M4 12h15M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
