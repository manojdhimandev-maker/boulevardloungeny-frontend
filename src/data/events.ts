export type EventItem = {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  day: string;
  month: string;
  time: string;
  timing: string;
  price: string;
  description: string;
  tag: string;
  image: string;
  imageAlt: string;
  requiresDeposit: boolean;
  depositNote: string;
};

export const events: EventItem[] = [
  {
    id: 'midnight-garden',
    title: 'Midnight Garden',
    subtitle: 'LATE NIGHT COCKTAIL AFFAIR',
    date: '2026-08-28',
    day: '28',
    month: 'AUG',
    time: '11:00 PM',
    timing: 'Doors 11PM • Close 4AM',
    price: 'From $45',
    description:
      'An immersive late-night cocktail experience with handcrafted botanical pours, atmospheric candlelit lounge seating, and deep house DJ curation until 4AM.',
    tag: 'Late Night',
    image: '/instaposts-imeages/event_midnight_garden.jpg',
    imageAlt: 'Midnight Garden late night cocktail affair',
    requiresDeposit: true,
    depositNote: '$50 Table Deposit Hold',
  },
  {
    id: 'afro-house-night',
    title: 'Friday Night Life ft. DJ JD',
    subtitle: 'DEEP RHYTHMS & CRAFT COCKTAILS',
    date: '2026-08-07',
    day: '07',
    month: 'AUG',
    time: '9:00 PM',
    timing: 'Doors 9PM • DJ 10PM',
    price: 'From $35',
    description:
      'Featured DJ JD brings vivid Friday night energy with open format, Latin, and house beats, signature cocktails, and premium hookah all night.',
    tag: 'Friday Night',
    image: '/updatedfriday.png',
    imageAlt: 'Boulevard Lounge Friday Night featuring DJ JD',
    requiresDeposit: true,
    depositNote: '$50 Table Deposit Hold',
  },
  {
    id: 'game-day-world-cup-final',
    title: 'Game Day: World Cup Final',
    subtitle: 'LIVE SPORTS & BEER BUCKETS',
    date: '2026-08-08',
    day: '08',
    month: 'AUG',
    time: '3:00 PM',
    timing: 'Doors 2PM • Kickoff 3PM',
    price: '$10 Cover',
    description:
      'Argentina vs Spain on the big screens with $6 beers, $10 cocktails and wine by the glass, plus $10 food specials throughout the game.',
    tag: 'Game Day',
    image: '/instaposts-imeages/event_game_day.png',
    imageAlt: 'Boulevard Lounge Game Day World Cup Final watch party',
    requiresDeposit: false,
    depositNote: 'No Deposit Required',
  },
  {
    id: 'jazz-wednesdays',
    title: 'Jazz Wednesdays',
    subtitle: 'LIVE TRIO & MARTINI SESSION',
    date: '2026-08-13',
    day: '13',
    month: 'AUG',
    time: '8:00 PM',
    timing: 'Doors 7PM • Show 8PM',
    price: 'From $25',
    description:
      'A live jazz trio sets the mood every Wednesday. Classic martinis, candlelit seating, and smooth standards all night.',
    tag: 'Weekly',
    image: '/instaposts-imeages/event_jazz_wednesdays.jpg',
    imageAlt: 'Live jazz session under warm lounge lighting',
    requiresDeposit: false,
    depositNote: 'No Deposit Required',
  },
  {
    id: 'industry-night',
    title: 'Industry Night',
    subtitle: 'SERVICE INDUSTRY SOCIAL',
    date: '2026-08-17',
    day: '17',
    month: 'AUG',
    time: '10:00 PM',
    timing: 'Doors 10PM • Close 3AM',
    price: 'Free Entry',
    description:
      'Service industry night with extended happy hour pricing, guest DJs, and late-night bites until close.',
    tag: 'Monthly',
    image: '/instaposts-imeages/event_industry_night.jpg',
    imageAlt: 'Backlit bar counter with glowing shelves',
    requiresDeposit: false,
    depositNote: 'Free Entry (No Deposit)',
  },
  {
    id: 'taco-tequila-tuesdays',
    title: 'Taco & Tequila Night',
    subtitle: 'ARTISAN TACOS & CRAFT TEQUILA',
    date: '2026-08-20',
    day: '20',
    month: 'AUG',
    time: '7:00 PM',
    timing: '5:00 PM – 11:00 PM',
    price: 'From $30',
    description:
      'Special artisan taco trios paired with $10 Casamigos Reposado & Clase Azul signature margaritas.',
    tag: 'Weekly',
    image: '/instaposts-imeages/event_taco_tequila.jpg',
    imageAlt: 'Artisan tacos and craft tequila cocktails',
    requiresDeposit: false,
    depositNote: 'No Deposit Required',
  },
  {
    id: 'vip-saturday-night',
    title: 'Boulevard Saturdays ft. DJ Enni',
    subtitle: 'PREMIUM BOTTLE SERVICE & DJS',
    date: '2026-08-22',
    day: '22',
    month: 'AUG',
    time: '10:00 PM',
    timing: 'Doors 10PM • Close 4AM',
    price: 'From $60',
    description:
      'Featured DJ Enni spinning top 40, club classics & house hits with VIP booth bottle service packages.',
    tag: 'Saturday Night',
    image: '/saturdayupdated.png',
    imageAlt: 'Boulevard Saturdays featuring DJ Enni',
    requiresDeposit: true,
    depositNote: '$50 Table Deposit Hold',
  },
];
