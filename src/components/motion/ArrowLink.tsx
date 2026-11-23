import Link from 'next/link'
import { Magnetic } from './Magnetic'

interface ArrowLinkProps {
  href: string
  children: React.ReactNode
  variant?: 'solid' | 'line' | 'inverse'
  external?: boolean
  className?: string
  magnetic?: boolean
}

const styles = {
  solid: 'bg-terracotta text-paper border border-terracotta hover:bg-ink hover:border-ink',
  line: 'border-b border-current hover:opacity-70',
  inverse: 'border border-paper/40 text-paper hover:bg-paper hover:text-ink',
}

export function ArrowLink({
  href,
  children,
  variant = 'solid',
  external = false,
  className = '',
  magnetic = false,
}: ArrowLinkProps) {
  const classes = `group/link inline-flex items-center justify-center gap-3 px-6 py-3.5 text-[13px] font-semibold tracking-[0.08em] transition-colors duration-300 ${styles[variant]} ${className}`

  const inner = (
    <>
      <span>{children}</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-4 w-4 transition-transform duration-300 ease-silky group-hover/link:translate-x-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M4 12h15M13 6l6 6-6 6" />
      </svg>
    </>
  )

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {magnetic ? <Magnetic>{inner}</Magnetic> : inner}
      </a>
    )
  }

  return (
    <Link href={href} className={magnetic ? undefined : classes}>
      {magnetic ? <Magnetic className={classes}>{inner}</Magnetic> : inner}
    </Link>
  )
}
