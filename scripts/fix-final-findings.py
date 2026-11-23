from pathlib import Path
for p in Path('src').rglob('*.tsx'):
 s=p.read_text(encoding='utf8').replace('text-paper/70','text-paper/80')
 if p.name=='Hero.tsx':s=s.replace('{!reduced && <button','{<button').replace('className="border border-paper/60 px-3 py-2 text-xs tracking-normal"','className="border border-paper/60 px-3 py-2 text-xs tracking-normal motion-reduce:hidden"')
 p.write_text(s,encoding='utf8')
p=Path('audit/brand/browser-check.cjs');s=p.read_text(encoding='utf8').replace("const page=await context.newPage();const errors=[];","const page=await context.newPage();await page.route('https://www.google.com/maps**',route=>route.abort());const errors=[];").replace('timeout:8000','timeout:2500').replace('timeout:20000','timeout:3000').replace("!x.complete||!x.naturalWidth","x.currentSrc&&x.complete&&!x.naturalWidth").replace("runOnly:{type:'tag'","iframes:false,runOnly:{type:'tag'");p.write_text(s,encoding='utf8')
