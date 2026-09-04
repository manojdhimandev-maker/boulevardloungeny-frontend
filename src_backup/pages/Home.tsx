import {
  CalendarDays,
  ArrowRight,
  Wine,
  Sparkles,
  UtensilsCrossed,
  Music2,
  Clock,
  MapPin,
  Phone,
  Star,
  Quote,
  Flame,
} from 'lucide-react';
import { venueInfo } from '@/data/venue';
import { events } from '@/data/events';
import { menu, totalItemCount } from '@/data/menu';
import type { PageId } from '@/components/Navbar';

type HomeProps = {
  onNavigate: (page: PageId) => void;
};

const heroImage =
  'https://images.pexels.com/photos/5865076/pexels-photo-5865076.jpeg?auto=compress&cs=tinysrgb&h=1200&w=2000';
const barImage =
  'https://images.pexels.com/photos/11828428/pexels-photo-11828428.jpeg?auto=compress&cs=tinysrgb&h=900&w=1400';
const cocktailImage =
  'https://images.pexels.com/photos/25596638/pexels-photo-25596638.jpeg?auto=compress&cs=tinysrgb&h=1100&w=850';
const brunchImage =
  'https://images.pexels.com/photos/7590623/pexels-photo-7590623.jpeg?auto=compress&cs=tinysrgb&h=900&w=1400';

const testimonials = [
  {
    name: 'Marcus Vance',
    role: 'Verified Google Review',
    stars: 5,
    text: 'Hands down the best cocktail lounge experience in New York! The Love Spell Martini and Skirt Steak were absolute perfection. The atmosphere after 9 PM is unmatched.',
  },
  {
    name: 'Elena Rostova',
    role: 'Local Foodie & Guest',
    stars: 5,
    text: 'We hosted a birthday group here for Weekend Brunch. The $6 imported beers, Steak & Eggs, and bottomless mimosas made it unforgettable. Service was 10/10!',
  },
  {
    name: 'David Chen',
    role: 'Verified Guest',
    stars: 5,
    text: 'Booked online via Google Calendar sync in under a minute. The VIP booth seating and live Afro House DJ nights make this our go-to Friday night spot.',
  },
];

