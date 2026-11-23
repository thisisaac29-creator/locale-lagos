import json,base64,io,shutil
from pathlib import Path
from PIL import Image
rows=json.load(open('audit/brand/inventory.json')); output=[]; seen={}
captions=['Locale patterned wordmark','Locale wordmark on a geometric background','Colourful woven cords on wooden frames in the courtyard','Guests painting around a table beneath geometric murals','Guests painting around a table beneath geometric murals','Guests beside black and cream murals and woven pendant lights','Pottery activity beside leafy courtyard planting','Jewellery displayed on a pink table','Painting activity in the covered courtyard','Children shaping clay around a shared table','Guest holding a colourful pot against a geometric wall','Guests playing a tabletop game beside the windows','Guests playing a tabletop game beside the windows','Locale crafts and activities graphic','Covered seating facing the patterned bar','Guests displaying their paintings outdoors','Guests holding woven crafts in the courtyard','Hands shaping a pot on a pottery wheel','Games on a table beside the leafy courtyard','Guests decorating cakes beneath the mural','Crab dip fondue with bread dippers','Oat crusted fish fingers with dip','Korean BBQ chicken wings','Pork ribs on a plate','Selection of small plates on a wooden table','Grilled butterfly prawns','Grilled butterfly prawns','Chicken kung pao sizzler','Spicy pork rigatoni','Chicken pesto mac and cheese','Surf and turf with lobster','Butter garlic prawns and steamed buns','Salt and pepper cauliflower','Lamb and chicken burgers with fries','Crispy buffalo chicken bao','Pizzette on a woven placemat','Katsu chicken popcorn with curry leaf aioli','Locale fish and rice','Grazing table with fruit, cheese and prepared dishes','Layered dessert in a glass cup','Mixed grill platter with fries','Mini burgers and fries beside the courtyard','Dessert catering menu graphic','Small plates against the patterned wall','Mains catering menu graphic','Chocolate dessert with cream','Grills catering menu graphic','Dinner table facing the illuminated bar','Chicken bao on a patterned plate','Seafood platter in sunlight','Four food photographs in a collage','Sides catering menu graphic','Pork ribs against a geometric wall','Grazing table event collage','Locale signature grazing tables graphic','Grazing table celebration collage','Selection of catered dishes collage','Locale signature grazing tables graphic','Grazing tables with fruit and flowers','Grazing table catering graphic','Dessert and grazing table collage','Celebration cake and grazing table graphic','Floral event and grazing table collage','Grazing table with flowers and finger food']
for r in rows:
 if not r['file'].endswith('.jpg'): continue
 n=int(r['id'][-2:]); category='Food' if n>=21 else 'Space'
 if n in [3,7,9,16,17,19]: category='Courtyard'
 if n in [1,2,8,11,14,18,43,45,47,52]: category='Detail'
 if n in [4,5]: category='About'
 slug=r['id']; dest=Path('public/images')/category.lower(); dest.mkdir(parents=True,exist_ok=True)
 im=Image.open(Path('public/locale-media')/r['file']).convert('RGB'); im.thumbnail((1440,1440)); im.save(dest/(slug+'.webp'),quality=82,method=6)
 small=im.copy(); small.thumbnail((24,24)); buf=io.BytesIO(); small.save(buf,format='WEBP',quality=30)
 duplicate=seen.get(r['sha256']); seen[r['sha256']]=slug
 output.append(dict(id=slug,source=r['file'],src='/images/'+category.lower()+'/'+slug+'.webp',alt=captions[n-1],caption=captions[n-1],category=category,width=im.width,height=im.height,blurDataURL='data:image/webp;base64,'+base64.b64encode(buf.getvalue()).decode(),duplicateOf=duplicate,use=['about' if n==4 else 'detail/texture' if category=='Detail' else category.lower()]))
Path('src/data/media.ts').write_text('// Audited source files. Originals remain in public/locale-media.\nexport const media = '+json.dumps(output,ensure_ascii=False,indent=2)+' as const\n',encoding='utf8')
json.dump(output,open('audit/brand/media.json','w'),indent=2)
Path('public/menus').mkdir(exist_ok=True)
for r in rows:
 if r['file'].endswith('.pdf'): shutil.copy2(Path('public/locale-media')/r['file'],Path('public/menus')/r['file'].split('_')[-1])
print('Optimized',len(output),'images; PDF copies ready')
