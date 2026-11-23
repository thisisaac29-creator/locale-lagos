from pathlib import Path
from PIL import Image,ImageOps,ImageDraw
import json, subprocess, hashlib
from pypdf import PdfReader
root=Path('public/locale-media'); out=Path('audit/brand'); rows=[]; thumbs=[]
for i,p in enumerate(sorted(root.iterdir())):
 r={'file':p.name,'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()}
 if p.suffix.lower()=='.jpg':
  im=Image.open(p).convert('RGB'); r.update(width=im.width,height=im.height,id=f'image-{len(thumbs)+1:02}')
  tile=Image.new('RGB',(300,330),'#eee6db'); tile.paste(ImageOps.contain(im,(300,295)),(0,0)); ImageDraw.Draw(tile).text((6,302),r['id']+' '+p.name[13:22],fill='black'); thumbs.append(tile)
  q=im.resize((120,120)).quantize(colors=8); r['palette']=[('#%02x%02x%02x'%tuple(q.getpalette()[c*3:c*3+3]),n) for n,c in sorted(q.getcolors(),reverse=True)]
 elif p.suffix=='.mp4':
  info=json.loads(subprocess.check_output(['ffprobe','-v','quiet','-show_format','-show_streams','-of','json',str(p)])); v=next(s for s in info['streams'] if s['codec_type']=='video'); r.update(width=v['width'],height=v['height'],duration=float(info['format']['duration']))
  r['id']='video-'+str(sum(x['file'].endswith('.mp4') for x in rows)+1)
  for j,f in enumerate([.1,.35,.6,.85]): subprocess.run(['ffmpeg','-v','error','-y','-ss',str(r['duration']*f),'-i',str(p),'-frames:v','1','-vf','scale=360:-1',str(out/f"{r['id']}-{j}.jpg")],check=True)
 elif p.suffix=='.pdf':
  pdf=PdfReader(p); r['pages']=len(pdf.pages); (out/(p.stem+'.txt')).write_text('\n\n'.join(f'PAGE {i+1}\n'+page.extract_text() for i,page in enumerate(pdf.pages)),encoding='utf8')
 rows.append(r)
for n in range(0,len(thumbs),12):
 sheet=Image.new('RGB',(1200,990),'white')
 for j,t in enumerate(thumbs[n:n+12]): sheet.paste(t,((j%4)*300,(j//4)*330))
 sheet.save(out/f'images-{n//12+1}.jpg')
json.dump(rows,open(out/'inventory.json','w'),indent=2)
lines=['# Source media inventory','','Source: `public/locale-media/`. Originals are read-only.','','| File | Dimensions / duration / pages | Bytes |','|---|---|---|']
for r in rows: lines.append(f"| {r['file']} | {str(r.get('width',''))+' × '+str(r.get('height','')) if 'width' in r else str(r.get('pages',''))+' pages'} {str(round(r['duration'],2))+'s' if 'duration' in r else ''} | {r['bytes']:,} |")
Path('docs/media-inventory.md').write_text('\n'.join(lines),encoding='utf8')
print(f'{len(thumbs)} images; {sum("duration" in r for r in rows)} videos; {sum("pages" in r for r in rows)} PDFs')
