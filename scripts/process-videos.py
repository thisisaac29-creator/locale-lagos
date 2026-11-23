import json,subprocess,shutil
from pathlib import Path
from PIL import Image
rows=json.load(open('audit/brand/inventory.json'));dest=Path('public/video');dest.mkdir(exist_ok=True);videos=[];seen=set()
for r in rows:
 if 'duration' not in r:continue
 if r['sha256'] in seen:continue
 seen.add(r['sha256']);src=Path('public/locale-media')/r['file'];id=r['id']
 for ext,args in [('mp4',['-c:v','libx264','-preset','fast','-crf','28','-movflags','+faststart']),('webm',['-c:v','libvpx-vp9','-b:v','0','-crf','38','-deadline','realtime','-cpu-used','6'])]:
  subprocess.run(['ffmpeg','-v','error','-y','-i',str(src),'-an','-vf','scale=540:-2','-r','24',*args,str(dest/(id+'.'+ext))],check=True)
 Image.open(f'audit/brand/{id}-1.jpg').save(dest/(id+'.webp'),quality=85)
 videos.append(dict(id=id,src=f'/video/{id}.mp4',webm=f'/video/{id}.webm',poster=f'/video/{id}.webp',alt={'video-1':'Food and the Locale team','video-2':'Burgers and fries','video-3':'Burgers and fries','video-4':'Small plates at Locale','video-5':'Small plates and a blue cocktail','video-6':'Fish, potatoes and a glass of wine','video-7':'A tour through Locale’s dining spaces','video-8':'Craft market at Locale','video-9':'People and music at Locale'}[id],category='Space' if id in ['video-7','video-8','video-9'] else 'Drinks' if id in ['video-5','video-6'] else 'Food',width=r['width'],height=r['height']))
 print(id,'ready',flush=True)
# Separate short silent interior hero, preserve vertical framing on mobile.
r=next(r for r in rows if r.get('id')=='video-7');src=Path('public/locale-media')/r['file']
for ext,args in [('mp4',['-c:v','libx264','-preset','fast','-crf','26','-movflags','+faststart']),('webm',['-c:v','libvpx-vp9','-b:v','0','-crf','36','-deadline','realtime','-cpu-used','6'])]:
 subprocess.run(['ffmpeg','-v','error','-y','-ss','0','-i',str(src),'-t','12','-an','-vf','scale=720:-2','-r','24',*args,str(dest/('hero.'+ext))],check=True)
Image.open('audit/brand/video-7-0.jpg').save(dest/'hero-poster.webp',quality=90)
Path('src/data/videos.ts').write_text('export const galleryVideos = '+json.dumps(videos,ensure_ascii=False,indent=2)+' as const\n',encoding='utf8')
print('hero bytes', (dest/'hero.mp4').stat().st_size)
