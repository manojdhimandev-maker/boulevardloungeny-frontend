export type MenuSubItem = {
  name: string;
  description?: string;
  price: string;
  tags?: string[];
  image?: string;
  images?: string[];
  details?: string[];
};

export type MenuGroup = {
  id: string;
  title: string;
  blurb: string;
  image: string;
  imageAlt: string;
  items: MenuSubItem[];
  enhancements?: string;
  notes?: string[];
};

export type MenuSection = {
  id: string;
  label: string;
  short: string;
  groups: MenuGroup[];
};

export const menu: MenuSection[] = [
  {
    id: 'cocktails',
    label: 'Craft Cocktails',
    short: 'Cocktails',
    groups: [
      {
        id: 'craft-cocktails',
        title: 'Craft Cocktails',
        blurb: 'Handcrafted signature pours made with luxury spirits, fresh citrus, and bespoke house blends.',
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800',
        imageAlt: 'Craft cocktail in luxury glass',
        items: [
          {
            name: 'LIQUID GOLD',
            description: 'Casamigos Reposado, Remy Martin VSOP, Pineapple & Mango, topped with prosecco. A rich taste of 24k gold leaf on top.',
            price: '26',
            tags: ['24k Gold Leaf', 'Luxury Pour'],
            image: '/instaposts-imeages/drink_liquid_gold.jpg',
          },
          {
            name: 'MON CHERI',
            description: 'Vodka, Elderflower, Italian Cherry Juice, Cranberry Juice, finished with a romantic smoke bubble.',
            price: '21',
            tags: ['Smoke Bubble Effect', 'House Signature'],
            image: '/cocktails-with-name/mon_cherri.jpg',
            images: [
              '/cocktails-with-name/mon_cherri.jpg',
              '/cocktails-with-name/mon_cherri_2.jpg',
              '/cocktails-with-name/mon_cherri_3.jpg',
              '/cocktails-with-name/mon_cherri_4.jpg',
              '/cocktails-with-name/mon_cherri_5.jpg',
            ],
          },
          {
            name: 'LOVE BOMB',
            description: 'Gin, Elderflower, Hibiscus, Raspberry, prosecco. A sexy glittery explosion while a hibiscus flower descends to the bottom.',
            price: '22',
            tags: ['Glittery Sparkle', 'Edible Hibiscus'],
            image: '/cocktails-with-name/love_bomb.jpg',
            images: [
              '/cocktails-with-name/love_bomb.jpg',
              '/cocktails-with-name/love_bomb_2.jpg',
              '/cocktails-with-name/love_bomb_3.jpg',
              '/cocktails-with-name/love_bomb_4.jpg',
            ],
          },
          {
            name: 'MIDNIGHT MIRAGE',
            description: 'Empress Indigo Gin, Blue Curaçao, Fresh Lemon, Lavender & Sparkling Soda with a mystical color-shifting glow.',
            price: '20',
            tags: ['Color Shifting', 'Botanical Craft'],
            image: '/cocktails-with-name/midnight_mirage.jpg',
            images: [
              '/cocktails-with-name/midnight_mirage.jpg',
              '/cocktails-with-name/midnight_mirage_2.jpg',
              '/cocktails-with-name/midnight_mirage_3.jpg',
              '/cocktails-with-name/midnight_mirage_4.jpg',
              '/cocktails-with-name/midnight_mirage_5.jpg',
            ],
          },
          {
            name: 'AFTERGLOW',
            description: 'Aperol, Vanilla Vodka, Vanilla syrup, lemon juice. A perfect light bittersweet sip from day to night.',
            price: '17',
            tags: ['Day-to-Night Sip', 'Bittersweet Citrus'],
            image: '/cocktails-with-name/afterglow.jpg',
            images: [
              '/cocktails-with-name/afterglow.jpg',
              '/cocktails-with-name/afterglow_2.jpg',
              '/cocktails-with-name/afterglow_3.jpg',
              '/cocktails-with-name/afterglow_4.jpg',
              '/cocktails-with-name/afterglow_5.jpg',
            ],
          },
          {
            name: 'SPA SPRITZ',
            description: 'Gin, cucumber juice, lime juice, prosecco. An effortlessly refreshing sip for pure relaxation.',
            price: '17',
            tags: ['Crisp & Refreshing'],
            image: '/cocktails-with-name/spa_spritz.jpg',
            images: [
              '/cocktails-with-name/spa_spritz.jpg',
              '/cocktails-with-name/spa_spritz_2.jpg',
              '/cocktails-with-name/spa_spritz_3.jpg',
              '/cocktails-with-name/spa_spritz_4.jpg',
            ],
          },
          {
            name: 'SUNRISE KISS',
            description: 'Clase Azul, Grand Marnier, Pineapple Juice, with a cherry gradient. A luxury.',
            price: '28',
            tags: ['Ultra Luxury', 'Clase Azul'],
            image: '/instaposts-imeages/drink_sunrise_kiss.jpg',
          },
          {
            name: 'MELON MONROE',
            description: 'Casamigos Blanco, Watermelon, jalapeño, Lime and agave. A perfect touch of spice, dangerously good.',
            price: '18',
            tags: ['Spicy Watermelon'],
            image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&q=80&w=800',
          },
          {
            name: 'BERRY BLVD',
            description: 'Gin, Chambord, lemon juice, raspberry. A smooth blend of sour and sweet.',
            price: '18',
            tags: ['Smooth & Fruity'],
            image: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&q=80&w=800',
          },
          {
            name: 'RUM AWAY WITH ME',
            description: 'Dark and Coconut Rum, Tropical fruity flavors with a hint of citrus. A Vacation in every sip.',
            price: '21',
            tags: ['Tropical Pour'],
            image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&q=80&w=800',
          },
          {
            name: 'THE NEXT BEST THING',
            description: 'Vanilla Vodka, Passion Fruit, sour citrus, topped with Prosecco. Simple and sweet.',
            price: '17',
            tags: ['Passion Fruit Prosecco'],
            image: 'https://images.unsplash.com/photo-1587223075055-82e9a937ddff?auto=format&fit=crop&q=80&w=800',
          },
          {
            name: 'FKN FIG MARTINI',
            description: 'Fig and Vanilla vodka, Elderflower, Cranberry Juice. A perfect balance of tart and sweet.',
            price: '19',
            tags: ['Craft Specialty'],
            image: 'https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?auto=format&fit=crop&q=80&w=800',
          },
          {
            name: 'EMBER OLD FASHION',
            description: 'Bourbon, Blood orange, Angostura Bitters and Orange Bitters. A Smoked wood finish.',
            price: '19',
            tags: ['Smoked Finish'],
            image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800',
          },
        ],
      },
    ],
  },
  {
    id: 'bottle-reserve',
    label: 'Bottle Reserve',
    short: 'Bottles',
    groups: [
      {
        id: 'premium-bottle-reserve',
        title: 'Premium Bottle Reserve',
        blurb: 'VIP bottle service presented with sparklers, custom ice displays, and mixers.',
        image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800',
        imageAlt: 'Premium bottle service with ice bucket',
        items: [
          {
            name: 'DON JULIO 1942 TEQUILA',
            description: 'Iconic luxury añejo tequila with smooth vanilla, oak, and warm agave notes.',
            price: '565',
            tags: ['VIP Top Shelf'],
            image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800',
          },
          {
            name: 'CLASE AZUL REPOSADO TEQUILA',
            description: 'Artisanal ultra-premium reposado tequila aged in bourbon barrels.',
            price: '525',
            tags: ['VIP Top Shelf'],
            image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800',
          },
          {
            name: 'PATRÓN SILVER TEQUILA',
            description: 'Handcrafted 100% Weber Blue Agave smooth silver tequila.',
            price: '295',
            tags: ['Premium Reserve'],
            image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&q=80&w=800',
          },
          {
            name: 'CASAMIGOS REPOSADO / BLANCO',
            description: 'Ultra-smooth small batch agave tequila.',
            price: '295',
            tags: ['Crowd Favorite'],
            image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&q=80&w=800',
          },
          {
            name: 'TITO\'S HANDMADE VODKA',
            description: 'Distilled 6 times in copper pot stills for ultimate purity.',
            price: '295',
            tags: ['Handcrafted'],
            image: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&q=80&w=800',
          },
          {
            name: 'GREY GOOSE VODKA',
            description: 'Premium French wheat vodka crafted with natural spring water.',
            price: '295',
            tags: ['French Luxury'],
            image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800',
          },
          {
            name: 'MOËT & CHANDON CHAMPAGNE',
            description: 'Iconic French champagne with bright fruitiness and elegant maturity.',
            price: '295',
            tags: ['Sparkling Champagne'],
            image: 'https://images.unsplash.com/photo-1569919659476-f0852f6834b7?auto=format&fit=crop&q=80&w=800',
          },
          {
            name: 'VEUVE CLICQUOT BRUT CHAMPAGNE',
            description: 'Signature yellow label brut champagne with pinot noir richness.',
            price: '295',
            tags: ['Sparkling Champagne'],
            image: 'https://images.unsplash.com/photo-1558001373-7b93ee48ffa0?auto=format&fit=crop&q=80&w=800',
          },
        ],
      },
    ],
  },
  {
    id: 'hookah-vault',
    label: 'Hookah Vault',
    short: 'Hookah',
    groups: [
      {
        id: 'classic-profiles',
        title: 'Classic Profiles ($50)',
        blurb: 'Smooth traditional hookah blends prepared with natural coconut charcoal.',
        image: '/instaposts-imeages/menu_card_hookah.jpg',
        imageAlt: 'Classic Hookah Shisha',
        notes: [
          'Serbetli: Lime Peach Ice, Watermelon Ice, Passion Fruit Ice, Strawberry Ice, Blueberry Ice, Lemon Mint, Mint, Sweet Melon',
          'Adalya: Love 66, Lady Killer, Berlin Nights, Baku Nights, Blue Dragon, Mi Amor',
        ],
        items: [
          {
            name: 'Serbetli Premium Blends',
            description: 'Lime Peach Ice, Watermelon Ice, Passion Fruit Ice, Strawberry Ice, Blueberry Ice, Lemon Mint, Mint, Sweet Melon.',
            price: '50',
            tags: ['Serbetli'],
            image: '/instaposts-imeages/menu_card_hookah.jpg',
          },
          {
            name: 'Adalya Signature Blends',
            description: 'Love 66, Lady Killer, Berlin Nights, Baku Nights, Blue Dragon, Mi Amor.',
            price: '50',
            tags: ['Adalya'],
            image: '/instaposts-imeages/menu_card_hookah.jpg',
          },
        ],
      },
      {
        id: 'exotic-bold-profiles',
        title: 'Exotic Bold Profiles ($60)',
        blurb: 'Rich, intense dark-leaf and specialty exotic shisha formulations.',
        image: '/instaposts-imeages/menu_card_hookah.jpg',
        imageAlt: 'Exotic Bold Hookah Shisha',
        notes: [
          'Dark Side: Berrycolamist (Forest Berries & Cola), Citrusmist, Skymist',
          'Must Have: Exotixmist (Mango, Passionfruit), Dessertmist, Pinkislandmist',
        ],
        items: [
          {
            name: 'Dark Side Dark-Leaf Blends',
            description: 'Berrycolamist (Forest Berries & Cola), Citrusmist, Skymist.',
            price: '60',
            tags: ['Dark Side'],
            image: '/instaposts-imeages/menu_card_hookah.jpg',
          },
          {
            name: 'Must Have Exotic Blends',
            description: 'Exotixmist (Mango, Passionfruit), Dessertmist, Pinkislandmist.',
            price: '60',
            tags: ['Must Have'],
            image: '/instaposts-imeages/menu_card_hookah.jpg',
          },
        ],
      },
      {
        id: 'hookah-upgrades',
        title: 'Upgrade Base & Replacement Fees',
        blurb: 'Enhance your shisha base infusion with milk, wine, or fresh fruit.',
        image: '/instaposts-imeages/menu_card_hookah.jpg',
        imageAlt: 'Hookah Base Upgrades',
        items: [
          {
            name: 'Base Upgrade: Milk',
            description: 'Rich velvety smoke base with milk enhancement.',
            price: '10',
            tags: ['Base Upgrade'],
          },
          {
            name: 'Base Upgrade: Wine',
            description: 'Aromatic wine infused shisha base.',
            price: '15',
            tags: ['Base Upgrade'],
          },
          {
            name: 'Base Upgrade: Fruit',
            description: 'Natural fresh fruit juice base infusion.',
            price: '20',
            tags: ['Base Upgrade'],
          },
          {
            name: 'Hookah Damage: Base Glass',
            description: 'Full base glass replacement.',
            price: '200',
            tags: ['Replacement'],
          },
          {
            name: 'Hookah Damage: Bowl',
            description: 'Fresh bowl replacement.',
            price: '100',
            tags: ['Replacement'],
          },
          {
            name: 'Hookah Damage: Kaloud',
            description: 'Heat management system replacement.',
            price: '60',
            tags: ['Replacement'],
          },
        ],
      },
    ],
  },
  {
    id: 'appetizers-salads',
    label: 'Appetizers & Fresh Salads',
    short: 'Appetizers',
    groups: [
      {
        id: 'appetizers',
        title: 'Appetizers',
        blurb: 'Golden crispy bites, baked seafood starters, and shared small plates.',
        image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&q=80&w=800',
        imageAlt: 'Crispy appetizers plate',
        items: [
          {
            name: 'GOLDEN CRISPY CALAMARI',
            description: 'Lightly breaded and seasoned, served with house-made zesty marinara.',
            price: '16.95',
            tags: ['Seafood Favorite'],
            image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=800',
          },
          {
            name: 'SOUTH SHORE BAKED CLAMS',
            description: 'Littleneck clams baked with seasoned garlic scampi butter wine sauce.',
            price: '16.95',
            tags: ['Staten Specialty'],
            image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=800',
          },
          {
            name: 'SIGNATURE LOUNGE WINGS',
            description: 'Crispy wings tossed in classic BBQ or Buffalo: side of ranch or blue cheese.',
            price: '14.95',
            tags: ['Crispy Wings'],
            image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&q=80&w=800',
          },
          {
            name: 'LOUNGE TENDERS',
            description: 'Pieces of hand-tossed white meat chicken tenders fried golden crisp.',
            price: '13.95',
            tags: ['Golden Crispy'],
            image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80&w=800',
          },
          {
            name: 'THE BIG CHEESE STICKS',
            description: 'Golden-fried mozzarella logs paired with a warm rich marinara side.',
            price: '11.95',
            tags: ['Melted Mozzarella'],
            image: 'https://images.unsplash.com/photo-1531749668029-2db88e4276c7?auto=format&fit=crop&q=80&w=800',
          },
          {
            name: 'THE HYLAN BRUSCHETTA',
            description: 'Crisp rustic bread crusts loaded with diced tomatoes, onions, garlic, olive oil.',
            price: '13.95',
            tags: ['Fresh Italian'],
            image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&q=80&w=800',
          },
          {
            name: 'HIGH-PILE NACHOS',
            description: 'Chicken, chili, cheddar cheese and guacamole.',
            price: '14.95',
            tags: ['Loaded Nachos'],
            image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&q=80&w=800',
          },
        ],
      },
      {
        id: 'fresh-salads',
        title: 'Fresh Salads',
        blurb: 'Vibrant garden greens, shaved parmigiano, and rustic dressings.',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
        imageAlt: 'Fresh Caesar salad',
        enhancements: 'Enhancements: Chicken +$5 | Steak +$7 | Shrimp +$7',
        items: [
          {
            name: 'THE EMPEROR\'S CAESAR',
            description: 'Romaine hearts, shaved parmigiano, garlic croutons, house dressing.',
            price: '14.95',
            tags: ['Classic Caesar'],
            image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&q=80&w=800',
          },
          {
            name: 'THE STATEN ROCKET ARUGULA SALAD',
            description: 'Arugula, fresh berries, cranberries, walnuts, and goat or blue cheese with raspberry dressing.',
            price: '14.95',
            tags: ['Fresh Berries & Nuts'],
            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
          },
          {
            name: 'THE CAPRESE CLASSIC',
            description: 'Fresh mozzarella, ripe tomatoes, sweet basil leaves, and balsamic reduction drizzle.',
            price: '14.95',
            tags: ['Italian Caprese'],
            image: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a85?auto=format&fit=crop&q=80&w=800',
          },
          {
            name: 'THE BOULEVARD GREEK',
            description: 'Crisp cucumbers, vine-ripe tomatoes, kalamata olives, red onion, and sharp Greek feta.',
            price: '14.95',
            tags: ['Greek Feta'],
            image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800',
          },
        ],
      },
    ],
  },
  {
    id: 'pasta-mains',
    label: 'Pasta Craft & Main Courses',
    short: 'Pastas & Mains',
    groups: [
      {
        id: 'pasta-craft',
        title: 'Pasta Craft',
        blurb: 'Artisanal pastas tossed in velvety vodka sauce, rich pesto, or seafood reduction.',
        image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281270?auto=format&fit=crop&q=80&w=800',
        imageAlt: 'Bowl of vodka penne pasta',
        enhancements: 'Sauces: Alfredo Sauce | Garlic & Oil. Add: Chicken +$5 | Steak +$7 | Shrimp +$7',
        items: [
          {
            name: 'THE HYLAN VODKA PENNE',
            description: 'Penne pasta simmered in rich creamy pink vodka sauce.',
            price: '17.95',
            tags: ['House Specialty'],
            image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281270?auto=format&fit=crop&q=80&w=800',
          },
          {
            name: 'THE GRAND SEAFOOD PASTA',
            description: 'Fiery rosa sauce, fresh diced tomatoes, ocean calamari, and tender clam meat.',
            price: '20.95',
            tags: ['Seafood Medley'],
            image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800',
          },
          {
            name: 'SUN-KISSED PESTO PASTA',
            description: 'Tender pasta tossed in rich pesto sauce, topped with fresh cherry tomatoes and creamy burrata.',
            price: '20.95',
            tags: ['Creamy Burrata'],
            image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=800',
          },
        ],
      },
      {
        id: 'main-courses',
        title: 'Main Courses',
        blurb: 'Char-grilled skirt steak, egg-battered chicken francese, and roasted salmon.',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
        imageAlt: 'Grilled steak with mashed potatoes',
        items: [
          {
            name: 'THE HYLAN SIZZLER',
            description: 'Char-grilled skirt steak, garlic mashed potatoes, roasted seasonal vegetables.',
            price: '27.95',
            tags: ['Char-Grilled Steak'],
            image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
          },
          {
            name: 'THE STATEN FRANCESE',
            description: 'Egg-battered chicken pan-seared in a velvety white wine, lemon, and butter reduction.',
            price: '23.95',
            tags: ['Classic Francese'],
            image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800',
          },
          {
            name: 'THE SOUTH SHORE SALMON',
            description: 'Pan-roasted filet with garlic-dill cream sauce, mashed potatoes, and seasonal greens.',
            price: '25.95',
            tags: ['Pan-Roasted Salmon'],
            image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800',
          },
          {
            name: 'THE HYLAN HOOK FISH TACOS',
            description: 'tempura salmon topped with guacamole, cilantro, chipotle sauce, and a kick of hot sauce.',
            price: '17.95',
            tags: ['Tempura Salmon Tacos'],
            image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&q=80&w=800',
          },
        ],
      },
    ],
  },
  {
    id: 'platters-sandwiches',
    label: 'Lounge Platters & Sandwiches',
    short: 'Platters & Burgers',
    groups: [
      {
        id: 'lounge-platters',
        title: 'Lounge Platters & Sides',
        blurb: 'Artisan reserve charcuterie boards, gourmet dips, and truffle fries.',
        image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&q=80&w=800',
        imageAlt: 'Charcuterie artisan platter board',
        items: [
          {
            name: 'THE ARTISAN RESERVE BOARD',
            description: 'Artisan beef sausage, beef prosciutto, rich Greek feta, fresh mozzarella, and sharp pecorino.',
            price: '31.95',
            tags: ['Charcuterie Board'],
            image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&q=80&w=800',
          },
          {
            name: 'THE TRIPLE THREAT DIP',
            description: 'House-made tzatziki, signature hummus, and spicy whipped feta served with warm pita.',
            price: '16.95',
            tags: ['Trio Dip & Pita'],
            image: 'https://images.unsplash.com/photo-1577906096429-f73c2c312435?auto=format&fit=crop&q=80&w=800',
          },
          {
            name: 'THE LOUNGE SLIDERS',
            description: '4 mini beef brioche sliders topped with American cheese, pickles, served with golden fries.',
            price: '18.95',
            tags: ['4 Mini Sliders'],
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800',
          },
          {
            name: 'THE TODT HILL TRUFFLE FRIES',
            description: 'Hand-cut crispy fries tossed in white truffle oil and grated parmigiano.',
            price: '13.95',
            tags: ['Truffle Oil & Parmesan'],
            image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=800',
          },
          {
            name: 'LOUNGE CUT FRIES',
            description: 'Golden seasoned crisp French fries.',
            price: '10.95',
            tags: ['Crispy Sides'],
            image: 'https://images.unsplash.com/photo-1630384060421-cb3e1e57631e?auto=format&fit=crop&q=80&w=800',
          },
        ],
      },
      {
        id: 'gourmet-sandwiches',
        title: 'Gourmet Sandwiches & Burgers',
        blurb: 'Served on toasted brioche or rustic artisan hero bread with seasoned fries.',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800',
        imageAlt: 'Prime lounge burger with fries',
        items: [
          {
            name: 'THE HYLAN PASTRAMI',
            description: 'Sliced hot pastrami, fresh mozzarella, lettuce, tomato, chipotle glaze, seasoned fries.',
            price: '16.95',
            tags: ['Hot Pastrami Hero'],
            image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&q=80&w=800',
          },
          {
            name: 'THE TENDER HERO',
            description: 'Crispy golden chicken tenders, melted mozzarella, lettuce, tomato, chipotle mayo, fries.',
            price: '16.95',
            tags: ['Chicken Tender Hero'],
            image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=800',
          },
          {
            name: 'THE PRIME LOUNGE BURGER',
            description: 'White cheese, lettuce, tomato and pickles, served with french fries.',
            price: '16.95',
            tags: ['Signature Burger'],
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800',
          },
        ],
      },
    ],
  },
  {
    id: 'desserts-beverages',
    label: 'Desserts & Cafés',
    short: 'Desserts & Drinks',
    groups: [
      {
        id: 'desserts',
        title: 'House Desserts',
        blurb: 'Decadent dark chocolate mousse and espresso tiramisu.',
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=800',
        imageAlt: 'Tiramisu dessert',
        items: [
          {
            name: 'THE MIDNIGHT BUZZ TIRAMISU',
            description: 'Espresso-soaked ladyfingers layered with whipped mascarpone cream.',
            price: '12.95',
            tags: ['Espresso Tiramisu'],
            image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=800',
          },
          {
            name: 'DECADENT DARK MOUSSE',
            description: 'Rich dark chocolate mousse served with Vanilla Ice cream.',
            price: '12.95',
            tags: ['Served with Vanilla Ice Cream'],
            image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=800',
          },
        ],
      },
      {
        id: 'cafes-soft-drinks',
        title: 'Cafés & Soft Drinks',
        blurb: 'Freshly pulled Italian espresso, sparkling mineral water, and premium sodas.',
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800',
        imageAlt: 'Cup of hot cappuccino',
        items: [
          {
            name: 'ESPRESSO / MACCHIATO',
            description: 'Freshly pulled single shot Italian espresso or stained macchiato.',
            price: '4.00',
          },
          {
            name: 'SAN PELLEGRINO',
            description: 'Sparkling Italian natural mineral water.',
            price: '4.00',
          },
          {
            name: 'DOUBLE ESPRESSO / LATTE',
            description: 'Double shot rich espresso or steamed milk latte.',
            price: '6.00',
          },
          {
            name: 'CAPPUCCINO',
            description: 'Espresso topped with rich foamed milk.',
            price: '6.00',
          },
          {
            name: 'PREMIUM SODAS',
            description: 'Coke, Diet Coke, Sprite, Ginger Ale.',
            price: '4.50',
          },
        ],
      },
    ],
  },
  {
    id: 'happy-hour',
    label: 'The Sunset Soirée (Happy Hour)',
    short: 'Happy Hour',
    groups: [
      {
        id: 'happy-hour-specials',
        title: 'THE SUNSET SOIRÉE — Happy Hours',
        blurb: 'SUNDAY THROUGH THURSDAY | 5:00 PM – 9:00 PM',
        image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800',
        imageAlt: 'Sunset happy hour lounge cocktails',
        notes: [
          'Hookah Vault (Light Blends Only): $40',
          'Select Beers (Import & Domestic): $5',
          'House Wines: $10',
          'House Desserts: $10',
          'Appetizers & Fresh Salads Specials ($10): The Emperor\'s Caesar, Signature Lounge Wings, Lounge Tenders, The Big Cheese Sticks, The Hylan Bruschetta',
        ],
        items: [
          {
            name: 'Select Beers (Import & Domestic)',
            description: 'Chilled import and domestic beers on tap or bottle.',
            price: '5',
            tags: ['Happy Hour Special'],
          },
          {
            name: 'House Wines',
            description: 'Red, white, or rose house wine by the glass.',
            price: '10',
            tags: ['Happy Hour Special'],
          },
          {
            name: 'Happy Hour Appetizers & Salads',
            description: 'Choice of The Emperor\'s Caesar, Signature Lounge Wings, Lounge Tenders, The Big Cheese Sticks, or The Hylan Bruschetta.',
            price: '10',
            tags: ['Happy Hour Special'],
          },
          {
            name: 'Happy Hour House Desserts',
            description: 'Choice of Tiramisu or Dark Mousse.',
            price: '10',
            tags: ['Happy Hour Special'],
          },
          {
            name: 'Hookah Vault (Light Blends Only)',
            description: 'Select classic shisha blends prepared fresh.',
            price: '40',
            tags: ['Happy Hour Special'],
          },
        ],
      },
    ],
  },
];

export const totalItemCount = menu.reduce(
  (sum, sec) => sum + sec.groups.reduce((gSum, g) => gSum + g.items.length, 0),
  0
);
