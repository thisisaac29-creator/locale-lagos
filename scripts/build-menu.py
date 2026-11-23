import json,re
from pathlib import Path
out=[]
def cat(name,items,note=None):
 d=dict(id=re.sub('[^a-z0-9]+','-',name.lower()).strip('-'),name=name,items=items)
 if note:d['note']=note
 return d
def item(name,price,description=None):
 d=dict(name=name,price=int(price) if str(price).isdigit() else str(price) if price is not None else None)
 if description:d['description']=description
 return d
headers=['bar bites','pizzettes','salads','small plates','pasta','mains','sides','grills','between buns']
food=[]
for file in ['Food-1-0','Food-1-1','Food-2-0','Food-2-1']:
 s=Path('audit/brand/'+file+'.txt').read_text(encoding='utf8')
 s=re.sub(r'(\d+,)\n(\d+)',r'\1 \2',s)
 for a,b in [('CHILLI GARLIC MUSHROOMS\nOR PRAWNS','CHILLI GARLIC MUSHROOMS OR PRAWNS'),('CHICKEN OR\nPRAWN)','CHICKEN OR PRAWN)'),('CHICKEN\nOR PRAWN)','CHICKEN OR PRAWN)'),('MINI SLIDERS\n(VEGETABLE','MINI SLIDERS (VEGETABLE'),('WITH\nHOUSE','WITH HOUSE')]:s=s.replace(a,b)
 current=None; last=None; subgroup=None
 for line in s.splitlines():
  line=line.strip()
  if line in headers:
   current=cat(line,[]);food.append(current);last=None;subgroup=None
  elif line.startswith(('please inform','prices are','vegetarian spicy')):continue
  elif line.startswith('add ons:'):current['note']=line
  elif line.startswith(('TAQUERIA:','GYOZAS:')):subgroup=line;last=None
  elif re.match(r'.+\|\s*\d',line):
   name,price=line.rsplit('|',1);last=item(name.strip(),price.strip());current['items'].append(last)
   if subgroup and name[0].islower():last['group']=subgroup
   else:subgroup=None
  elif line and last:last['description']=(last.get('description','')+' '+line).strip()
# The unboxed right-column dishes continue mains, below the boxed grills.
grills=next(c for c in food if c['name']=='grills');main=next(c for c in food if c['name']=='mains'); main['items']+=grills['items'][8:];grills['items']=grills['items'][:8]
veg=['SMASH POTATOES','CHIPS & DIP','WHIPPED GREEK YOGURT','SNACK BOWL TRIO','YAM CHIPS','TRUFFLE FRIES','MARGHERITA','VEGETERIANA','MUSHROOM PESTO','TRUFFLE BIANCO','FOUR CHEESE','BEETROOT & GOATS CHEESE SALAD','SALT & PEPPER CAULIFLOWER','LOADED FRIES','SMASHED FALAFEL','vegetable','CLASSIC PESTO, ALFREDO OR ARRABBIATA','AGLIO E OGLIO MUSHROOM SPAGHETTI']
for c in food:
 for x in c['items']:
  if x['name'] in veg:x['tags']=['V']
  if x['name'].startswith(('KIMCHI','KUNG PAO','CHILLI SESAME','CHILLI GARLIC MUSHROOMS')):x['dietaryNote']='Vegetarian symbol printed; applies to the vegetarian option. Please confirm with your server.'
# Read two-column page in column order, retaining the continuation of mains.
order=['bar bites','pizzettes','salads','small plates','pasta','mains','sides','grills','between buns'];food.sort(key=lambda c:order.index(c['name']))
def text(kind):return next(Path('audit/brand').glob('*Locale-'+kind+'-Menu.txt')).read_text(encoding='utf8')
def inline(s):
 result=[];last=None
 for line in s.splitlines():
  line=line.strip()
  m=re.match(r'(.+?)\s*\|\s*(\d+)\s*$',line)
  if m:last=item(m[1],m[2]);result.append(last)
  elif line and last:last['description']=(last.get('description','')+' '+line).strip()
 return result
