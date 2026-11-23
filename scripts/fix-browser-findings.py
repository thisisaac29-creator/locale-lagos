from pathlib import Path
import re
for p in Path('src').rglob('*'):
 if p.suffix not in ['.ts','.tsx','.css']:continue
 s=p.read_text(encoding='utf8')
 for c in '·–—’‘“”↗→…₦é':
  try:s=s.replace(c.encode('utf8').decode('cp1252'),c)
  except UnicodeDecodeError:pass
 p.write_text(s,encoding='utf8')
def edit(name,fn):
 p=Path('src')/name;p.write_text(fn(p.read_text(encoding='utf8')),encoding='utf8')
edit('components/menu/MenuTabs.tsx',lambda s:re.sub(r"import type \{ Variants \} from 'framer-motion'\n",'',s).replace("import { simpleFade, swift } from '@/lib/motion'\n",'').replace('function MenuItemRow({ item, reduced }: { item: MenuItem; reduced: boolean })','function MenuItemRow({ item }: { item: MenuItem })').replace('<motion.li\n      variants={reduced ? simpleFade : itemVariants}','<li').replace('</motion.li>','</li>').replace('<motion.span\n          variants={reduced ? simpleFade : priceVariants}','<span').replace('</motion.span>\n      )}','</span>\n      )}').replace('<MenuItemRow key={item.name} item={item} reduced={reduced} />','<MenuItemRow key={item.name} item={item} />').replace('<motion.ul\n                      variants={reduced ? stillListVariants : listVariants}\n                      initial="hidden"\n                      animate="visible"\n                    >','<ul className="menu-items">').replace('</motion.ul>','</ul>'))
edit('components/menu/MenuTabs.tsx',lambda s:re.sub(r'const listVariants: Variants = .*?function MenuItemRow','function MenuItemRow',s,flags=re.S))
edit('components/ui/Wordmark.tsx',lambda s:s.replace('      aria-label={site.fullName}','      role="img"\n      aria-label={site.fullName}'))
edit('components/home/SeatingZones.tsx',lambda s:s.replace('<div ref={track} className=', '<div ref={track} tabIndex={0} role="region" aria-label="Four seating spaces" className='))
edit('components/home/SignatureDishes.tsx',lambda s:s.replace("import { RevealGroup } from '@/components/motion/Reveal'\n",'').replace('<RevealGroup className=','<div tabIndex={0} role="region" aria-label="Signature dishes" className=').replace('</RevealGroup>','</div>'))
for file in ['components/home/HappyHourFeature.tsx','components/offers/OffersContent.tsx']:
 edit(file,lambda s:s.replace('useState(() => isWithin(offer))','useState(false)'))
edit('components/ui/OpenNowBadge.tsx',lambda s:s.replace('useState<boolean>(() => isOpenNow())','useState<boolean | null>(null)').replace('useState<boolean>(() => isWithin(offers[0]))','useState(false)').replace("{open ? 'Open now' : 'Closed'}","{open === null ? 'Victoria Island' : open ? 'Open now' : 'Closed'}"))
# Server and first client render use the same poster; motion video is mounted after preferences are known.
edit('components/home/Hero.tsx',lambda s:s.replace("useEffect, useRef","useEffect, useRef, useState").replace('  const reduced = useReducedMotion()','  const reduced = useReducedMotion()\n  const [playVideo, setPlayVideo] = useState(false)\n  useEffect(() => { setPlayVideo(!window.matchMedia("(prefers-reduced-motion: reduce)").matches) }, [reduced])').replace('site.heroVideo.available && !reduced','site.heroVideo.available && playVideo').replace('text-[clamp(3.1rem,10vw,9rem)]','text-[clamp(2rem,9vw,8rem)]').replace('initial={{ opacity: 0, y: reduced ? 0 : 22 }}','initial={false}').replace('className="absolute inset-0 bg-ink/60"','className="absolute inset-0 bg-ink/65"'))
# Always give navigation an opaque, readable ground, including the video hero.
edit('components/layout/Header.tsx',lambda s:s.replace("'bg-transparent py-5'","'bg-cream py-5'"))
# Tailwind needs RGB channels to produce opacity utilities with CSS variables.
p=Path('tailwind.config.ts');s=p.read_text(encoding='utf8');s=re.sub(r"'(var\(--color-([a-z]+)\))'",lambda m:"'rgb(var(--color-"+m[2]+"-rgb) / <alpha-value>)'",s);s=s.replace('-0.045em','-0.035em');p.write_text(s,encoding='utf8')
p=Path('src/app/globals.css');s=p.read_text(encoding='utf8');colors=dict(re.findall(r'--color-([a-z]+): #(\w{6});',s));channels='\n'.join('  --color-'+name+'-rgb: '+' '.join(str(int(value[i:i+2],16)) for i in [0,2,4])+';' for name,value in colors.items());s=s.replace(':root {',':root {\n'+channels);p.write_text(s,encoding='utf8')
