'use client'

import { useId, useRef, useEffect } from 'react'

export type PatternKind = 'tile' | 'chevron' | 'weave' | 'rings' | 'marks'
export interface PatternProps { color?: string; scale?: number; opacity?: number; className?: string; kind?: PatternKind }
const paths: Record<PatternKind, React.ReactNode> = {
  tile: <><path d="M0 0h48L24 24ZM48 48H0l24-24Z" fill="currentColor"/><path d="m0 24 24-24 24 24-24 24Z" fill="none" stroke="currentColor" strokeWidth="2"/></>,
  chevron: <><path d="m-24 0 24 24L24 0 48 24 72 0M-24 24 24 72 72 24" fill="none" stroke="currentColor" strokeWidth="5"/><path d="m18 36 6-6 6 6-6 6Z" fill="currentColor"/></>,
  weave: <path d="M4 0v20m8-20v20m8-20v20M28 24v24m8-24v24m8-24v24M24 4h24M24 12h24M24 20h24M0 28h24M0 36h24M0 44h24" fill="none" stroke="currentColor" strokeWidth="2"/>,
  rings: <><circle cx="24" cy="24" r="18" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="24" cy="24" r="12" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="24" cy="24" r="5" fill="currentColor"/></>,
  marks: <><path d="m4 8 6 6 6-6m16 24 6 6 6-6M28 6h16M28 12h16M4 30v12M10 30v12" fill="none" stroke="currentColor" strokeWidth="2.5"/><circle cx="22" cy="24" r="2" fill="currentColor"/></>,
}
/** Original repeat geometry derived from photographed tiles, mural lines and woven objects. */
export function Pattern({kind='tile',color='currentColor',scale=1,opacity=1,className=''}:PatternProps) {
 const id=useId().replace(/:/g,'')
 return <svg aria-hidden="true" focusable="false" className={`pointer-events-none h-full w-full ${className}`} style={{color,opacity}}><defs><pattern id={id} width={48*scale} height={48*scale} patternUnits="userSpaceOnUse"><g transform={`scale(${scale})`}>{paths[kind]}</g></pattern></defs><rect width="100%" height="100%" fill={`url(#${id})`}/></svg>
}
export const TilePattern=(props:PatternProps)=><Pattern {...props} kind="tile"/>
export const ChevronPattern=(props:PatternProps)=><Pattern {...props} kind="chevron"/>
export const WeavePattern=(props:PatternProps)=><Pattern {...props} kind="weave"/>
export const RingPattern=(props:PatternProps)=><Pattern {...props} kind="rings"/>
export const MarkPattern=(props:PatternProps)=><Pattern {...props} kind="marks"/>

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
