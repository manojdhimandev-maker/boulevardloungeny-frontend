export type MenuSubItem = {
  name: string;
  description?: string;
  price: string;
  tags?: string[];
  image?: string;
};

export type MenuGroup = {
  id: string;
  title: string;
  blurb: string;
  image: string;
  imageAlt: string;
  items: MenuSubItem[];
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
    label: 'Signature Cocktails',
    short: 'Cocktails',
    groups: [
      {
        id: 'signature',
        title: 'Boulevard Signature Cocktails',
        blurb: 'Handcrafted signature pours crafted with premium spirits & house blends.',
        image:
          'https://images.pexels.com/photos/25596638/pexels-photo-25596638.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        imageAlt: 'Signature craft cocktail in a coupe glass',
        items: [
          {
            name: 'Love Spell Martini',
            description: 'A smooth, fruity martini with tequila rose, vanilla vodka and strawberry sweetness.',
            price: '18',
            tags: ['House Favorite', 'Sweet & Fruity'],
            image: 'https://images.pexels.com/photos/4051400/pexels-photo-4051400.jpeg?auto=compress&cs=tinysrgb&w=800',
          },
          {
            name: 'Rum Away With Me',
            description: 'A tropical rum cocktail with coconut, citrus and passion fruit.',
            price: '20',
            tags: ['Tropical'],
            image: 'https://images.pexels.com/photos/25596638/pexels-photo-25596638.jpeg?auto=compress&cs=tinysrgb&w=800',
          },
          {
            name: 'Eagles Wave',
            description: 'A refreshing vodka cocktail with coconut, pineapple and lime.',
            price: '19',
            tags: ['Refreshing'],
            image: 'https://images.pexels.com/photos/16444385/pexels-photo-16444385.jpeg?auto=compress&cs=tinysrgb&w=800',
          },
          {
            name: 'FKN Fig Martini',
            description: 'A sophisticated fig and elderflower martini with cranberry and lime.',
            price: '17',
            tags: ['Craft Pick'],
            image: 'https://images.pexels.com/photos/8346714/pexels-photo-8346714.jpeg?auto=compress&cs=tinysrgb&w=800',
          },
          {
            name: 'Pistachio Paradise',
            description: 'A creamy nutty dessert cocktail with Frangelico, Baileys and Disaronno.',
            price: '18',
            tags: ['Decadent'],
            image: 'https://images.pexels.com/photos/34313396/pexels-photo-34313396.jpeg?auto=compress&cs=tinysrgb&w=800',
          },
          {
            name: 'Honey Heaven',
            description: 'A rich honey-vanilla whiskey cream cocktail with warm cinnamon.',
            price: '20',
            tags: ['Warm & Spiced'],
            image: 'https://images.pexels.com/photos/27827771/pexels-photo-27827771.jpeg?auto=compress&cs=tinysrgb&w=800',
          },
          {
            name: 'Berry Blvd',
            description: 'A bright gin cocktail bursting with raspberry and citrus.',
            price: '17',
            tags: ['Popular'],
            image: 'https://images.pexels.com/photos/2663974/pexels-photo-2663974.jpeg?auto=compress&cs=tinysrgb&w=800',
          },
          {
            name: 'Lavender Crown',
            description: 'A floral citrus cocktail featuring Empress Gin and lavender tones.',
            price: '18',
            tags: ['Botanical'],
            image: 'https://images.pexels.com/photos/17564452/pexels-photo-17564452.jpeg?auto=compress&cs=tinysrgb&w=800',
          },
          {
            name: 'Liquid Gold',
            description: 'A premium sparkling tequila and cognac cocktail with tropical mango.',
            price: '26',
            tags: ['Luxury Pour'],
            image: 'https://images.pexels.com/photos/27851286/pexels-photo-27851286.jpeg?auto=compress&cs=tinysrgb&w=800',
          },
          {
            name: 'Sunrise Kiss',
            description: 'A luxurious tropical sparkling cocktail with Clase Azul and Rémy Martin.',
            price: '28',
            tags: ['Ultra Premium'],
            image: 'https://images.pexels.com/photos/28180088/pexels-photo-28180088.jpeg?auto=compress&cs=tinysrgb&w=800',
          },
          {
            name: 'The Next Best Thing',
            description: 'A crisp sparkling passionfruit cocktail with vanilla vodka.',
            price: '17',
            tags: ['Sparkling'],
            image: 'https://images.pexels.com/photos/16444385/pexels-photo-16444385.jpeg?auto=compress&cs=tinysrgb&w=800',
          },
          {
            name: 'Poison Apple',
            description: 'A tangy apple whiskey sour with smooth foam.',
            price: '17',
            tags: ['Bold'],
            image: 'https://images.pexels.com/photos/27827771/pexels-photo-27827771.jpeg?auto=compress&cs=tinysrgb&w=800',
          },
          {
            name: 'Fire On Ice',
            description: 'A spicy whiskey cocktail with jalapeño, lime and agave.',
            price: '18',
            tags: ['Spicy & Smoky'],
            image: 'https://images.pexels.com/photos/34313396/pexels-photo-34313396.jpeg?auto=compress&cs=tinysrgb&w=800',
          },
        ],
      },
    ],
  },
  {
    id: 'food',
    label: 'Food & Mains',
    short: 'Food',
    groups: [
      {
        id: 'salads',
        title: 'Fresh Salads',
        blurb: 'Crisp greens and classic Mediterranean inspired dressings.',
        image: 'https://images.pexels.com/photos/11196769/pexels-photo-11196769.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        imageAlt: 'Fresh salad bowl with crisp greens',
        items: [
          {
            name: 'Caesar Salad',
            description: 'Crisp romaine lettuce, shaved parmesan, croutons with creamy caesar dressing (Add chicken +$3.00)',
            price: '11.95',
            tags: ['Classic'],
            image: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=800',
          },
          {
            name: 'Mix Green Salad',
            description: 'Mixed greens, tomatoes, onions, pickles with white vinaigrette (Add chicken +$3.00)',
            price: '11.95',
            image: 'https://images.pexels.com/photos/11196769/pexels-photo-11196769.jpeg?auto=compress&cs=tinysrgb&w=800',
          },
          {
            name: 'Fresh Mozzarella Caprese',
            description: 'Fresh mozzarella, ripe tomatoes, basil, and balsamic reduction',
            price: '11.95',
            tags: ['Vegetarian'],
            image: 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=800',
          },
          {
            name: 'Greek Salad',
            description: 'Traditional Greek salad with cucumbers, tomatoes, olives, red onions & feta cheese',
            price: '11.95',
            tags: ['Vegetarian'],
            image: 'https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg?auto=compress&cs=tinysrgb&w=800',
          },
        ],
      },
      {
        id: 'pasta',
        title: 'Pasta',
        blurb: 'Rich, comforting pasta dishes prepared to order.',
        image: 'https://images.pexels.com/photos/15801007/pexels-photo-15801007.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        imageAlt: 'Delicious freshly prepared pasta',
        items: [
          {
            name: 'Penne Alla Vodka',
            description: 'Penne pasta tossed in rich homemade vodka cream sauce (Add chicken +$3.00)',
            price: '14.95',
            tags: ['House Specialty'],
            image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=800',
          },
          {
            name: 'Pasta Alla Boulevard',
            description: 'Rosa sauce, fresh tomato, calamari, clam meat and garlic (Spicy)',
            price: '16.95',
            tags: ['Chef Signature', 'Spicy'],
            image: 'https://images.pexels.com/photos/15801007/pexels-photo-15801007.jpeg?auto=compress&cs=tinysrgb&w=800',
          },
        ],
      },
      {
        id: 'mains',
        title: 'Main Dishes',
        blurb: 'Sizzling steaks, tender poultry, and fresh seafood entrees.',
        image: 'https://images.pexels.com/photos/8862756/pexels-photo-8862756.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        imageAlt: 'Grilled steak with mashed potatoes and vegetables',
        items: [
          {
            name: 'Skirt Steak',
            description: 'Juicy skirt steak served with creamy mashed potatoes and fresh seasonal veggies',
            price: '22.95',
            tags: ['Customer Favorite'],
            image: 'https://images.pexels.com/photos/8862756/pexels-photo-8862756.jpeg?auto=compress&cs=tinysrgb&w=800',
          },
          {
            name: 'Chicken Francese',
            description: 'Tender chicken breast in lemon butter white wine sauce, served with mashed potatoes & veggies',
            price: '18.95',
            image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=800',
          },
          {
            name: 'Salmon',
            description: 'Pan-seared salmon with roasted garlic cream sauce and dill, served with mashed potatoes & veggies',
            price: '20.95',
            tags: ['Seafood'],
            image: 'https://images.pexels.com/photos/3645126/pexels-photo-3645126.jpeg?auto=compress&cs=tinysrgb&w=800',
          },
        ],
      },
      {
        id: 'sandwiches',
        title: 'Sandwiches & Burgers',
        blurb: 'Served hot with golden crispy french fries.',
        image: 'https://images.pexels.com/photos/35836913/pexels-photo-35836913.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        imageAlt: 'Gourmet burger served with french fries',
        items: [
          {
            name: 'Pastrami Sandwich',
            description: 'With lettuce, tomato, fresh mozzarella and chipotle sauce, served with french fries',
            price: '13.95',
            image: 'https://images.pexels.com/photos/1603901/pexels-photo-1603901.jpeg?auto=compress&cs=tinysrgb&w=800',
          },
          {
            name: 'Chicken Tender Sandwich',
            description: 'With lettuce, tomato, fresh mozzarella and chipotle mayonnaise, served with french fries',
            price: '13.95',
            image: 'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=800',
          },
          {
            name: 'Turkey Sandwich',
            description: 'With lettuce, tomato, pepper jack cheese and mayo, served with french fries',
            price: '13.95',
            image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=800',
          },
          {
            name: 'Hamburger',
            description: 'With white cheese, lettuce, tomato and pickles, served with french fries',
            price: '13.95',
            tags: ['Classic'],
            image: 'https://images.pexels.com/photos/35836913/pexels-photo-35836913.jpeg?auto=compress&cs=tinysrgb&w=800',
          },
        ],
      },
      {
        id: 'cold-dishes',
        title: 'Dishes & Delights Cold',
        blurb: 'Perfect for sharing around the table.',
        image: 'https://images.pexels.com/photos/29585262/pexels-photo-29585262.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        imageAlt: 'Antipasto platter with cheeses and cured meats',
        items: [
          {
            name: 'Antipasto Platter',
            description: 'Beef sausage, beef prosciutto, feta cheese, fresh mozzarella, pecorino romano',
            price: '28.95',
            tags: ['Sharable'],
            image: 'https://images.pexels.com/photos/29585262/pexels-photo-29585262.jpeg?auto=compress&cs=tinysrgb&w=800',
          },
          {
            name: 'Trio Dip Plate',
            description: 'Tzaziki, hummus and spicy feta served with warm pita bread',
            price: '14.95',
            tags: ['Sharable'],
            image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
          },
          {
            name: 'Beef Sliders',
            description: '4 mini burgers with melt cheese and pickles, served with french fries',
            price: '15.95',
            image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800',
          },
          {
            name: 'Skirt Steak Bites',
            description: 'With pepper jack cheese over garlic bread and french fries',
            price: '15.95',
            tags: ['Popular'],
            image: 'https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg?auto=compress&cs=tinysrgb&w=800',
          },
          {
            name: 'Guacamole and Chips',
            description: 'Fresh guacamole made daily with crispy tortilla chips',
            price: '10.95',
            image: 'https://images.pexels.com/photos/574111/pexels-photo-574111.jpeg?auto=compress&cs=tinysrgb&w=800',
          },
          {
            name: 'Chilly Cheese Fries',
            description: 'Crispy fries smothered in warm chili and melted cheese',
            price: '8.95',
            image: 'https://images.pexels.com/photos/31806278/pexels-photo-31806278.jpeg?auto=compress&cs=tinysrgb&w=800',
          },
          {
            name: 'Hazelnut Plate',
            description: 'Selected hazelnut sampler plate',
            price: '6.95',
            image: 'https://images.pexels.com/photos/4099238/pexels-photo-4099238.jpeg?auto=compress&cs=tinysrgb&w=800',
          },
        ],
      },
    ],
  },
  {
    id: 'brunch',
    label: 'Weekend Brunch',
    short: 'Brunch',
    groups: [
      {
        id: 'brunch-specials',
        title: 'Weekend Brunch Menu',
        blurb: 'Available Saturday & Sunday Only (1:00 PM – 5:00 PM).',
        image: 'https://images.pexels.com/photos/7590623/pexels-photo-7590623.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        imageAlt: 'Weekend brunch spread',
        items: [
          {
            name: 'Two Eggs with Beef Sausage',
            description: 'Served with toasted bread and french fries',
            price: '13.95',
            tags: ['Brunch Favorite'],
            image: 'https://images.pexels.com/photos/35828979/pexels-photo-35828979.jpeg?auto=compress&cs=tinysrgb&w=800',
          },
          {
            name: 'Egg Omelete',
            description: 'With peppers, onions and spinach, served with french fries',
            price: '12.95',
            image: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=800',
          },
          {
            name: 'Steak and Egg',
            description: 'Skirt steak and eggs cooked to preference, served with french fries',
            price: '18.95',
            tags: ['Hearty Pick'],
            image: 'https://images.pexels.com/photos/35828979/pexels-photo-35828979.jpeg?auto=compress&cs=tinysrgb&w=800',
          },
          {
            name: 'Ruben Sandwich',
            description: 'Pastrami, rye bread, sauerkraut and mustard, served with french fries',
            price: '13.95',
            image: 'https://images.pexels.com/photos/1603901/pexels-photo-1603901.jpeg?auto=compress&cs=tinysrgb&w=800',
          },
          {
            name: 'Avocado Toast',
            description: 'Two slices of toasted bread topped with mashed avocado, served with french fries',
            price: '10.95',
            tags: ['Vegetarian'],
            image: 'https://images.pexels.com/photos/11975658/pexels-photo-11975658.jpeg?auto=compress&cs=tinysrgb&w=800',
          },
          {
            name: 'French Toast',
            description: 'Golden french toast served with maple syrup and fresh fruits',
            price: '13.95',
            tags: ['Sweet Selection'],
            image: 'https://images.pexels.com/photos/4623075/pexels-photo-4623075.jpeg?auto=compress&cs=tinysrgb&w=800',
          },
        ],
      },
    ],
  },
  {
    id: 'wine',
    label: 'Wine List',
    short: 'Wine',
    groups: [
      {
        id: 'sparkling',
        title: 'Sparkling & Champagne',
        blurb: 'Fine bubbles for every celebration.',
        image: 'https://images.pexels.com/photos/3642295/pexels-photo-3642295.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        imageAlt: 'Chilled champagne bottle',
        items: [
          { name: 'Prosecco San Tiziano, Veneto Italy', description: 'By glass or bottle', price: '13 / 45', image: 'https://images.pexels.com/photos/11976218/pexels-photo-11976218.jpeg?auto=compress&cs=tinysrgb&w=800' },
          { name: 'Moët Chandon', description: 'Champagne, France', price: '225', image: 'https://images.pexels.com/photos/3642295/pexels-photo-3642295.jpeg?auto=compress&cs=tinysrgb&w=800' },
          { name: 'Dom Perignon', description: 'Prestige Cuvée, France', price: '525', tags: ['Prestige'], image: 'https://images.pexels.com/photos/30169604/pexels-photo-30169604.jpeg?auto=compress&cs=tinysrgb&w=800' },
          { name: 'Veuve Clicquot Brut', description: 'Reims, France', price: '225', image: 'https://images.pexels.com/photos/5340997/pexels-photo-5340997.jpeg?auto=compress&cs=tinysrgb&w=800' },
          { name: 'Veuve Clicquot Rosé', description: 'Reims, France', price: '250', image: 'https://images.pexels.com/photos/3642295/pexels-photo-3642295.jpeg?auto=compress&cs=tinysrgb&w=800' },
        ],
      },
      {
        id: 'white-rose',
        title: 'White & Rosé Wine',
        blurb: 'Crisp, aromatic whites and pale dry rosé.',
        image: 'https://images.pexels.com/photos/51970/a-glass-of-wine-alcohol-white-wine-51970.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        imageAlt: 'White wine glass',
        items: [
          { name: 'Sauvignon Blanc Southern Ocean, NZ', description: 'Marlborough, New Zealand', price: '14 / 50', image: 'https://images.pexels.com/photos/16167163/pexels-photo-16167163.jpeg?auto=compress&cs=tinysrgb&w=800' },
          { name: 'Chardonnay Silver Creek, CA', description: 'California', price: '13 / 45', image: 'https://images.pexels.com/photos/51970/a-glass-of-wine-alcohol-white-wine-51970.jpeg?auto=compress&cs=tinysrgb&w=800' },
          { name: 'Pinot Grigio Fioroso, Veneto IT', description: 'Veneto, Italy', price: '12 / 40', image: 'https://images.pexels.com/photos/16167163/pexels-photo-16167163.jpeg?auto=compress&cs=tinysrgb&w=800' },
          { name: 'Rosé Provence Des Alpes, FR', description: 'Provence, France', price: '13 / 45', image: 'https://images.pexels.com/photos/16167163/pexels-photo-16167163.jpeg?auto=compress&cs=tinysrgb&w=800' },
          { name: 'Falanghina Fontanavecchia, IT', description: 'Campania, Italy', price: '60', image: 'https://images.pexels.com/photos/51970/a-glass-of-wine-alcohol-white-wine-51970.jpeg?auto=compress&cs=tinysrgb&w=800' },
          { name: 'Salon White Domaine Chavet, FR', description: 'Menetou-Salon, France', price: '60', image: 'https://images.pexels.com/photos/20184720/pexels-photo-20184720.jpeg?auto=compress&cs=tinysrgb&w=800' },
          { name: 'Salon Blanc Millet Menetou, FR', description: 'Loire, France', price: '58', image: 'https://images.pexels.com/photos/20184720/pexels-photo-20184720.jpeg?auto=compress&cs=tinysrgb&w=800' },
        ],
      },
      {
        id: 'red',
        title: 'Red Wine Selection',
        blurb: 'Full-bodied reds from Napa Valley, Tuscany, and Bordeaux.',
        image: 'https://images.pexels.com/photos/29436323/pexels-photo-29436323.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        imageAlt: 'Pouring red wine into glass',
        items: [
          { name: 'Chianti Il Barone, Tuscany IT', description: 'Tuscany, Italy', price: '13 / 45', image: 'https://images.pexels.com/photos/29436323/pexels-photo-29436323.jpeg?auto=compress&cs=tinysrgb&w=800' },
          { name: 'Montepulciano D’Abruzzo, IT', description: 'Abruzzo, Italy', price: '13 / 45', image: 'https://images.pexels.com/photos/19966415/pexels-photo-19966415.jpeg?auto=compress&cs=tinysrgb&w=800' },
          { name: 'Pinot Noir Cantina Levorato, IT', description: 'Veneto, Italy', price: '13 / 45', image: 'https://images.pexels.com/photos/19966415/pexels-photo-19966415.jpeg?auto=compress&cs=tinysrgb&w=800' },
          { name: 'Cabernet Sauvignon Silver Creek, CA', description: 'California', price: '13 / 45', image: 'https://images.pexels.com/photos/29436323/pexels-photo-29436323.jpeg?auto=compress&cs=tinysrgb&w=800' },
          { name: 'Malbec Bodega Privada, Mendoza AR', description: 'Mendoza, Argentina', price: '13 / 45', image: 'https://images.pexels.com/photos/14173932/pexels-photo-14173932.jpeg?auto=compress&cs=tinysrgb&w=800' },
          { name: 'Cabernet Sauvignon Far Niente, Napa Valley CA', description: 'Napa Valley, California', price: '299', tags: ['Iconic'], image: 'https://images.pexels.com/photos/29436323/pexels-photo-29436323.jpeg?auto=compress&cs=tinysrgb&w=800' },
          { name: 'Cabernet Sauvignon Caymus IL, Napa Valley CA', description: 'Napa Valley, California', price: '255', image: 'https://images.pexels.com/photos/29436323/pexels-photo-29436323.jpeg?auto=compress&cs=tinysrgb&w=800' },
          { name: 'Cabernet Sauvignon Silver Oak, Napa Valley CA', description: 'Napa Valley, California', price: '340', image: 'https://images.pexels.com/photos/29436323/pexels-photo-29436323.jpeg?auto=compress&cs=tinysrgb&w=800' },
          { name: 'Cabernet Sauvignon Cakebread, Napa Valley CA', description: 'Napa Valley, California', price: '220', image: 'https://images.pexels.com/photos/29436323/pexels-photo-29436323.jpeg?auto=compress&cs=tinysrgb&w=800' },
          { name: 'Cabernet Sauvignon Stags Leap Artemis, CA', description: 'Stags Leap District, CA', price: '155', image: 'https://images.pexels.com/photos/29436323/pexels-photo-29436323.jpeg?auto=compress&cs=tinysrgb&w=800' },
          { name: 'Tignanello, Tuscany IT', description: 'Antinori, Tuscany', price: '399', tags: ['Collector'], image: 'https://images.pexels.com/photos/19966415/pexels-photo-19966415.jpeg?auto=compress&cs=tinysrgb&w=800' },
          { name: 'Brunello di Montalcino Martoccia, Tuscany IT', description: 'Tuscany, Italy', price: '150', image: 'https://images.pexels.com/photos/19966415/pexels-photo-19966415.jpeg?auto=compress&cs=tinysrgb&w=800' },
          { name: 'Amarone della Valpolicella Caulis, Veneto IT', description: 'Veneto, Italy', price: '110', image: 'https://images.pexels.com/photos/29436323/pexels-photo-29436323.jpeg?auto=compress&cs=tinysrgb&w=800' },
          { name: 'Barolo La Fortunata, Piemonte IT', description: 'Piemonte, Italy', price: '100', image: 'https://images.pexels.com/photos/29436323/pexels-photo-29436323.jpeg?auto=compress&cs=tinysrgb&w=800' },
          { name: 'Super Tuscany, Il Conte Toscano', description: 'Tuscany, Italy', price: '60', image: 'https://images.pexels.com/photos/19966415/pexels-photo-19966415.jpeg?auto=compress&cs=tinysrgb&w=800' },
          { name: 'Grand Cru Chateau Pipeau St. Emilion, FR', description: 'Saint-Émilion, Bordeaux', price: '105', image: 'https://images.pexels.com/photos/29436323/pexels-photo-29436323.jpeg?auto=compress&cs=tinysrgb&w=800' },
        ],
      },
    ],
  },
  {
    id: 'beer',
    label: 'Beer & Drinks',
    short: 'Beer',
    groups: [
      {
        id: 'beers',
        title: 'Chilled Beers',
        blurb: 'All imported & domestic beers served cold for $6.',
        image: 'https://images.pexels.com/photos/9433871/pexels-photo-9433871.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        imageAlt: 'Cold beer bottles',
        items: [
          { name: 'Stella Artois', description: 'European-style lager with crisp malt flavor and balanced bitterness.', price: '6', image: 'https://images.pexels.com/photos/128242/pexels-photo-128242.jpeg?auto=compress&cs=tinysrgb&w=800' },
          { name: 'Peroni', description: 'Italian premium lager with a light, refreshing finish.', price: '6', image: 'https://images.pexels.com/photos/36834692/pexels-photo-36834692.jpeg?auto=compress&cs=tinysrgb&w=800' },
          { name: 'Amstel Light', description: 'Light lager with smooth malt character and fewer calories.', price: '6', image: 'https://images.pexels.com/photos/128242/pexels-photo-128242.jpeg?auto=compress&cs=tinysrgb&w=800' },
          { name: 'Blue Moon', description: 'Belgian-style wheat beer with citrus notes.', price: '6', image: 'https://images.pexels.com/photos/36834692/pexels-photo-36834692.jpeg?auto=compress&cs=tinysrgb&w=800' },
          { name: 'Corona Extra', description: 'Light Mexican lager, clean and refreshing.', price: '6', image: 'https://images.pexels.com/photos/128242/pexels-photo-128242.jpeg?auto=compress&cs=tinysrgb&w=800' },
          { name: 'Corona Light', description: 'A lighter version of Corona with crisp taste.', price: '6', image: 'https://images.pexels.com/photos/9433871/pexels-photo-9433871.jpeg?auto=compress&cs=tinysrgb&w=800' },
          { name: 'Heineken', description: 'Premium Dutch lager with balanced bitterness.', price: '6', image: 'https://images.pexels.com/photos/9433871/pexels-photo-9433871.jpeg?auto=compress&cs=tinysrgb&w=800' },
          { name: 'Heineken 0', description: 'Alcohol-free lager with refreshing malt flavor.', price: '6', image: 'https://images.pexels.com/photos/6274079/pexels-photo-6274079.jpeg?auto=compress&cs=tinysrgb&w=800' },
        ],
      },
      {
        id: 'desserts',
        title: 'Dessert & Sweets',
        blurb: 'Indulgent treats to finish your evening.',
        image: 'https://images.pexels.com/photos/26838690/pexels-photo-26838690.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        imageAlt: 'Delicious tiramisu cake slice',
        items: [
          {
            name: 'Tiramisu',
            description: 'Coffee soaked ladyfingers layered with creamy mascarpone and dusted with cocoa powder',
            price: '9.95',
            tags: ['Classic Dessert'],
            image: 'https://images.pexels.com/photos/26838690/pexels-photo-26838690.jpeg?auto=compress&cs=tinysrgb&w=800',
          },
          {
            name: 'Lava Cake',
            description: 'Chocolate cake with molten center, served with a scoop of vanilla ice cream',
            price: '9.95',
            tags: ['Warm & Indulgent'],
            image: 'https://images.pexels.com/photos/20522414/pexels-photo-20522414.jpeg?auto=compress&cs=tinysrgb&w=800',
          },
        ],
      },
      {
        id: 'coffee-soft',
        title: 'Coffee & Refreshments',
        blurb: 'Freshly brewed espresso drinks and soft beverages.',
        image: 'https://images.pexels.com/photos/6747870/pexels-photo-6747870.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        imageAlt: 'Freshly made espresso coffee',
        items: [
          { name: 'Espresso', price: '3.50', image: 'https://images.pexels.com/photos/16523911/pexels-photo-16523911.jpeg?auto=compress&cs=tinysrgb&w=800' },
          { name: 'Double Espresso', price: '5.50', image: 'https://images.pexels.com/photos/16523911/pexels-photo-16523911.jpeg?auto=compress&cs=tinysrgb&w=800' },
          { name: 'Capuccino', price: '5.50', image: 'https://images.pexels.com/photos/6747870/pexels-photo-6747870.jpeg?auto=compress&cs=tinysrgb&w=800' },
          { name: 'Latte', price: '5.50', image: 'https://images.pexels.com/photos/459489/pexels-photo-459489.jpeg?auto=compress&cs=tinysrgb&w=800' },
          { name: 'Macchiato', price: '3.50', image: 'https://images.pexels.com/photos/6747870/pexels-photo-6747870.jpeg?auto=compress&cs=tinysrgb&w=800' },
          { name: 'Double Macchiato', price: '5.50', image: 'https://images.pexels.com/photos/6747870/pexels-photo-6747870.jpeg?auto=compress&cs=tinysrgb&w=800' },
          { name: 'Americano', price: '4.50', image: 'https://images.pexels.com/photos/16523911/pexels-photo-16523911.jpeg?auto=compress&cs=tinysrgb&w=800' },
          { name: 'Coke', price: '4.50', image: 'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=800' },
          { name: 'Diet Coke', price: '4.50', image: 'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=800' },
          { name: 'Sprite', price: '4.50', image: 'https://images.pexels.com/photos/12419190/pexels-photo-12419190.jpeg?auto=compress&cs=tinysrgb&w=800' },
          { name: 'San Pellegrino', price: '4.00', image: 'https://images.pexels.com/photos/12151233/pexels-photo-12151233.jpeg?auto=compress&cs=tinysrgb&w=800' },
        ],
      },
    ],
  },
];

export const totalItemCount = menu.reduce(
  (acc, section) => acc + section.groups.reduce((gAcc, group) => gAcc + group.items.length, 0),
  0
);
