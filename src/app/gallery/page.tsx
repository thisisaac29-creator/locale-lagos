import type { Metadata } from 'next'
import { GalleryGrid } from '@/components/gallery/GalleryGrid'
import { PatternBand } from '@/components/patterns/Patterns'
export const metadata:Metadata={title:'Gallery',description:'Food, gatherings, craft and the spaces of Locale Lagos, in photographs and films.'}
export default function GalleryPage(){return <section className="frame bg-paper pb-24 pt-32" aria-labelledby="gallery-heading"><h1 id="gallery-heading" className="display text-[clamp(3.5rem,8vw,7rem)]">A look around.</h1><p className="my-8 max-w-xl text-umber">At the table, in the courtyard, around the room. Food, craft and moments at Locale.</p><PatternBand className="mb-12"/><GalleryGrid/></section>}
