'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import type { ReactNode } from 'react'
import { useIsTouch, usePrefersReducedMotion } from '@/hooks/useMediaQuery'

interface MagneticProps {
  children: ReactNode
  strength?: number
  className?: string
}

/** Desktop-only magnetic hover. Falls back to a plain element on touch / reduced motion. */
export function Magnetic({ children, strength = 0.18, className = '' }: MagneticProps) {
  const touch = useIsTouch()
  const reduced = usePrefersReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 180, damping: 18, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 180, damping: 18, mass: 0.4 })

  if (touch || reduced) return <span className={`inline-block ${className}`}>{children}</span>

  return (
    <motion.span
      className={`inline-block ${className}`}
      style={{ x: springX, y: springY }}
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect()
        x.set((event.clientX - bounds.left - bounds.width / 2) * strength)
        y.set((event.clientY - bounds.top - bounds.height / 2) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.span>
  )
}