d=text('Drinks');drinks=[cat('house signatures',inline(d.split('PAGE 2\n')[1].split('the classics')[0]))]
def table(name,lines,note=None):
 items=[]
 for l in lines.strip().split('\n'):
  parts=l.split('~');items.append(item(parts[0],parts[1],parts[2] if len(parts)>2 else None))
 drinks.append(cat(name,items,note))
table('the classics','''NEGRONI~6500
COSMOPOLITAN~6500
TEQUILA SUNRISE~6500
OLD FASHIONED~7500
MOJITO~7500
WHISKEY SOUR~8000
PIÑA COLADA~9500
GIN BASIL~9500
APEROL SPRITZ~9500
SANGRIA (RED OR WHITE WINE)~10000
LONG ISLAND ICED TEA~10500''')
table('‘ritas & ’tinis','''CLASSIC MARTINI~6500~(gin & extra dry vermouth)
ESPRESSO MARTINI~7000
LYCHEE-TINI~7000
APPLETINI~7500
SHAKEN TIRAMISU MARTINI~12000
CLASSIC MARGARITA~6500~(tequila, triple sec, lime juice) choose between: shaken or frozen
SPICY MARGARITA~7000
CUCUMBERITA~7000
ZOBO-RITA~7000
MANGO MARGARITA~9500
CHILLI PASSION FRUIT~10500
STRAWBERRY MARGARITA~10500''')
table('tequila','''DON JULIO BLANCO~210000
DON JULIO REPOSADO~220000
CASAMIGOS REPOSADO~220000
OLMECA SILVER~3000 | 60000
EL SUEÑO SILVER~4000 | 80000
EL SUEÑO GOLD~5000 | 90000
VIVIR BLANCO~170000
VIVIR REPOSADO~200000''')
table('single malt whisky','''SINGLETON 12~8000 | 160000
SINGLETON 15~200000
GLENFIDDICH 12YRS~8000 | 160000
GLENFIDDICH 15YRS~200000
MACALLAN DOUBLE CASK 12YRS~210000''')
table('blended scotch whisky','''JW BLONDE~3500 | 60000
JW BLACK LABEL~5500 | 110000
JW GOLD LABEL~130000
JW GREEN LABEL~210000
JW 18YRS~270000
JW BLUE LABEL~650000
CHIVAS 12YRS~5500 | 110000
CHIVAS 18YRS~195000''')
table('champagne','''MOËT BRUT~210000
VEUVE CLIQUOT~220000''')
table('prosecco','''MARTINI PROSECCO~15000| 50000
INDEPENDENT PROSECCO~60000''')
table('rum','''BACCARDI WHITE~3000 | 45000
BACCARDI DARK~3000 | 45000''')
table('vodka','''CIROC~4500 | 95000
KETEL ONE~4000 | 70000
ABSOLUT~3500 | 60000
GREY GOOSE~6000 | 120000''')
table('gin','''TANQUERAY NO 10~5000 | 115000
BOMBAY SAPPHIRE~3500 | 55000
CAPE TOWN DRY GIN~3500 | 60000
DRUMSHAMBO GUNPOWDER IRISH GIN~5000 | 105000
HENDRICK'S~5000 | 105000''')
table('whiskey','''JAMESON~4000 | 70000
JACK DANIEL'S~4000 | 70000
JAMESON BLACK BARREL~6000 | 110000''')
table('cognac','''MARTELL VS~6000 | 125000
HENNESSY VS~8000 | 145000
HENNESSY VSOP~205000''')
table('liqueurs',"""BAILEY'S IRISH CREAM~4000 | 65000
CAMPARI~3000 | 45000
JÄGERMEISTER~3000 | 50000""")
table('beer','\n'.join(n+'~3500' for n in ['TROPHY','HEINEKEN','BUDWEISER ROYALE','GUINNESS STOUT','GUINNESS SMOOTH','SMIRNOFF ICE']))
table('draught','''HEINEKEN~3000
GUINNESS~3000
BUDWEISER~3000
BATURE LAGOS LARGER (> 4.5%)~4500''')
table('malt','MALTA GUINNESS~2500')
table('red','''4TH STREET~5000 | 18000
CASTILLO~5500 | 20000
FOUR COUSINS~7500 | 22000
SWARTLAND SERENGETI SWEET RED~23000
CARLO ROSSI~26000
GEORGES DUBOEUF CÔTES DE RHONE~10000 | 32000
SANTA RITA 120 RESERVA MALBEC~35000
SANTA RITA 120 RESERVA CABERNET SAUVIGNON~35000
VILLA ANTINORI TOSCANA~100000''','BY GLASS | BOTTLE')
table('rosé','''DARLING CELLARS~30000
WHISPERING ANGEL~80000''','BY GLASS | BOTTLE')
table('white','''CASTILLO~5000 | 18000
FOUR COUSINS~7500 | 22000
SWARTLAND SERENGETI SWEET WHITE~23000
CARLO ROSSI~26000
DARLING CELLARS~9000 | 30000
GEORGES DUBOEUF SAUVIGNON BLANC~45000
SUN GODDESS SAUVIGNON BLANC~90000
VILLA ANTINORI TOSCANA~100000''','BY GLASS | BOTTLE')
table('the usuals','''WATER 75CL~1200
SOFT DRINKS CAN 33CL~1500
PRESERVED JUICE~4000
ENERGY DRINK~5000
SPARKLING WATER~6500''')
drinks.append(cat('shakes & smoothies',inline(d.split('shakes & smoothies\n')[1].split('hot drinks')[0])))
drinks.append(cat('non-alcoholic coolers',inline(d.split('non-alcoholic coolers\n')[1].split('PAGE 7')[0])))
table('hot drinks','''AMERICANO~3000
ASSORTED TEA FLAVOURS~3000
SINGLE ESPRESSO~3000
DOUBLE ESPRESSO~4500
HOT CHOCOLATE~5500
CAPPUCCINO~5500
CAFÉ LATTE~5500
COLD COFFEE~8000
HOT MULLED APPLE TEA~15000''')
shisha=[cat('shisha',[item('shisha',12000)]),cat('fresh fruit shisha',[item('fresh fruit shisha',18000)]),cat('premium shisha',[item('premium shisha',25000,'double-head shisha on fresh fruit')]),cat('flavours',[item(n,None) for n in d.split('flavours\n')[-1].split('PAGE 8')[0].strip().splitlines()])]
drinks+=shisha
dess=text('Dessert');desserts=[cat('desserts',inline(dess.split('desserts\n')[1].split('dulce')[0])),cat('hot drinks',inline(dess.split('PAGE 2')[1]))]
# IDs are globally unique across menu tabs.
for ident,name,cats,pdf in [('food','Food',food,'Food'),('drinks','Drinks',drinks,'Drinks'),('desserts-shisha','Desserts',desserts,'Dessert')]:
 for c in cats:c['id']=ident+'-'+c['id']
 out.append(dict(id=ident,name=name,intro='prices are inclusive of all taxes',pdf='/menus/Locale-'+pdf+'-Menu.pdf',categories=cats))
header="""// Transcribed from supplied PDFs; see docs/menu-review.md. Strings preserve printed multi-prices.
export type DietaryTag = 'V' | 'VG' | 'GF'
export interface MenuItem { name: string; description?: string; price: number | string | null; tags?: DietaryTag[]; group?: string; dietaryNote?: string }
export interface MenuCategory { id: string; name: string; items: MenuItem[]; note?: string }
export interface MenuSection { id: 'food' | 'drinks' | 'desserts-shisha'; name: string; intro: string; pdf: string; categories: MenuCategory[] }
export const dietaryTagLabels: Record<DietaryTag,string> = { V: 'Vegetarian', VG: 'Vegan', GF: 'Gluten free' }
export const fullMenuLink = '/menus/Locale-Food-Menu.pdf'
export const menuData: MenuSection[] = """
Path('src/data/menu.ts').write_text(header+json.dumps(out,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
print([(s['name'],sum(len(c['items']) for c in s['categories'])) for s in out])
