import { site } from '@/data/site'

interface WordmarkProps {
  className?: string
  showLagos?: boolean
  inverse?: boolean
}

/**
 * Text-based wordmark so a real logo asset can be dropped in later.
 * Rendered as a span — never an h1 — so each page keeps one true h1.
 */
export function Wordmark({ className = '', showLagos = false, inverse = false }: WordmarkProps) {
  return (
    <span
      className={`inline-flex items-baseline gap-2 font-serif leading-none tracking-display ${
        inverse ? 'text-paper' : 'text-ink'
      } ${className}`}
      role="img"
      aria-label={site.fullName}
    >
      <span aria-hidden="true">{site.name}</span>
      {showLagos && (
        <span className="font-sans text-[0.16em] font-semibold uppercase tracking-label" aria-hidden="true">
          Lagos
        </span>
      )}
    </span>
  )
}
