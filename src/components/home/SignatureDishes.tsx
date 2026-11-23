'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArchImage } from '@/components/ui/ArchImage'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Marquee } from '@/components/motion/Marquee'
import { signatureDishes } from '@/data/dishes'
import { useIsTouch } from '@/hooks/useMediaQuery'

export function SignatureDishes() {
  const touch = useIsTouch()
  const reduced = useReducedMotion()

  return (
    <section className="section-space overflow-hidden bg-cream" aria-labelledby="dishes-heading">
      <div className="frame">
        <SectionHeading
          id="dishes-heading"
          label="On the table"
          title="The usual suspects."
          copy="A few things people come back for. The full menu is a longer story."
        />
      </div>

      <div tabIndex={0} role="region" aria-label="Signature dishes" className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--frame)] pb-4 md:grid md:grid-cols-3 md:overflow-visible md:px-[var(--frame)] lg:grid-cols-5 lg:gap-5">
        {signatureDishes.map((dish) => (
          <motion.article
            key={dish.id}
            variants={{ hidden: { y: 24 }, visible: { y: 0 } }}
            whileHover={touch || reduced ? undefined : { y: -10, rotate: -0.8 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="group w-[72vw] shrink-0 snap-center sm:w-[46vw] md:w-auto"
          >
            <ArchImage
              src={dish.image}
              alt={dish.alt}
              width={800}
              height={1000}
              sizes="(max-width: 768px) 72vw, 22vw"
              className="aspect-[4/5] w-full"
              imageClassName="transition-transform duration-[1200ms] ease-silky group-hover:scale-[1.06]"
            />
            <h3 className="display mt-5 text-[clamp(1.5rem,2.2vw,2.2rem)] leading-tight">{dish.name}</h3>
            {dish.description && <p className="mt-1.5 text-sm text-umber">{dish.description}</p>}
          </motion.article>
        ))}
      </div>

      <div className="mt-16 border-y border-ink/10 bg-sand/40">
        <Marquee items={signatureDishes.map((dish) => dish.name)} />
      </div>
    </section>
  )
}
