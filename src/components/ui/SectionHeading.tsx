import type { ReactNode } from 'react'
import { Reveal } from '@/components/motion/Reveal'

interface SectionHeadingProps {
  label: string
  title: string
  copy?: string
  className?: string
  action?: ReactNode
  titleClassName?: string
  id?: string
}

export function SectionHeading({
  label,
  title,
  copy,
  className = '',
  action,
  titleClassName = 'text-[clamp(2.6rem,6vw,5.5rem)]',
  id,
}: SectionHeadingProps) {
  return (
    <div aria-label={label} className={`grid gap-6 md:grid-cols-12 md:items-end ${className}`}>
      <Reveal className="md:col-span-7">
        <h2 id={id} className={`display max-w-[14ch] ${titleClassName}`}>{title}</h2>
      </Reveal>
      {(copy || action) && (
        <Reveal delay={0.1} className="md:col-span-4 md:col-start-9 md:pb-2">
          {copy && <p className="max-w-[42ch] text-base leading-relaxed text-umber">{copy}</p>}
          {action && <div className="mt-6">{action}</div>}
        </Reveal>
      )}
    </div>
  )
}
