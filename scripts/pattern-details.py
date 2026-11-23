from pathlib import Path
p=Path('src/components/patterns/Patterns.tsx');s=p.read_text(encoding='utf8').replace("import { useId }", "import { useId, useRef }").replace('motion, useReducedMotion','motion, useReducedMotion, useScroll, useTransform')
s+='''
/** A quiet decorative layer; all movement uses transforms and is disabled for reduced motion. */
export function PatternTexture({kind='marks',opacity=.045}:{kind?:PatternKind;opacity?:number}) {
 const ref=useRef<HTMLDivElement>(null)
 const reduced=useReducedMotion()
 const {scrollYProgress}=useScroll({target:ref,offset:['start end','end start']})
 const y=useTransform(scrollYProgress,[0,1],reduced?[0,0]:[-12,12])
 return <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden"><motion.div className="absolute -inset-y-4 inset-x-0" style={{y}}><Pattern kind={kind} scale={1.5} opacity={opacity}/></motion.div></div>
}
''';p.write_text(s,encoding='utf8')
p=Path('src/components/home/Hero.tsx');s=p.read_text(encoding='utf8').replace("import { site }", "import { PatternTexture } from '@/components/patterns/Patterns'\nimport { site }");s=s.replace('<div className="frame relative z-10 flex flex-1 flex-col pb-12">','<div className="frame relative z-10 flex flex-1 flex-col pb-12">\n        <PatternTexture/>');s=s.replace('<span>Scroll to explore</span>','<span>Scroll to explore</span>\n        {!reduced && <button type="button" className="border border-paper/60 px-3 py-2 text-xs tracking-normal" onClick={()=>setPlayVideo(value=>!value)}>{playVideo ? "Pause film" : "Play film"}</button>}');p.write_text(s,encoding='utf8')
p=Path('src/components/menu/MenuTabs.tsx');s=p.read_text(encoding='utf8').replace('{ PatternBand }','{ PatternBand, PatternTexture }').replace('<div className="mt-5">','<div className="relative mt-5"><PatternTexture kind="weave" opacity={.025}/>');p.write_text(s,encoding='utf8')
# Patterned tile frame without masking the photographed faces.
p=Path('src/components/about/AboutContent.tsx');s=p.read_text(encoding='utf8').replace("import { useEffect", "import { PatternBand } from '@/components/patterns/Patterns'\nimport { useEffect");s=s.replace('<div className="pattern-frame mt-14 grid gap-4 sm:mt-16 sm:grid-cols-[1.4fr_1fr]">','<div className="pattern-frame mt-14 grid gap-4 sm:mt-16 sm:grid-cols-[1.4fr_1fr]"><PatternBand kind="tile" className="sm:col-span-2"/>');p.write_text(s,encoding='utf8')
