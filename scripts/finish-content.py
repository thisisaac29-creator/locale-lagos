from pathlib import Path
import json,re
photos=json.load(open('audit/brand/media.json',encoding='utf8'))
for p in Path('src').rglob('*.tsx'):
 s=p.read_text(encoding='utf8')
 s=re.sub(r'text-umber/(?:40|50|60|70)\b','text-umber/80',s)
 s=re.sub(r'text-ink/(?:40|50|60)\b','text-ink/80',s)
 for photo in photos:
  s=re.sub(r'(src="'+re.escape(photo['src'])+r'"\s+alt=")[^"]*(")',lambda m:m[1]+photo['alt']+m[2],s)
 p.write_text(s,encoding='utf8')
p=Path('audit/brand/browser-check.cjs');s=p.read_text(encoding='utf8').replace("waitUntil:'networkidle',timeout:60000","waitUntil:'domcontentloaded',timeout:60000").replace("await page.evaluate(async()=>", "await page.waitForLoadState('networkidle',{timeout:8000}).catch(()=>{});\n await page.evaluate(async()=>",1).replace('setTimeout(r,35)','setTimeout(r,80)').replace('await page.waitForTimeout(500);','await page.waitForFunction(()=>[...document.images].every(i=>i.complete),{},{timeout:20000}).catch(()=>{});await page.waitForTimeout(300);').replace("brokenImages:[...document.images].filter(x=>x.complete&&!x.naturalWidth)","brokenImages:[...document.images].filter(x=>!x.complete||!x.naturalWidth)");p.write_text(s,encoding='utf8')
