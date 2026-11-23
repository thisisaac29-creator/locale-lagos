'use client'

import { motion, useReducedMotion } from 'framer-motion'

interface SplitLinesProps {
  lines: string[]
  className?: string
  lineClassName?: string
  delay?: number
  duration?: number
  stagger?: number
  as?: 'h1' | 'h2'
  id?: string
}

/** Authored line breaks, each masked so the line slides up from its own baseline. */
export function SplitLines({
  lines,
  className = '',
  lineClassName = '',
  delay = 0,
  duration = 1.05,
  stagger = 0.12,
  as = 'h1',
  id,
}: SplitLinesProps) {
  const reduced = useReducedMotion()
  const Tag = motion[as]

  return (
    <Tag id={id} className={className} aria-label={lines.join(' ')}>
      {lines.map((line, index) => (
        <span key={line} className="block overflow-hidden pb-[0.08em]" aria-hidden="true">
          <motion.span
            className={`block ${lineClassName}`}
            initial={{ y: reduced ? 0 : '105%', opacity: reduced ? 0 : 1 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: reduced ? 0.3 : duration, delay: delay + index * stagger, ease: [0.16, 1, 0.3, 1] }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
