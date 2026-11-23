from pathlib import Path
from pypdf import PdfReader
from PIL import Image,ImageOps,ImageDraw
p=next(Path('public/locale-media').glob('*Drinks*.pdf'));sheet=Image.new('RGB',(900,660),'#eee6db');imgs=[x for x in PdfReader(p).pages[7].images if x.name not in ['X4.jpg','X12.png']]
for i,x in enumerate(imgs):
 im=x.image.convert('RGB');thumb=ImageOps.contain(im,(300,300));sheet.paste(thumb,((i%3)*300,(i//3)*330));ImageDraw.Draw(sheet).text(((i%3)*300+5,(i//3)*330+305),x.name,fill='black')
sheet.save('audit/brand/pdf-drinks.jpg')
