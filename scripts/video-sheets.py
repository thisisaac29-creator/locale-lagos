from PIL import Image,ImageOps,ImageDraw
from pathlib import Path
for start in [1,4,7]:
 sheet=Image.new('RGB',(1200,990),'#eee6db')
 for row,v in enumerate(range(start,start+3)):
  for j in range(4):
   p=Path(f'audit/brand/video-{v}-{j}.jpg'); im=Image.open(p); tile=ImageOps.contain(im,(300,300)); sheet.paste(tile,(j*300,row*330)); ImageDraw.Draw(sheet).text((j*300+5,row*330+305),f'Video {v} / frame {j+1}',fill='black')
 sheet.save(f'audit/brand/videos-{start}.jpg')
