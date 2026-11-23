import json,subprocess
from pathlib import Path
from PIL import Image
rows=json.load(open('audit/brand/inventory.json'));r=next(r for r in rows if r.get('id')=='video-7')
subprocess.run(['ffmpeg','-v','error','-y','-ss',str(r['duration']*.1),'-i',str(Path('public/locale-media')/r['file']),'-frames:v','1','audit/brand/hero-full.png'],check=True)
Image.open('audit/brand/hero-full.png').convert('RGB').save('public/video/hero-poster.webp',quality=88)
for base in [Path('public/images'),Path('public/video')]:
 for p in list(base.rglob('*.webp')):
  if '-w' in p.stem:continue
  for w in [360,640,960,1440]:
   im=Image.open(p).convert('RGB');im.thumbnail((w,10000));im.save(p.with_stem(p.stem+f'-w{w}'),quality=80,method=4)
print('Responsive WebP assets generated')
