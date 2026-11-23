import { PatternBand } from '@/components/patterns/Patterns'
export function TileDivider({className=''}:{className?:string}) {return <div className={`bg-cream px-[var(--frame)] py-8 ${className}`}><PatternBand kind="chevron"/></div>}
