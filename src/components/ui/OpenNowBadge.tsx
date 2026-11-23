'use client'

import { useEffect, useState } from 'react'
import { isOpenNow, isWithin } from '@/lib/time'
import { offers } from '@/data/offers'

interface OpenNowBadgeProps {
  className?: string
}

/** Live status in Africa/Lagos time, not the visitor's local time. */
export function OpenNowBadge({ className = '' }: OpenNowBadgeProps) {
  const [open, setOpen] = useState<boolean | null>(null)
  const [happyHour, setHappyHour] = useState(false)

  useEffect(() => {
    const tick = () => {
      setOpen(isOpenNow())
      setHappyHour(isWithin(offers[0]))
    }
    tick()
    const id = window.setInterval(tick, 60_000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <span
      className={`inline-flex items-center gap-2 whitespace-nowrap text-[13px] font-semibold uppercase tracking-[0.12em] ${className}`}
      aria-live="polite"
      suppressHydrationWarning
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${open ? 'bg-leaf' : 'bg-terracotta'}`}
        aria-hidden="true"
      />
      {open === null ? 'Victoria Island' : open ? 'Open now' : 'Closed'}
      {happyHour && <span className="text-terracotta">· Happy Hour</span>}
    </span>
  )
}
