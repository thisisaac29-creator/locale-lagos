'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp, simpleFade, stagger } from '@/lib/motion'

interface RevealProps {
  children: ReactNode
  className?: string
  immediate?: boolean
  delay?: number
  as?: 'div' | 'li' | 'section' | 'p' | 'span'
}

/** Section-level entrance. Content is visible if JS never runs. */
export function Reveal({ children, className = '', delay = 0, immediate = false, as = 'div' }: RevealProps) {
  const reduced = useReducedMotion()
  const Component = motion[as]

  return (
    <Component
      className={className}
      variants={reduced ? simpleFade : fadeUp}
      initial={immediate ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2, margin: '0px 0px -8% 0px' }}
      transition={reduced ? undefined : { delay }}
    >
      {children}
    </Component>
  )
}

export function RevealGroup({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      variants={reduced ? undefined : stagger()}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {children}
    </motion.div>
  )
}
