import pdfplumber
from pathlib import Path
for kind in ['Food','Drinks','Dessert']:
 p=next(Path('public/locale-media').glob('*'+kind+'*.pdf'))
 with pdfplumber.open(p) as pdf:
  for i,page in enumerate(pdf.pages):
   if kind=='Food' or (kind=='Drinks' and i==2):
    for side,(a,b) in enumerate([(0,.49),(.49,1)]):
     txt=page.crop((page.width*a,page.bbox[1],page.width*b,page.bbox[3])).extract_text(); Path(f'audit/brand/{kind}-{i+1}-{side}.txt').write_text(txt or '',encoding='utf8')

