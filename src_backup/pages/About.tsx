import { Wine, Sparkles, Music2, UtensilsCrossed, MapPin, Clock, Phone, MessageSquare, AtSign, ArrowRight } from 'lucide-react';
import { venueInfo } from '@/data/venue';
import type { PageId } from '@/components/Navbar';

type AboutProps = {
  onNavigate: (page: PageId) => void;
};

const interiorImage =
  'https://images.pexels.com/photos/5865076/pexels-photo-5865076.jpeg?auto=compress&cs=tinysrgb&h=900&w=1400';
const barImage =
  'https://images.pexels.com/photos/11828428/pexels-photo-11828428.jpeg?auto=compress&cs=tinysrgb&h=900&w=1400';
const cocktailImage =
  'https://images.pexels.com/photos/25596638/pexels-photo-25596638.jpeg?auto=compress&cs=tinysrgb&h=1100&w=850';

export default function About({ onNavigate }: AboutProps) {
  return (
    <div className="animate-fade-in">
      {/* HEADER */}
      <section className="relative pt-36 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src={interiorImage} alt="The Boulevard Lounge interior" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/90 to-ink-950" />
        </div>
        <div className="relative mx-auto max-w-3xl px-5 sm:px-8 text-center">
          <div className="section-tag">ABOUT US</div>
          <h1 className="section-title">The Boulevard Story</h1>
          <p className="section-desc max-w-xl mx-auto">
            We're a modern cocktail lounge built around one belief: a great night out starts with a great drink in a room that feels like yours.
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img src={barImage} alt="The Boulevard bar" className="rounded-3xl object-cover w-full h-[480px] shadow-2xl shadow-ink-950" />
            <div className="absolute -bottom-5 -left-4 glass-panel rounded-2xl px-6 py-4 border border-gold-500/30">
              <p className="font-display text-3xl text-gold-gradient leading-none">100%</p>
              <p className="text-xs text-ink-300 mt-1 tracking-wide">House-made syrups & bitters</p>
            </div>
          </div>
          <div>
            <span className="text-gold-300 text-xs tracking-[0.3em] uppercase">Since 2019</span>
            <h2 className="mt-3 font-display text-4xl text-ink-50 leading-tight">
              Built by people who love <span className="text-gold-gradient italic">the craft</span>
            </h2>
            <p className="mt-5 text-ink-200 leading-relaxed">
              The Boulevard Lounge opened with a simple promise: serious cocktails without the stuffy attitude. Our bar team trains in the classics and experiments with the seasons — every menu change brings something new to discover.
            </p>
            <p className="mt-4 text-ink-300 leading-relaxed">
              By day, we're a sunny brunch spot with bottomless mimosas and a packed patio. By night, the lights drop, the playlist turns up, and the room fills with regulars and first-timers alike. Whether it's a date, a birthday, or just a Tuesday — there's a seat for you here.
            </p>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="relative py-20 bg-ink-900/40 border-y border-ink-700/40">
        <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-gold-300 text-xs tracking-[0.3em] uppercase">What We're About</span>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl text-ink-50">Three things we don't compromise on</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Wine, title: 'The Drink', desc: 'Classic technique, premium spirits, and house-made ingredients. Every cocktail is built to order — no shortcuts.' },
              { icon: UtensilsCrossed, title: 'The Food', desc: 'A kitchen that treats brunch and late-night bites with equal care. Fresh, seasonal, and made to share.' },
              { icon: Music2, title: 'The Vibe', desc: 'A room that adapts to the hour: mellow jazz on a Wednesday, a packed floor on a Saturday. Always warm, never pretentious.' },
            ].map((v, i) => (
              <div key={v.title} className="glass-panel rounded-2xl p-7 border border-ink-700/60 animate-fade-up" style={{ animationDelay: `${0.1 * i}s` }}>
                <span className="grid place-items-center w-12 h-12 rounded-xl bg-gold-gradient text-ink-950 mb-4">
                  <v.icon size={22} />
                </span>
                <h3 className="font-display text-2xl text-ink-50">{v.title}</h3>
                <p className="mt-2 text-ink-300 leading-relaxed text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY STRIP */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
        <div className="grid sm:grid-cols-3 gap-4">
          <img src={interiorImage} alt="Lounge interior" className="rounded-2xl object-cover w-full h-64 hover:opacity-90 transition-opacity" />
          <img src={cocktailImage} alt="Signature cocktail" className="rounded-2xl object-cover w-full h-64 hover:opacity-90 transition-opacity" />
          <img src={barImage} alt="The bar" className="rounded-2xl object-cover w-full h-64 hover:opacity-90 transition-opacity" />
        </div>
      </section>

      {/* LOCATION & HOURS */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="glass-panel rounded-3xl p-7 border border-ink-700/60">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="text-gold-300" size={22} />
              <h2 className="font-display text-3xl text-ink-50">Find us</h2>
            </div>
            <p className="text-ink-200">{venueInfo.address}</p>
            <p className="text-ink-200">{venueInfo.city}</p>
            <a href={venueInfo.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-gold-200 hover:gap-3 transition-all font-medium">
              Open in Google Maps <ArrowRight size={15} />
            </a>

            <div className="mt-6 rounded-2xl overflow-hidden border border-ink-700/60 h-56">
              <iframe
                title="The Boulevard Lounge location"
                src={`https://www.google.com/maps?q=${encodeURIComponent(venueInfo.mapsEmbedQuery)}&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(0.9) hue-rotate(180deg) sepia(0.2)' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-panel rounded-3xl p-7 border border-ink-700/60">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="text-gold-300" size={22} />
                <h2 className="font-display text-3xl text-ink-50">Hours</h2>
              </div>
              <ul className="space-y-2.5 text-sm">
                {venueInfo.hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-3 pb-2.5 border-b border-ink-700/40 last:border-0">
                    <span className="text-ink-200">{h.day}</span>
                    <span className={h.time === 'Closed' ? 'text-wine-600' : 'text-ink-50 font-medium'}>{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-panel rounded-3xl p-7 border border-ink-700/60">
              <h2 className="font-display text-3xl text-ink-50 mb-4">Get in touch</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <a href={venueInfo.phoneHref} className="flex items-center gap-2.5 p-3 rounded-xl bg-ink-800/60 hover:bg-ink-700/60 transition-colors text-sm">
                  <Phone size={16} className="text-gold-400" /> {venueInfo.phone}
                </a>
                <a href={venueInfo.textHref} className="flex items-center gap-2.5 p-3 rounded-xl bg-ink-800/60 hover:bg-ink-700/60 transition-colors text-sm">
                  <MessageSquare size={16} className="text-gold-400" /> Text {venueInfo.text}
                </a>
                <a href={venueInfo.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 p-3 rounded-xl bg-ink-800/60 hover:bg-ink-700/60 transition-colors text-sm">
                  <AtSign size={16} className="text-gold-400" /> {venueInfo.instagramHandle}
                </a>
                <button onClick={() => onNavigate('reservations')} className="flex items-center gap-2.5 p-3 rounded-xl bg-gold-gradient text-ink-950 font-semibold text-sm justify-center">
                  <Sparkles size={16} /> Reserve online
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
