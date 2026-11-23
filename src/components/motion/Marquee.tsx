interface MarqueeProps {
  items: string[]
  className?: string
}

export function Marquee({ items, className = '' }: MarqueeProps) {
  const content = (duplicate: boolean) => (
    <ul
      className="flex shrink-0 items-center gap-10 px-5 md:gap-16 md:px-10"
      aria-hidden={duplicate ? 'true' : undefined}
    >
      {items.map((item) => (
        <li key={item} className="flex items-center gap-10 whitespace-nowrap md:gap-16">
          <span className="display text-[clamp(1.8rem,3.4vw,3.2rem)]">{item}</span>
          <span className="h-1.5 w-1.5 rotate-45 bg-clay" aria-hidden="true" />
        </li>
      ))}
    </ul>
  )

  return (
    <div className={`overflow-hidden py-6 ${className}`} aria-label={`Featured dishes: ${items.join(', ')}`}>
      <div className="flex w-max motion-safe:animate-marquee">{content(false)}{content(true)}</div>
    </div>
  )
}