export default function Home({ onNavigate }: HomeProps) {
  const upcoming = events.slice(0, 3);
  const signatureDrinks = menu[0]?.groups[0]?.items.slice(0, 4) ?? [];

  return (
    <div className="animate-fade-in pb-12">
      {/* HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="The Boulevard Lounge interior" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/85 via-ink-950/60 to-ink-950" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950/90 via-ink-950/40 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-36 pb-24 w-full">
          <div className="max-w-2xl">
            <div className="section-tag animate-fade-up">
              EST. 2019 · MANHATTAN, NEW YORK
            </div>

            <h1
              className="mt-3 font-display font-light text-[clamp(50px,5vw,95px)] leading-[0.95] tracking-tight text-ink-100 animate-fade-up"
              style={{ animationDelay: '0.1s' }}
            >
              Where Luxury <br />
              <span className="text-gold-400 font-light">Meets</span> <br />
              <span className="text-gold-400 font-light">Nightlife.</span>
            </h1>

            <p
              className="mt-6 section-desc animate-fade-up"
              style={{ animationDelay: '0.2s' }}
            >
              A vibrant destination in the heart of the city — where great food, crafted cocktails, and live entertainment come together for a night worth remembering.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <button
                onClick={() => onNavigate('reservations')}
                className="btn-gold"
              >
                Reserve a Table
              </button>
              <button
                onClick={() => onNavigate('menu')}
                className="btn-outline-gold"
              >
                View Menu
              </button>
            </div>

            {/* BOULEVARD LOUNGE STATS */}
            <div
              className="mt-12 flex flex-wrap items-center gap-10 border-t border-gold-400/20 pt-6 text-ink-300 animate-fade-up"
              style={{ animationDelay: '0.4s' }}
            >
              <div>
                <span className="font-display text-2xl font-light text-gold-400 block leading-none">7PM</span>
                <span className="font-body text-[9px] tracking-[0.15em] uppercase text-ink-400 mt-1.5 block">OPENS NIGHTLY</span>
              </div>
              <div className="h-6 w-[1px] bg-gold-400/20 hidden sm:block" />
              <div>
                <span className="font-display text-2xl font-light text-gold-400 block leading-none">4.9</span>
                <span className="font-body text-[9px] tracking-[0.15em] uppercase text-ink-400 mt-1.5 block">GUEST RATING</span>
              </div>
              <div className="h-6 w-[1px] bg-gold-400/20 hidden sm:block" />
              <div>
                <span className="font-display text-2xl font-light text-gold-400 block leading-none">50+</span>
                <span className="font-body text-[9px] tracking-[0.15em] uppercase text-ink-400 mt-1.5 block">FINE SELECTIONS</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink-400 animate-float">
          <span className="text-[0.6rem] tracking-[0.3em] uppercase font-semibold">Scroll</span>
          <span className="w-px h-7 bg-gradient-to-b from-gold-400 to-transparent" />
        </div>
      </section>

      {/* MARQUEE PROMO TICKER */}
      <section className="relative z-20 bg-ink-900 border-y border-gold-500/30 overflow-hidden py-3">
        <div className="animate-marquee whitespace-nowrap flex gap-12 text-xs sm:text-sm font-semibold tracking-wide text-gold-200 uppercase">
          {venueInfo.promos.concat(venueInfo.promos).map((promo, idx) => (
            <span key={idx} className="inline-flex items-center gap-2">
              <span>{promo}</span>
              <span className="text-gold-500/40">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* QUICK ACCESS CARDS */}
      <section className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 py-16">
        <div className="grid sm:grid-cols-3 gap-5">
          {[
            {
              id: 'reservations' as PageId,
              icon: CalendarDays,
              title: 'Online Reservations',
              desc: 'Book your table with Google Calendar sync in under a minute.',
              cta: 'Make a reservation',
            },
            {
              id: 'menu' as PageId,
              icon: Wine,
              title: 'Artisanal Menu',
              desc: '50+ signature cocktails, wines, steaks & brunch bites.',
              cta: 'Explore full menu',
            },
            {
              id: 'events' as PageId,
              icon: Music2,
              title: 'Nightlife & Events',
              desc: 'Live Afro House DJs, Jazz sessions & game watch parties.',
              cta: "See what's happening",
            },
          ].map((card, i) => (
            <button
              key={card.id}
              onClick={() => onNavigate(card.id)}
              className="group text-left glass-panel rounded-3xl p-6 border border-ink-700/60 hover:border-gold-500/50 hover:-translate-y-1 transition-all shadow-xl animate-fade-up"
              style={{ animationDelay: `${0.1 * i}s` }}
            >
              <span className="grid place-items-center w-12 h-12 rounded-2xl bg-ink-800 text-gold-300 mb-5 group-hover:bg-gold-gradient group-hover:text-ink-950 transition-colors shadow-md">
                <card.icon size={22} />
              </span>
              <h3 className="font-display text-2xl text-ink-50 group-hover:text-gold-200 transition-colors">
                {card.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-ink-300 leading-relaxed">{card.desc}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-gold-300 group-hover:gap-2.5 transition-all">
                {card.cta} <ArrowRight size={14} />
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* SIGNATURE DRINKS & REAL MENU HIGHLIGHTS */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-12">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8 border-b border-ink-700/60 pb-4">
          <div>
            <span className="text-gold-300 text-xs tracking-[0.3em] uppercase font-semibold">Crafted in House</span>
            <h2 className="mt-1 font-display text-3xl sm:text-4xl text-ink-50">Signature Pours</h2>
          </div>
          <button
            onClick={() => onNavigate('menu')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-300 hover:text-gold-100"
          >
            View All Cocktails & Food <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {signatureDrinks.map((drink) => (
            <div
              key={drink.name}
              onClick={() => onNavigate('menu')}
              className="cursor-pointer group glass-panel rounded-2xl p-4 border border-ink-700/60 hover:border-gold-500/40 hover:bg-ink-800/50 transition-all flex flex-col justify-between"
            >
              {drink.image && (
                <div className="h-40 rounded-xl overflow-hidden mb-3 bg-ink-800">
                  <img
                    src={drink.image}
                    alt={drink.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="font-display text-lg text-ink-50 font-semibold group-hover:text-gold-200">{drink.name}</h3>
                  <span className="font-display text-base text-gold-300 font-bold">${drink.price}</span>
                </div>
                <p className="text-xs text-ink-400 mt-1 line-clamp-2">{drink.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GOOGLE REVIEWS & TESTIMONIALS */}
      <section className="relative py-20 bg-ink-900/60 border-y border-ink-700/60 my-12">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-gold-300 text-xs tracking-[0.3em] uppercase font-semibold">Guest Experiences</span>
            <h2 className="mt-2 font-display text-4xl text-ink-50">Loved by Guests</h2>
            <div className="mt-3 flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="fill-current text-gold-400" />
              ))}
              <span className="ml-2 text-sm text-gold-200 font-bold">4.9 / 5.0 Rating</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="glass-panel rounded-3xl p-6 border border-ink-700/60 flex flex-col justify-between relative shadow-lg"
              >
                <Quote size={28} className="text-gold-500/20 absolute top-5 right-5" />
                <div>
                  <div className="flex gap-1 mb-3">
                    {[...Array(t.stars)].map((_, s) => (
                      <Star key={s} size={14} className="fill-current text-gold-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-ink-200 leading-relaxed italic">"{t.text}"</p>
                </div>
                <div className="mt-6 pt-4 border-t border-ink-700/60 flex items-center justify-between">
                  <div>
                    <h4 className="font-display text-base text-ink-50 font-semibold">{t.name}</h4>
                    <p className="text-[0.7rem] text-gold-300/80">{t.role}</p>
                  </div>
                  <span className="text-[0.65rem] px-2 py-0.5 rounded-full bg-gold-900/40 text-gold-300 font-medium">
                    Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WEEKEND BRUNCH FEATURE BANNER */}
      <section className="relative py-20 overflow-hidden mx-auto max-w-7xl px-5 sm:px-8">
        <div className="glass-panel rounded-3xl border border-gold-500/30 overflow-hidden grid lg:grid-cols-2 gap-8 items-center p-8 sm:p-12 glow-gold">
          <div>
            <span className="text-gold-300 text-xs tracking-[0.3em] uppercase font-semibold">Saturday & Sunday | 1:00 PM – 5:00 PM</span>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl text-ink-50 leading-tight">
              Weekend Brunch & <span className="text-gold-gradient italic">Day Pours</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-ink-200 leading-relaxed">
              Serving Two Eggs with Beef Sausage, Steak & Eggs, French Toast, Avocado Toast, and cold imported beers for $6. Gather your table for the ultimate weekend vibe.
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('reservations')}
                className="bg-gold-gradient text-ink-950 font-semibold px-8 py-3.5 rounded-full hover:shadow-xl hover:shadow-gold-700/40 transition-all text-sm"
              >
                Reserve Brunch Table
              </button>
              <button
                onClick={() => onNavigate('menu')}
                className="px-8 py-3.5 rounded-full border border-ink-500 text-ink-100 hover:border-gold-400 hover:text-gold-200 transition-colors font-medium text-sm"
              >
                See Brunch Menu
              </button>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <img
              src={cocktailImage}
              alt="Signature cocktail"
              className="rounded-3xl object-cover w-full max-w-sm h-[380px] shadow-2xl animate-float border border-gold-500/20"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
