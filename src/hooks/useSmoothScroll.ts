'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePrefersReducedMotion } from './useMediaQuery'

/**
 * One Lenis instance driven by GSAP's ticker so ScrollTrigger and smooth
 * scrolling share a clock. Disabled entirely for reduced-motion users.
 */
export function useSmoothScroll(): void {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) {
      ScrollTrigger.refresh()
      return
    }

    gsap.registerPlugin(ScrollTrigger)
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    })

    const onScroll = () => ScrollTrigger.update()
    lenis.on('scroll', onScroll)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    ScrollTrigger.refresh()

    return () => {
      lenis.off('scroll', onScroll)
      gsap.ticker.remove(tick)
      lenis.destroy()
      gsap.ticker.lagSmoothing(500, 33)
    }
  }, [reduced])
}
