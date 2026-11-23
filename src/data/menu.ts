// Transcribed from supplied PDFs; see docs/menu-review.md. Strings preserve printed multi-prices.
export type DietaryTag = 'V' | 'VG' | 'GF'
export interface MenuItem { name: string; description?: string; price: number | string | null; tags?: DietaryTag[]; group?: string; dietaryNote?: string }
export interface MenuCategory { id: string; name: string; items: MenuItem[]; note?: string }
export interface MenuSection { id: 'food' | 'drinks' | 'desserts-shisha'; name: string; intro: string; pdf: string; categories: MenuCategory[] }
export const dietaryTagLabels: Record<DietaryTag,string> = { V: 'Vegetarian', VG: 'Vegan', GF: 'Gluten free' }
export const fullMenuLink = '/menus/Locale-Food-Menu.pdf'
export const menuData: MenuSection[] = [
  {
    "id": "food",
    "name": "Food",
    "intro": "prices are inclusive of all taxes",
    "pdf": "/menus/Locale-Food-Menu.pdf",
    "categories": [
      {
        "id": "food-bar-bites",
        "name": "bar bites",
        "items": [
          {
            "name": "SMASH POTATOES",
            "price": 3500,
            "description": "(smashed & fried baby potatoes, served with chipotle aioli)",
            "tags": [
              "V"
            ]
          },
          {
            "name": "CHIPS & DIP",
            "price": 4500,
            "description": "(homemade corn nacho chips, avocado guacamole, tomato salsa)",
            "tags": [
              "V"
            ]
          },
          {
            "name": "WHIPPED GREEK YOGURT",
            "price": 5500,
            "description": "(cucumber & carrot sticks with homemade Greek yogurt dip, dried fruit & nuts)",
            "tags": [
              "V"
            ]
          },
          {
            "name": "SNACK BOWL TRIO",
            "price": 5500,
            "description": "(popcorn, sweet potato chips, homemade breadsticks)",
            "tags": [
              "V"
            ]
          },
          {
            "name": "YAM CHIPS",
            "price": 6500,
            "description": "(suya rubbed, served with tomato rodo stew)",
            "tags": [
              "V"
            ]
          },
          {
            "name": "TRUFFLE FRIES",
            "price": 7000,
            "description": "(truffle oil, parmesan, served with garlic gravy)",
            "tags": [
              "V"
            ]
          },
          {
            "name": "SOUP OF THE DAY",
            "price": 7000
          }
        ]
      },
      {
        "id": "food-pizzettes",
        "name": "pizzettes",
        "items": [
          {
            "name": "MARGHERITA",
            "price": 7500,
            "description": "(tomato, basil, mozzarella)",
            "tags": [
              "V"
            ]
          },
          {
            "name": "VEGETERIANA",
            "price": 10000,
            "description": "(seasonal mixed vegetables, tomato, mozzarella)",
            "tags": [
              "V"
            ]
          },
          {
            "name": "MUSHROOM PESTO",
            "price": 10000,
            "description": "(basil pesto, sautéed mushroom, mozzarella, parmesan)",
            "tags": [
              "V"
            ]
          },
          {
            "name": "TRUFFLE BIANCO",
            "price": 10500,
            "description": "(mushroom, mozzarella, truffle oil)",
            "tags": [
              "V"
            ]
          },
          {
            "name": "NAIJA PEPPER",
            "price": 13000,
            "description": "(shredded chicken, pickled jalapeños & onions, tomato, mozzarella)"
          },
          {
            "name": "CHICKEN TIKKA",
            "price": 13000,
            "description": "(Indian spiced roast chicken, tomato, mozzarella, with onions & green chillies)"
          },
          {
            "name": "FOUR CHEESE",
            "price": 13500,
            "description": "(mozzarella, parmesan, ricotta, brie)",
            "tags": [
              "V"
            ]
          },
          {
            "name": "JAMON",
            "price": 15000,
            "description": "(thinly sliced ham, jalapeño, tomato, mozzarella)"
          },
          {
            "name": "DIAVOLA",
            "price": 15000,
            "description": "(pork pepperoni, tomato, mozzarella)"
          },
          {
            "name": "VODKA SAUCE (CHICKEN OR PEPPERONI)",
            "price": 15000,
            "description": "(tomato vodka cream sauce, choice of tender shredded chicken or pepperoni)"
          }
        ]
      },
      {
        "id": "food-salads",
        "name": "salads",
        "items": [
          {
            "name": "BEETROOT & GOATS CHEESE SALAD",
            "price": 9000,
            "description": "(beetroot chunks, goats cheese, pickled cucumber, wild greens, strawberry vinaigrette, candied nuts)",
            "tags": [
              "V"
            ]
          },
          {
            "name": "CHARRED CHICKEN CAESAR SALAD",
            "price": 12000,
            "description": "(grilled lettuce, oven roasted chicken, parmesan, Caesar dressing)"
          },
          {
            "name": "ASIAN CRAB SALAD",
            "price": 12500,
            "description": "(shredded vegetables & crab meat, tangy sesame mayo dressing)"
          }
        ],
        "note": "add ons: chicken (3500) or prawns (6500)"
      },
      {
        "id": "food-small-plates",
        "name": "small plates",
        "items": [
          {
            "name": "SALT & PEPPER CAULIFLOWER",
            "price": 5000,
            "description": "(twice cooked cauliflower with peppers, onions and Asian five spice)",
            "tags": [
              "V"
            ]
          },
          {
            "name": "KATSU CHICKEN NUGGETS",
            "price": 7500,
            "description": "(crisp, spiced chicken nuggets served with curry leaf aioli)"
          },
          {
            "name": "LOADED FRIES",
            "price": 7500,
            "description": "(fries topped with garlic aioli, pickled jalapeños, cheddar cheese) add: chicken (6000)",
            "tags": [
              "V"
            ]
          },
          {
            "name": "BUFFALO FRIED CHICKEN BAO",
            "price": 8500,
            "description": "(pillowy bao buns stuffed with crispy fried chicken, in sticky buffalo sauce topped with crunchy Asian slaw)"
          },
          {
            "name": "SMASHED FALAFEL",
            "price": 8500,
            "description": "(our take on the middle eastern classic)",
            "tags": [
              "V"
            ]
          },
          {
            "name": "KOREAN FRIED CHICKEN WINGS",
            "price": 9000,
            "description": "(crisp chicken wings tossed in a Korean BBQ sauce)"
          },
          {
            "name": "pulled pork",
            "price": 9000,
            "group": "TAQUERIA: HAND-CRAFTED SOFT SHELL TACOS"
          },
          {
            "name": "birria lamb",
            "price": 11000,
            "group": "TAQUERIA: HAND-CRAFTED SOFT SHELL TACOS"
          },
          {
            "name": "curried pineapple shrimp",
            "price": 13000,
            "group": "TAQUERIA: HAND-CRAFTED SOFT SHELL TACOS"
          },
          {
            "name": "vegetable",
            "price": 5500,
            "group": "GYOZAS: ASIAN DUMPLINGS SERVED WITH HOUSE MADE CHILLI CRISP",
            "tags": [
              "V"
            ]
          },
          {
            "name": "chicken & chive",
            "price": 7000,
            "group": "GYOZAS: ASIAN DUMPLINGS SERVED WITH HOUSE MADE CHILLI CRISP"
          },
          {
            "name": "PORK BELLY SKEWERS",
            "price": 11000,
            "description": "(grilled pork on sticks with suya spice rub served with a peppery cassava salad)"
          },
          {
            "name": "CRAB DIP FONDUE",
            "price": 11000,
            "description": "(cheesy crab dip, crisp bread dippers)"
          },
          {
            "name": "PRAWN TOSTADA",
            "price": 11500,
            "description": "(mini corn tortilla chips topped with guacamole & grilled prawns)"
          },
          {
            "name": "CHILLI GARLIC MUSHROOMS OR PRAWNS",
            "price": 12000,
            "description": "(tossed in garlic and chilli oil with olives & herbs, bread dippers on the side)",
            "dietaryNote": "Vegetarian symbol printed; applies to the vegetarian option. Please confirm with your server."
          },
          {
            "name": "OAT CRUSTED FISH FINGERS",
            "price": 12500,
            "description": "(served with spicy tartare sauce)"
          }
        ]
      },
      {
        "id": "food-pasta",
        "name": "pasta",
        "items": [
          {
            "name": "CLASSIC PESTO, ALFREDO OR ARRABBIATA",
            "price": 7000,
            "tags": [
              "V"
            ]
          },
          {
            "name": "AGLIO E OGLIO MUSHROOM SPAGHETTI",
            "price": 9000,
            "description": "(spaghetti with chilli garlic sautéed mushrooms)",
            "tags": [
              "V"
            ]
          },
          {
            "name": "CRISPY BACON ALFREDO",
            "price": 10000,
            "description": "(silky creamy spaghetti with crisp bacon chunks)"
          },
          {
            "name": "CREAMY CHICKEN PESTO MACARONI",
            "price": 10000,
            "description": "(macaroni pasta shells tossed with chicken in a creamy pesto sauce)"
          },
          {
            "name": "SPICY PORK RIGATONI",
            "price": 12500,
            "description": "(rigatoni pasta tubes with chunks of spicy pork in a peppery blush sauce)"
          },
          {
            "name": "BAKED LOBSTER MAC ‘N’ CHEESE",
            "price": 13500,
            "description": "(lobster chunks & macaroni pasta, cheesy tomato sauce, baked crust)"
          },
          {
            "name": "LOCALE SEAFOOD PASTA",
            "price": 18500,
            "description": "(mix seafood, spaghetti, locale seafood sauce)"
          }
        ],
        "note": "add ons: chicken (3500) or prawns (6500)"
      },
      {
        "id": "food-mains",
        "name": "mains",
        "items": [
          {
            "name": "KIMCHI FRIED RICE",
            "price": 7500,
            "description": "(house fermented kimchi, choice of chicken or tofu satay, spicy peanut sauce, asian fried rice)",
            "dietaryNote": "Vegetarian symbol printed; applies to the vegetarian option. Please confirm with your server."
          },
          {
            "name": "CHICKEN & CHIPS POUTINE",
            "price": 11000,
            "description": "(breaded chicken fillet, fries, house gravy)"
          },
          {
            "name": "LEMON BUTTER GRILLED SOLE FISH",
            "price": 12500,
            "description": "(served with lemon dill sauce, grilled potatoes & onions)"
          },
          {
            "name": "LAMB RIB PEPPER SOUP NOODLES",
            "price": 12500,
            "description": "(locally sourced lamb chops, traditional naija broth with noodles)"
          },
          {
            "name": "EVERYTHING JOLLOF",
            "price": 13000,
            "description": "(jollof rice tossed in mixed vegetables, shredded chicken & prawns served alongside plantain & tomato rodo stew)"
          },
          {
            "name": "LOW-CAL GRILLED CHICKEN",
            "price": 13500,
            "description": "(grilled escalope, green salad, fries & black pepper sauce)"
          },
          {
            "name": "LOCALE FISH & RICE",
            "price": 13500,
            "description": "(grilled croaker, jalapeño coriander sauce with spiced fried rice)"
          },
          {
            "name": "SHEPHERD’S PIE",
            "price": 15000,
            "description": "(minced lamb pie, served with garlic mash, black pepper sauce & garden greens)"
          },
          {
            "name": "KUNG PAO SIZZLER (VEGETABLE, CHICKEN OR PRAWN)",
            "price": "10000, 14000, 17500",
            "description": "(roasted vegetables, fries, choice of noodles or rice, kung pao sizzling gravy)",
            "dietaryNote": "Vegetarian symbol printed; applies to the vegetarian option. Please confirm with your server."
          },
          {
            "name": "ONE PAN CHICKEN & RICE",
            "price": 15000,
            "description": "(locally sourced chicken roasted & served in a creamy rodo-infused rice)"
          },
          {
            "name": "CHILLI SESAME NOODLES (VEGETABLE, CHICKEN OR PRAWN)",
            "price": "11500, 15500, 19000",
            "description": "(Asian noodles, summer vegetables, chilli crunch)",
            "dietaryNote": "Vegetarian symbol printed; applies to the vegetarian option. Please confirm with your server."
          },
          {
            "name": "PRAWN ESCALOPE",
            "price": 15500,
            "description": "(cheesy breaded prawns on spicy tomato sauce, served with creamy tomato spaghetti)"
          },
          {
            "name": "SEAFOOD PAELLA (SERVES TWO)",
            "price": 25500,
            "description": "(prawns, calamari, fish, shellfish, & crab claws in a spiced saffron rice. cooked & served in the same pan)"
          },
          {
            "name": "LOCALE SURF & TURF",
            "price": 28000,
            "description": "(seasoned lamb chunks & lobster, grilled potatoes & onion served with a peppery cream sauce)"
          },
          {
            "name": "BUTTER GARLIC CRAB OR PRAWNS",
            "price": "15000, 25000",
            "description": "(cooked & served in the shell, tossed in a garlic & chilli butter sauce served with Locale steamed buns)"
          },
          {
            "name": "CAJUN SEAFOOD BROIL",
            "price": 27000,
            "description": "(sizzling medley of succulent seafood, golden potatoes, and sweetcorn, smothered in Cajun butter sauce."
          }
        ]
      },
      {
        "id": "food-sides",
        "name": "sides",
        "items": [
          {
            "name": "FRENCH FRIES",
            "price": 3000
          },
          {
            "name": "SWEET POTATO FRIES",
            "price": 3000
          },
          {
            "name": "FRIED PLANTAIN",
            "price": 3000
          },
          {
            "name": "JOLLOF RICE",
            "price": 4000
          },
          {
            "name": "FRIED RICE",
            "price": 4000
          },
          {
            "name": "BREAD BASKET",
            "price": 5000
          }
        ]
      },
      {
        "id": "food-grills",
        "name": "grills",
        "items": [
          {
            "name": "CHICKEN SUYA",
            "price": 4500
          },
          {
            "name": "LAMB SUYA",
            "price": 5500
          },
          {
            "name": "GRILLED CHICKEN ON THE BONE",
            "price": "8000, 14500, 28500",
            "description": "(quarter, half, or full)"
          },
          {
            "name": "BUTTERFLY PRAWNS",
            "price": 12000
          },
          {
            "name": "CATCH OF THE DAY",
            "price": 12500,
            "description": "(croaker or red snapper)"
          },
          {
            "name": "PORK RIBS",
            "price": 15000
          },
          {
            "name": "SUYA PLATTER",
            "price": 18000,
            "description": "(chicken suya, lamb suya, quarter grilled chicken, fries, rodo stew, spiced flat bread)"
          },
          {
            "name": "LOCALE PLATTER",
            "price": 24000,
            "description": "(butterfly prawns, grilled fish, pork ribs, fries, rodo stew, spiced flat bread)"
          }
        ]
      },
      {
        "id": "food-between-buns",
        "name": "between buns",
        "items": [
          {
            "name": "MINI SLIDERS (VEGETABLE,CHICKEN, PULLED PORK)",
            "price": "7500, 8500, 9000",
            "description": "mini burgers with choice of filling, served with fries)"
          },
          {
            "name": "BUTTERMILK FRIED CHICKEN BURGER",
            "price": 13500,
            "description": "(Chicken fillet marinated overnight in spicy buttermilk fried to a crispy perfection)"
          },
          {
            "name": "DOUBLE PATTY LAMB BURGER",
            "price": 18000,
            "description": "(grilled lamb Pattys, sauteed onions, cheese melt, served with crisp onion rings)"
          }
        ]
      }
    ]
  },
  {
    "id": "drinks",
    "name": "Drinks",
    "intro": "prices are inclusive of all taxes",
    "pdf": "/menus/Locale-Drinks-Menu.pdf",
    "categories": [
      {
        "id": "drinks-house-signatures",
        "name": "house signatures",
        "items": [
          {
            "name": "SPICY GUAVA MARY",
            "price": 6500,
            "description": "(KETEL ONE vodka with guava juice, tabasco & celery, our take on the classic)"
          },
          {
            "name": "PINEAPPLE MINT MOJITO",
            "price": 6500,
            "description": "(pineapple chunks, fresh mint, white rum)"
          },
          {
            "name": "HONEY DEUCE",
            "price": 6500,
            "description": "(mixed seasonal melon, honey melon syrup, dark rum, brandy)"
          },
          {
            "name": "LYCHEE CHILLI VODKA",
            "price": 7000,
            "description": "(sweet, spicy, sour, strong! jalapeño, lime, green chilli, KETEL ONE vodka)"
          },
          {
            "name": "LAVENDER GIN GIMLET",
            "price": 8000,
            "description": "(GORDON’S GIN, lavender, lime)"
          },
          {
            "name": "VANILLA WHISKY SOUR",
            "price": 8500,
            "description": "(smoked vanilla bean syrup, BLACK & WHITE whisky & lime)"
          },
          {
            "name": "LOCALE PICANTÉ",
            "price": 8500,
            "description": "(jalapeño, ata-rodo, tequila, lime)"
          },
          {
            "name": "COCO-PINE",
            "price": 9000,
            "description": "(pineapple, coconut milk, blue curaçao, white rum)"
          },
          {
            "name": "WATERMELON BASIL SMASH TIKI",
            "price": 9000,
            "description": "(watermelon basil juice with GORDON’S GIN served in a tall tiki glass)"
          }
        ]
      },
      {
        "id": "drinks-the-classics",
        "name": "the classics",
        "items": [
          {
            "name": "NEGRONI",
            "price": 6500
          },
          {
            "name": "COSMOPOLITAN",
            "price": 6500
          },
          {
            "name": "TEQUILA SUNRISE",
            "price": 6500
          },
          {
            "name": "OLD FASHIONED",
            "price": 7500
          },
          {
            "name": "MOJITO",
            "price": 7500
          },
          {
            "name": "WHISKEY SOUR",
            "price": 8000
          },
          {
            "name": "PIÑA COLADA",
            "price": 9500
          },
          {
            "name": "GIN BASIL",
            "price": 9500
          },
          {
            "name": "APEROL SPRITZ",
            "price": 9500
          },
          {
            "name": "SANGRIA (RED OR WHITE WINE)",
            "price": 10000
          },
          {
            "name": "LONG ISLAND ICED TEA",
            "price": 10500
          }
        ]
      },
      {
        "id": "drinks-ritas-tinis",
        "name": "‘ritas & ’tinis",
        "items": [
          {
            "name": "CLASSIC MARTINI",
            "price": 6500,
            "description": "(gin & extra dry vermouth)"
          },
          {
            "name": "ESPRESSO MARTINI",
            "price": 7000
          },
          {
            "name": "LYCHEE-TINI",
            "price": 7000
          },
          {
            "name": "APPLETINI",
            "price": 7500
          },
          {
            "name": "SHAKEN TIRAMISU MARTINI",
            "price": 12000
          },
          {
            "name": "CLASSIC MARGARITA",
            "price": 6500,
            "description": "(tequila, triple sec, lime juice) choose between: shaken or frozen"
          },
          {
            "name": "SPICY MARGARITA",
            "price": 7000
          },
          {
            "name": "CUCUMBERITA",
            "price": 7000
          },
          {
            "name": "ZOBO-RITA",
            "price": 7000
          },
          {
            "name": "MANGO MARGARITA",
            "price": 9500
          },
          {
            "name": "CHILLI PASSION FRUIT",
            "price": 10500
          },
          {
            "name": "STRAWBERRY MARGARITA",
            "price": 10500
          }
        ]
      },
      {
        "id": "drinks-tequila",
        "name": "tequila",
        "items": [
          {
            "name": "DON JULIO BLANCO",
            "price": 210000
          },
          {
            "name": "DON JULIO REPOSADO",
            "price": 220000
          },
          {
            "name": "CASAMIGOS REPOSADO",
            "price": 220000
          },
          {
            "name": "OLMECA SILVER",
            "price": "3000 | 60000"
          },
          {
            "name": "EL SUEÑO SILVER",
            "price": "4000 | 80000"
          },
          {
            "name": "EL SUEÑO GOLD",
            "price": "5000 | 90000"
          },
          {
            "name": "VIVIR BLANCO",
            "price": 170000
          },
          {
            "name": "VIVIR REPOSADO",
            "price": 200000
          }
        ]
      },
      {
        "id": "drinks-single-malt-whisky",
        "name": "single malt whisky",
        "items": [
          {
            "name": "SINGLETON 12",
            "price": "8000 | 160000"
          },
          {
            "name": "SINGLETON 15",
            "price": 200000
          },
          {
            "name": "GLENFIDDICH 12YRS",
            "price": "8000 | 160000"
          },
          {
            "name": "GLENFIDDICH 15YRS",
            "price": 200000
          },
          {
            "name": "MACALLAN DOUBLE CASK 12YRS",
            "price": 210000
          }
        ]
      },
      {
        "id": "drinks-blended-scotch-whisky",
        "name": "blended scotch whisky",
        "items": [
          {
            "name": "JW BLONDE",
            "price": "3500 | 60000"
          },
          {
            "name": "JW BLACK LABEL",
            "price": "5500 | 110000"
          },
          {
            "name": "JW GOLD LABEL",
            "price": 130000
          },
          {
            "name": "JW GREEN LABEL",
            "price": 210000
          },
          {
            "name": "JW 18YRS",
            "price": 270000
          },
          {
            "name": "JW BLUE LABEL",
            "price": 650000
          },
          {
            "name": "CHIVAS 12YRS",
            "price": "5500 | 110000"
          },
          {
            "name": "CHIVAS 18YRS",
            "price": 195000
          }
        ]
      },
      {
        "id": "drinks-champagne",
        "name": "champagne",
        "items": [
          {
            "name": "MOËT BRUT",
            "price": 210000
          },
          {
            "name": "VEUVE CLIQUOT",
            "price": 220000
          }
        ]
      },
      {
        "id": "drinks-prosecco",
        "name": "prosecco",
        "items": [
          {
            "name": "MARTINI PROSECCO",
            "price": "15000| 50000"
          },
          {
            "name": "INDEPENDENT PROSECCO",
            "price": 60000
          }
        ]
      },
      {
        "id": "drinks-rum",
        "name": "rum",
        "items": [
          {
            "name": "BACCARDI WHITE",
            "price": "3000 | 45000"
          },
          {
            "name": "BACCARDI DARK",
            "price": "3000 | 45000"
          }
        ]
      },
      {
        "id": "drinks-vodka",
        "name": "vodka",
        "items": [
          {
            "name": "CIROC",
            "price": "4500 | 95000"
          },
          {
            "name": "KETEL ONE",
            "price": "4000 | 70000"
          },
          {
            "name": "ABSOLUT",
            "price": "3500 | 60000"
          },
          {
            "name": "GREY GOOSE",
            "price": "6000 | 120000"
          }
        ]
      },
      {
        "id": "drinks-gin",
        "name": "gin",
        "items": [
          {
            "name": "TANQUERAY NO 10",
            "price": "5000 | 115000"
          },
          {
            "name": "BOMBAY SAPPHIRE",
            "price": "3500 | 55000"
          },
          {
            "name": "CAPE TOWN DRY GIN",
            "price": "3500 | 60000"
          },
          {
            "name": "DRUMSHAMBO GUNPOWDER IRISH GIN",
            "price": "5000 | 105000"
          },
          {
            "name": "HENDRICK'S",
            "price": "5000 | 105000"
          }
        ]
      },
      {
        "id": "drinks-whiskey",
        "name": "whiskey",
        "items": [
          {
            "name": "JAMESON",
            "price": "4000 | 70000"
          },
          {
            "name": "JACK DANIEL'S",
            "price": "4000 | 70000"
          },
          {
            "name": "JAMESON BLACK BARREL",
            "price": "6000 | 110000"
          }
        ]
      },
      {
        "id": "drinks-cognac",
        "name": "cognac",
        "items": [
          {
            "name": "MARTELL VS",
            "price": "6000 | 125000"
          },
          {
            "name": "HENNESSY VS",
            "price": "8000 | 145000"
          },
          {
            "name": "HENNESSY VSOP",
            "price": 205000
          }
        ]
      },
      {
        "id": "drinks-liqueurs",
        "name": "liqueurs",
        "items": [
          {
            "name": "BAILEY'S IRISH CREAM",
            "price": "4000 | 65000"
          },
          {
            "name": "CAMPARI",
            "price": "3000 | 45000"
          },
          {
            "name": "JÄGERMEISTER",
            "price": "3000 | 50000"
          }
        ]
      },
      {
        "id": "drinks-beer",
        "name": "beer",
        "items": [
          {
            "name": "TROPHY",
            "price": 3500
          },
          {
            "name": "HEINEKEN",
            "price": 3500
          },
          {
            "name": "BUDWEISER ROYALE",
            "price": 3500
          },
          {
            "name": "GUINNESS STOUT",
            "price": 3500
          },
          {
            "name": "GUINNESS SMOOTH",
            "price": 3500
          },
          {
            "name": "SMIRNOFF ICE",
            "price": 3500
          }
        ]
      },
      {
        "id": "drinks-draught",
        "name": "draught",
        "items": [
          {
            "name": "HEINEKEN",
            "price": 3000
          },
          {
            "name": "GUINNESS",
            "price": 3000
          },
          {
            "name": "BUDWEISER",
            "price": 3000
          },
          {
            "name": "BATURE LAGOS LARGER (> 4.5%)",
            "price": 4500
          }
        ]
      },
      {
        "id": "drinks-malt",
        "name": "malt",
        "items": [
          {
            "name": "MALTA GUINNESS",
            "price": 2500
          }
        ]
      },
      {
        "id": "drinks-red",
        "name": "red",
        "items": [
          {
            "name": "4TH STREET",
            "price": "5000 | 18000"
          },
          {
            "name": "CASTILLO",
            "price": "5500 | 20000"
          },
          {
            "name": "FOUR COUSINS",
            "price": "7500 | 22000"
          },
          {
            "name": "SWARTLAND SERENGETI SWEET RED",
            "price": 23000
          },
          {
            "name": "CARLO ROSSI",
            "price": 26000
          },
          {
            "name": "GEORGES DUBOEUF CÔTES DE RHONE",
            "price": "10000 | 32000"
          },
          {
            "name": "SANTA RITA 120 RESERVA MALBEC",
            "price": 35000
          },
          {
            "name": "SANTA RITA 120 RESERVA CABERNET SAUVIGNON",
            "price": 35000
          },
          {
            "name": "VILLA ANTINORI TOSCANA",
            "price": 100000
          }
        ],
        "note": "BY GLASS | BOTTLE"
      },
      {
        "id": "drinks-ros",
        "name": "rosé",
        "items": [
          {
            "name": "DARLING CELLARS",
            "price": 30000
          },
          {
            "name": "WHISPERING ANGEL",
            "price": 80000
          }
        ],
        "note": "BY GLASS | BOTTLE"
      },
      {
        "id": "drinks-white",
        "name": "white",
        "items": [
          {
            "name": "CASTILLO",
            "price": "5000 | 18000"
          },
          {
            "name": "FOUR COUSINS",
            "price": "7500 | 22000"
          },
          {
            "name": "SWARTLAND SERENGETI SWEET WHITE",
            "price": 23000
          },
          {
            "name": "CARLO ROSSI",
            "price": 26000
          },
          {
            "name": "DARLING CELLARS",
            "price": "9000 | 30000"
          },
          {
            "name": "GEORGES DUBOEUF SAUVIGNON BLANC",
            "price": 45000
          },
          {
            "name": "SUN GODDESS SAUVIGNON BLANC",
            "price": 90000
          },
          {
            "name": "VILLA ANTINORI TOSCANA",
            "price": 100000
          }
        ],
        "note": "BY GLASS | BOTTLE"
      },
      {
        "id": "drinks-the-usuals",
        "name": "the usuals",
        "items": [
          {
            "name": "WATER 75CL",
            "price": 1200
          },
          {
            "name": "SOFT DRINKS CAN 33CL",
            "price": 1500
          },
          {
            "name": "PRESERVED JUICE",
            "price": 4000
          },
          {
            "name": "ENERGY DRINK",
            "price": 5000
          },
          {
            "name": "SPARKLING WATER",
            "price": 6500
          }
        ]
      },
      {
        "id": "drinks-shakes-smoothies",
        "name": "shakes & smoothies",
        "items": [
          {
            "name": "MILKSHAKE",
            "price": 7500,
            "description": "(vanilla, chocolate, caramel, strawberry, banana, oreo)"
          },
          {
            "name": "PARFAIT",
            "price": 7500,
            "description": "(yogurt, banana, apple, grapes, coconut)"
          },
          {
            "name": "PURPLE REIGN",
            "price": 6000,
            "description": "(ice cream, blueberries, banana)"
          },
          {
            "name": "GOING BANANAS",
            "price": 6000,
            "description": "(ice cream, tiger nuts, banana, dates)"
          },
          {
            "name": "BERRY DELIGHT",
            "price": 6000,
            "description": "(ice cream, strawberries, blueberries, yogurt)"
          }
        ]
      },
      {
        "id": "drinks-non-alcoholic-coolers",
        "name": "non-alcoholic coolers",
        "items": [
          {
            "name": "CHAPMAN",
            "price": 5500,
            "description": "(grenadine, orange juice, fanta, bitters)"
          },
          {
            "name": "SHIRLEY TEMPLE",
            "price": 5500,
            "description": "(grenadine, lychee juice, soda)"
          },
          {
            "name": "VIRGIN MOJITO",
            "price": 5500,
            "description": "(mint, lime, soda)"
          },
          {
            "name": "ICED TEA",
            "price": 6500,
            "description": "(peach or lemon)"
          },
          {
            "name": "LAVENDER LEMONADE",
            "price": 7500,
            "description": "(lavender, sweet & sour mix, soda)"
          }
        ]
      },
      {
        "id": "drinks-hot-drinks",
        "name": "hot drinks",
        "items": [
          {
            "name": "AMERICANO",
            "price": 3000
          },
          {
            "name": "ASSORTED TEA FLAVOURS",
            "price": 3000
          },
          {
            "name": "SINGLE ESPRESSO",
            "price": 3000
          },
          {
            "name": "DOUBLE ESPRESSO",
            "price": 4500
          },
          {
            "name": "HOT CHOCOLATE",
            "price": 5500
          },
          {
            "name": "CAPPUCCINO",
            "price": 5500
          },
          {
            "name": "CAFÉ LATTE",
            "price": 5500
          },
          {
            "name": "COLD COFFEE",
            "price": 8000
          },
          {
            "name": "HOT MULLED APPLE TEA",
            "price": 15000
          }
        ]
      },
      {
        "id": "drinks-shisha",
        "name": "shisha",
        "items": [
          {
            "name": "shisha",
            "price": 12000
          }
        ]
      },
      {
        "id": "drinks-fresh-fruit-shisha",
        "name": "fresh fruit shisha",
        "items": [
          {
            "name": "fresh fruit shisha",
            "price": 18000
          }
        ]
      },
      {
        "id": "drinks-premium-shisha",
        "name": "premium shisha",
        "items": [
          {
            "name": "premium shisha",
            "price": 25000,
            "description": "double-head shisha on fresh fruit"
          }
        ]
      },
      {
        "id": "drinks-flavours",
        "name": "flavours",
        "items": [
          {
            "name": "LEMON",
            "price": null
          },
          {
            "name": "COOL GRAPE",
            "price": null
          },
          {
            "name": "PINEAPPLE",
            "price": null
          },
          {
            "name": "STRAWBERRY",
            "price": null
          },
          {
            "name": "LIME",
            "price": null
          },
          {
            "name": "RED GRAPEFRUIT",
            "price": null
          },
          {
            "name": "PEACH",
            "price": null
          },
          {
            "name": "BARBERRY",
            "price": null
          },
          {
            "name": "BLACK CURRANT",
            "price": null
          },
          {
            "name": "DOUBLE APPLE",
            "price": null
          },
          {
            "name": "WATERMELON",
            "price": null
          },
          {
            "name": "SICILIAN ORANGE",
            "price": null
          },
          {
            "name": "PINKBOOM",
            "price": null
          },
          {
            "name": "BRAINFREEZE",
            "price": null
          },
          {
            "name": "PAAN",
            "price": null
          },
          {
            "name": "MINT",
            "price": null
          }
        ]
      }
    ]
  },
  {
    "id": "desserts-shisha",
    "name": "Desserts",
    "intro": "prices are inclusive of all taxes",
    "pdf": "/menus/Locale-Dessert-Menu.pdf",
    "categories": [
      {
        "id": "desserts-shisha-desserts",
        "name": "desserts",
        "items": [
          {
            "name": "COCONUT PUDDING",
            "price": 5500,
            "description": "(warm coconut custard cooked in coconut shells, burnt sugar crust)"
          },
          {
            "name": "HONEY FRENCH TOAST",
            "price": 6000,
            "description": "(crispy honey French toast, custard filling, vanilla ice cream)"
          },
          {
            "name": "CHOCOLATE MOUSSE",
            "price": 7000,
            "description": "(decadent, thick, dark, creamy. enough said)"
          },
          {
            "name": "MOCHA MILK CAKE",
            "price": 8500,
            "description": "(chocolate milk cake, espresso cream, hazelnut ganache)"
          },
          {
            "name": "UPSIDE DOWN ICECREAM SUNDAE",
            "price": 12000,
            "description": "(assorted ice cream, crisp waffle cone)"
          },
          {
            "name": "HOT COOKIE DOUGH",
            "price": 15000,
            "description": "(20 minutes bake time) (a collab with our favourite Lagos café, we bring you hot, fudgey cookie dough baked on a skillet, served with chocolate sauce & vanilla ice cream)"
          }
        ]
      },
      {
        "id": "desserts-shisha-hot-drinks",
        "name": "hot drinks",
        "items": [
          {
            "name": "AMERICANO",
            "price": 3000
          },
          {
            "name": "SINGLE ESPRESSO",
            "price": 3000
          },
          {
            "name": "ASSORTED TEA FLAVOURS",
            "price": 3000
          },
          {
            "name": "DOUBLE ESPRESSO",
            "price": 4000
          },
          {
            "name": "HOT CHOCOLATE",
            "price": 5500
          },
          {
            "name": "CAPPUCCINO",
            "price": 5500
          },
          {
            "name": "CAFÉ LATTE",
            "price": 5500
          },
          {
            "name": "COLD COFFEE",
            "price": 8000
          },
          {
            "name": "HOT MULLED APPLE TEA",
            "price": 15000
          }
        ]
      }
    ]
  }
]
