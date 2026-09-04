export type EventItem = {
  id: string;
  title: string;
  date: string;
  day: string;
  month: string;
  time: string;
  description: string;
  tag: string;
  image: string;
  imageAlt: string;
};

export const events: EventItem[] = [
  {
    id: 'afro-house-night',
    title: 'Afro House Night',
    date: '2026-08-07',
    day: '07',
    month: 'AUG',
    time: '9:00 PM',
    description:
      'DJ Nito brings the Afro House energy with premium atmosphere, signature cocktails, and good vibes all night.',
    tag: 'Friday Night',
    image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'Boulevard Lounge Afro House Night featuring live DJ and party crowd',
  },
  {
    id: 'game-day-world-cup-final',
    title: 'Game Day: World Cup Final',
    date: '2026-08-08',
    day: '08',
    month: 'AUG',
    time: 'During the game',
    description:
      'Argentina vs Spain on the big screens with $6 beers, $10 cocktails and wine by the glass, plus $10 food specials throughout the game.',
    tag: 'Game Day',
    image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'Boulevard Lounge Game Day World Cup Final watch party',
  },
  {
    id: 'jazz-wednesdays',
    title: 'Jazz Wednesdays',
    date: '2026-08-13',
    day: '13',
    month: 'AUG',
    time: '8:00 PM',
    description:
      'A live jazz trio sets the mood every Wednesday. Classic martinis, candlelit seating, and smooth standards all night.',
    tag: 'Weekly',
    image: 'https://images.pexels.com/photos/5865076/pexels-photo-5865076.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'Live jazz session under warm lounge lighting',
  },
  {
    id: 'industry-night',
    title: 'Industry Night',
    date: '2026-08-17',
    day: '17',
    month: 'AUG',
    time: '10:00 PM',
    description:
      'Service industry night with extended happy hour pricing, guest DJs, and late-night bites until close.',
    tag: 'Monthly',
    image: 'https://images.pexels.com/photos/11828428/pexels-photo-11828428.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'Backlit bar counter with glowing shelves',
  },
  {
    id: 'taco-tequila-tuesdays',
    title: 'Taco & Tequila Night',
    date: '2026-08-20',
    day: '20',
    month: 'AUG',
    time: '7:00 PM',
    description:
      'Special artisan taco trios paired with $10 Casamigos Reposado & Clase Azul signature margaritas.',
    tag: 'Weekly',
    image: 'https://images.pexels.com/photos/15389024/pexels-photo-15389024.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'Artisan tacos and craft tequila cocktails',
  },
  {
    id: 'vip-saturday-night',
    title: 'VIP Saturday Night Life',
    date: '2026-08-22',
    day: '22',
    month: 'AUG',
    time: '10:00 PM',
    description:
      'Resident DJs spinning deep house & hip-hop hits with VIP booth bottle service packages.',
    tag: 'Saturday Night',
    image: 'https://images.pexels.com/photos/25596638/pexels-photo-25596638.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'VIP Saturday Night bottle service and lounge atmosphere',
  },
];
