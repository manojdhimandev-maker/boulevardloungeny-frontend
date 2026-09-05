import { Phone, MessageSquare, AtSign, MapPin, Clock, Wine } from 'lucide-react';
import { venueInfo } from '@/data/venue';
import type { PageId } from './Navbar';

type FooterProps = {
  onNavigate: (page: PageId) => void;
};

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="relative mt-6 sm:mt-12 md:mt-20 border-t border-ink-700/60 bg-ink-900/60 pb-20 md:pb-0">
      <div className="absolute inset-0 bg-noise opacity-40 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 py-12 sm:py-16 grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-12">
        {/* BRAND & LOGO (4 COLS) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex flex-col items-start gap-2.5">
            <div className="flex items-center gap-3">
              <img
                src="/updatedLogo.png"
                alt="The Boulevard Lounge Logo"
                className="h-14 w-14 sm:h-16 sm:w-16 shrink-0 object-cover rounded-full border-2 border-gold-300 shadow-2xl shadow-gold-400/40 bg-black"
              />
              <span className="font-fashion text-xl sm:text-2xl font-bold tracking-[0.14em] uppercase text-ink-100">
                The Boulevard
              </span>
            </div>
            <span className="text-gold-300 text-xs sm:text-sm tracking-[0.16em] uppercase font-fashion font-bold pt-0.5">
              Staten Island's Premier Lounge
            </span>
          </div>
          <p className="text-ink-300 text-sm leading-relaxed max-w-sm">
            A modern cocktail lounge serving craft drinks, weekend brunch, and unforgettable nights.
          </p>
        </div>

        {/* EXPLORE LINKS (2 COLS) */}
        <div className="lg:col-span-2">
          <h4 className="font-display text-lg text-gold-200 mb-4 font-semibold tracking-wide border-b border-gold-500/20 pb-2 inline-block sm:block">Explore</h4>
          <ul className="space-y-2.5 text-sm">
            {[
              { id: 'home' as PageId, label: 'Home' },
              { id: 'menu' as PageId, label: 'Menu' },
              { id: 'happy-hour' as PageId, label: 'Happy Hour' },
              { id: 'reservations' as PageId, label: 'Reservations' },
              { id: 'events' as PageId, label: 'Events' },
              { id: 'private-events' as PageId, label: 'Private Events' },
              { id: 'about' as PageId, label: 'About Us' },
              { id: 'contact' as PageId, label: 'Contact Us' },
            ].map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => onNavigate(l.id)}
                  className="text-ink-300 hover:text-gold-200 transition-colors text-left"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT INFO (3 COLS) */}
        <div className="lg:col-span-3">
          <h4 className="font-display text-lg text-gold-200 mb-4 font-semibold tracking-wide border-b border-gold-500/20 pb-2 inline-block sm:block">Contact</h4>
          <ul className="space-y-3.5 text-sm text-ink-300">
            <li>
              <a href={venueInfo.phoneHref} className="flex items-center gap-3 hover:text-gold-200 transition-colors group">
                <div className="p-2 rounded-lg bg-ink-800 border border-ink-700/60 text-gold-400 group-hover:border-gold-400/50 transition-colors shrink-0">
                  <Phone size={14} />
                </div>
                <span>{venueInfo.phone}</span>
              </a>
            </li>
            <li>
              <a href={venueInfo.textHref} className="flex items-center gap-3 hover:text-gold-200 transition-colors group">
                <div className="p-2 rounded-lg bg-ink-800 border border-ink-700/60 text-gold-400 group-hover:border-gold-400/50 transition-colors shrink-0">
                  <MessageSquare size={14} />
                </div>
                <span>Text {venueInfo.text}</span>
              </a>
            </li>
            <li>
              <a href={venueInfo.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-gold-200 transition-colors group">
                <div className="p-2 rounded-lg bg-ink-800 border border-ink-700/60 text-gold-400 group-hover:border-gold-400/50 transition-colors shrink-0">
                  <AtSign size={14} />
                </div>
                <span>{venueInfo.instagramHandle}</span>
              </a>
            </li>
            <li>
              <a href={venueInfo.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-gold-200 transition-colors group">
                <div className="p-2 rounded-lg bg-ink-800 border border-ink-700/60 text-gold-400 group-hover:border-gold-400/50 transition-colors shrink-0 mt-0.5">
                  <MapPin size={14} />
                </div>
                <span className="leading-snug">
                  {venueInfo.address}
                  <br />
                  {venueInfo.city}
                </span>
              </a>
            </li>
          </ul>
        </div>

        {/* OPERATING HOURS (3 COLS) */}
        <div className="lg:col-span-3">
          <h4 className="font-display text-lg text-gold-200 mb-4 font-semibold tracking-wide border-b border-gold-500/20 pb-2 inline-block sm:block">Hours</h4>
          <ul className="space-y-2 text-xs sm:text-sm text-ink-300">
            {venueInfo.hours.map((h) => (
              <li key={h.day} className="flex items-center justify-between gap-2 py-0.5 border-b border-ink-800/50 last:border-0">
                <span className="flex items-center gap-1.5 text-ink-300 font-medium shrink-0">
                  <Clock size={12} className="text-gold-400/80" />
                  {h.day}
                </span>
                <span className={`font-medium whitespace-nowrap text-right ${h.time === 'Closed' ? 'text-rose-400' : 'text-gold-100'}`}>{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative border-t border-ink-700/40">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink-400">
          <p>© {new Date().getFullYear()} The Boulevard Lounge. All rights reserved.</p>
          <p className="font-display tracking-wide text-gold-300/80">Good drinks. Good company. Good nights.</p>
        </div>
      </div>
    </footer>
  );
}
