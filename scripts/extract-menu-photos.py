from pathlib import Path
from pypdf import PdfReader
import json,io,base64
p=next(Path('public/locale-media').glob('*Drinks*.pdf'));photos=json.load(open('audit/brand/media.json',encoding='utf8'));photos=[m for m in photos if not m['id'].startswith('drink-pdf-')]
descriptions={'X15.jpg':'Creamy drink in a glass jar beside a woven chair','X16.jpg':'Golden cocktail with citrus garnish on a woven placemat','X17.jpg':'Blue cocktail with citrus and pineapple garnish','X18.jpg':'Creamy cocktail with a biscuit on the rim'}
dest=Path('public/images/drinks');dest.mkdir(exist_ok=True)
for x in PdfReader(p).pages[7].images:
 if x.name not in descriptions:continue
 ident='drink-pdf-'+x.name.split('.')[0].lower();im=x.image.convert('RGB');im.save(dest/(ident+'.webp'),quality=82)
 for w in [360,640,960,1440]:
  sized=im.copy();sized.thumbnail((w,10000));sized.save(dest/(ident+f'-w{w}.webp'),quality=80)
 small=im.copy();small.thumbnail((24,24));buffer=io.BytesIO();small.save(buffer,format='WEBP',quality=30)
 photos.append(dict(id=ident,source=p.name+' / page 8 / '+x.name,src='/images/drinks/'+ident+'.webp',alt=descriptions[x.name],caption=descriptions[x.name],category='Drinks',width=im.width,height=im.height,blurDataURL='data:image/webp;base64,'+base64.b64encode(buffer.getvalue()).decode(),duplicateOf=None,use=['drinks']))
Path('src/data/media.ts').write_text('// Audited originals plus four photographs extracted from the supplied Drinks PDF.\nexport const media = '+json.dumps(photos,ensure_ascii=False,indent=2)+' as const\n',encoding='utf8')
json.dump(photos,open('audit/brand/media.json','w',encoding='utf8'),indent=2,ensure_ascii=False)
p=Path('src/components/home/GalleryTeaser.tsx');s=p.read_text(encoding='utf8').replace("'image-04','image-23','image-19','image-49'","'image-04','image-23','image-19','drink-pdf-x17'");p.write_text(s,encoding='utf8')
print('Extracted four clean drink photographs; omitted two embedded social-interface screenshots')
