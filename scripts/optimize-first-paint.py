from pathlib import Path
p=Path('src/components/layout/Providers.tsx');s=p.read_text(encoding='utf8').replace("import { useSmoothScroll } from '@/hooks/useSmoothScroll'\n",'').replace('  useSmoothScroll()\n','');p.write_text(s,encoding='utf8')
p=Path('src/components/layout/PageTransition.tsx');s=p.read_text(encoding='utf8').replace('initial={{ opacity: 0 }}','initial={false}');p.write_text(s,encoding='utf8')
p=Path('src/components/home/Hero.tsx');s=p.read_text(encoding='utf8').replace("import gsap from 'gsap'\n",'').replace("import { ScrollTrigger } from 'gsap/ScrollTrigger'\n",'');s=s.replace('setPlayVideo(!window.matchMedia("(prefers-reduced-motion: reduce)").matches)','setPlayVideo(!window.matchMedia("(prefers-reduced-motion: reduce)").matches && window.matchMedia("(min-width: 768px)").matches)');start=s.index('  useEffect(() => {\n    if (reduced');end=s.index('\n\n  return (',start);s=s[:start]+s[end:];p.write_text(s,encoding='utf8')
for name in ['components/home/BrandStatement.tsx','components/home/SeatingZones.tsx','components/about/AboutContent.tsx']:
 p=Path('src')/name;s=p.read_text(encoding='utf8').replace("import gsap from 'gsap'\n",'').replace("import { ScrollTrigger } from 'gsap/ScrollTrigger'\n",'')
 start=s.index('  useEffect(() => {');end=s.index('\n\n  return (',start);block=s[start:end]
 body=block[block.index('{')+1:block.rfind('},')].replace('    return () => mm.revert()','    dispose = () => mm.revert()')
 replacement='''  useEffect(() => {
    if (!window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)').matches) return
    let cancelled = false
    let dispose: (() => void) | undefined
    void Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{default: gsap}, {ScrollTrigger}]) => {
      if (cancelled) return
'''+body+'''
    })
    return () => { cancelled = true; dispose?.() }
  }, '''+('[cinematic]' if 'AboutContent' in name else '[]')+''')'''
 s=s[:start]+replacement+s[end:];p.write_text(s,encoding='utf8')
p=Path('src/components/patterns/Patterns.tsx');s=p.read_text(encoding='utf8').replace('useId, useRef','useId, useRef, useEffect').replace("import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'\n",'');start=s.index('export function PatternBand');s=s[:start]+'''
export function PatternBand({kind='chevron',className='',duration=.9}:{kind?:PatternKind;className?:string;duration?:number}) {
 const ref=useRef<HTMLDivElement>(null)
 useEffect(()=>{
   const node=ref.current
   if(!node)return
   const observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){node.dataset.revealed='true';observer.disconnect()}},{threshold:.1})
   observer.observe(node)
   return ()=>observer.disconnect()
 },[])
 return <div ref={ref} className={`pattern-band relative h-8 overflow-hidden text-ink ${className}`} aria-hidden="true"><Pattern kind={kind} scale={.65} opacity={.7}/><div className="pattern-reveal-cover absolute inset-0 origin-right bg-[var(--pattern-ground,var(--color-cream))]" style={{transitionDuration:`${duration}s`}}/></div>
}
export function PatternTexture({kind='marks',opacity=.045}:{kind?:PatternKind;opacity?:number}) {
 return <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden"><div className="pattern-drift absolute -inset-y-4 inset-x-0"><Pattern kind={kind} scale={1.5} opacity={opacity}/></div></div>
}
''';p.write_text(s,encoding='utf8')
p=Path('src/components/gallery/GalleryGrid.tsx');s=p.read_text(encoding='utf8').replace('useMemo, useRef, useState','useMemo, useRef, useState, useEffect').replace(', useScroll, useTransform','')
start=s.index('  const ref = useRef<HTMLDivElement>(null)');end=s.index('  const vector =',start);s=s[:start]+s[end:]
s=s.replace('<div ref={ref} className="mb-4','<div className="mb-4').replace('<motion.div style={{ y, opacity }}>','<div>').replace('        </motion.div>\n      </Reveal>','        </div>\n      </Reveal>')
s=s.replace('                src={image.src}','                priority={index === 0}\n                src={image.src}')
s=s.replace('  const [activeCategory, setActiveCategory]', '  const [visibleCount, setVisibleCount] = useState(12)\n  const [activeCategory, setActiveCategory]')
s=s.replace('onClick={() => setActiveCategory(category)}','onClick={() => {setActiveCategory(category);setVisibleCount(12)}}').replace('{visibleImages.map((image, index) => (','{visibleImages.slice(0, visibleCount).map((image, index) => (')
start=s.index('          {galleryVideos.filter');end=s.index('\n        </motion.div>',start)
s=s[:start]+'''          {galleryVideos.filter(video=>activeCategory === 'All' || activeCategory === video.category).map(video=><LazyVideo key={video.id} video={video}/>)}'''+s[end:]
s=s.replace('      <AnimatePresence>\n        {activeIndex', '''      {visibleCount < visibleImages.length && <button type="button" className="my-8 border border-ink px-6 py-3 text-ink" onClick={()=>setVisibleCount(count=>count+12)}>Show more photographs ({visibleImages.length-visibleCount} remaining)</button>}
      <AnimatePresence>
        {activeIndex''')
s+='''
function LazyVideo({video}:{video:(typeof galleryVideos)[number]}) {
 const ref=useRef<HTMLElement>(null)
 const [near,setNear]=useState(false)
 useEffect(()=>{const node=ref.current;if(!node)return;const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){setNear(true);observer.disconnect()}},{rootMargin:'250px'});observer.observe(node);return()=>observer.disconnect()},[])
 return <figure ref={ref} className="mb-6 break-inside-avoid"><div className="bg-sand" style={{aspectRatio:`${video.width}/${video.height}`}}>{near && <video controls muted playsInline preload="none" poster={video.poster} aria-label={video.alt} width={video.width} height={video.height} className="h-auto w-full"><source src={video.webm} type="video/webm"/><source src={video.src} type="video/mp4"/></video>}</div><figcaption className="mt-3 text-sm text-umber">{video.alt}</figcaption></figure>
}
''';p.write_text(s,encoding='utf8')
