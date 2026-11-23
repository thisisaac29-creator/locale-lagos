'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { SplitLines } from '@/components/motion/SplitLines'
import { ArrowLink } from '@/components/motion/ArrowLink'
import { PatternTexture } from '@/components/patterns/Patterns'
import { site } from '@/data/site'
import { BLUR_DATA_URL } from '@/lib/format'

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const media = useRef<HTMLDivElement>(null)
  const image = useRef<HTMLDivElement>(null)
  const indicator = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [playVideo, setPlayVideo] = useState(false)
  useEffect(() => { setPlayVideo(!window.matchMedia("(prefers-reduced-motion: reduce)").matches && window.matchMedia("(min-width: 768px)").matches) }, [reduced])



  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-umber pt-28 text-paper"
      aria-labelledby="hero-heading"
    >
      <div ref={media} className="absolute -inset-y-[8%] inset-x-0 z-0">
        <div ref={image} className="relative h-full w-full">
          {site.heroVideo.available && playVideo ? (
            <video
              className="h-full w-full object-cover"
              autoPlay
              preload="none"
              muted
              loop
              playsInline
              poster="/video/hero-poster.webp"
              aria-hidden="true"
            >
              <source src="/video/hero.webm" type="video/webm" />
              <source src={site.heroVideo.src} type="video/mp4" />
            </video>
          ) : (
            <Image
              src="/video/hero-poster.webp"
              alt="Woven chairs and wooden tables in Locale’s covered dining space"
              fill
              priority
              sizes="100vw"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              className="object-cover"
            />
          )}
        </div>
        <div className="absolute inset-0 bg-ink/65" />
      </div>

      <div className="frame relative z-10 flex flex-1 flex-col pb-12">
        <PatternTexture/>
        <SplitLines
          as="h1"
          id="hero-heading"
          lines={['Where', '#GlobalMeetsLocal']}
          className="display mt-6 text-[clamp(2rem,9vw,8rem)] text-paper [&>span:nth-child(2)]:text-right"
          lineClassName="whitespace-nowrap"
          delay={0.05}
          duration={0.55}
          stagger={0.06}
        />

        <p className="mt-4 text-lg text-paper/90">
          Afro-Bohemian dining in Victoria Island, Lagos.
        </p>

        <motion.div
          className="mt-auto max-w-[46ch] pt-12"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0.3 : 0.7, delay: reduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[17px] leading-relaxed text-paper/90 sm:text-lg">
            A modern Afro-Bohemian dining room in Victoria Island. Lagos street-food culture alongside
            international comfort dishes.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <ArrowLink
              href={`https://wa.me/2349030009758?text=${encodeURIComponent("Hello Locale, I'd like to reserve a table for ___ on ___ at ___.")}`}
              external
              magnetic
              variant="inverse"
            >
              Reserve a Table
            </ArrowLink>
            <ArrowLink href="/menu" variant="line" className="text-paper">
              View Menu
            </ArrowLink>
          </div>
        </motion.div>
      </div>

      <div ref={indicator} className="frame relative z-10 flex items-center justify-between pb-7 text-[13px] uppercase tracking-label text-paper/80">
        <span>Scroll to explore</span>
        {<button type="button" className="border border-paper/60 px-3 py-2 text-xs tracking-normal" onClick={()=>setPlayVideo(value=>!value)}>{playVideo ? "Pause film" : "Play film"}</button>}
        <span className="h-10 w-px bg-paper/50" aria-hidden="true" />
      </div>
    </section>
  )
}
