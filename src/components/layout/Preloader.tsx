'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { PatternBand } from '@/components/patterns/Patterns'
import { Wordmark } from '@/components/ui/Wordmark'

const SESSION_KEY = 'locale-intro-seen'

/** Under 2s, once per session. Removed entirely for reduced-motion users. */
export function Preloader() {
  const reduced = useReducedMotion()
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (reduced) {
      setShow(false)
      return
    }
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return
      sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      // Storage can be unavailable in private mode; still show the intro.
    }
    setShow(true)
  }, [reduced])

  // Tie dismissal to visibility so effect replays cannot strand the overlay
  // after the session flag has already been written.
  useEffect(() => {
    if (!show) return
    const timer = window.setTimeout(() => setShow(false), 850)
    return () => window.clearTimeout(timer)
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-clay"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-center text-ink"
          >
            <PatternBand kind="marks" duration={.3} className="mb-6 text-ink [--pattern-ground:var(--color-clay)]"/>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.3,duration:.25}}><Wordmark className="text-[clamp(4rem,16vw,10rem)]" /></motion.div>
            <p className="label mt-5 text-ink">Victoria Island · Lagos</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
