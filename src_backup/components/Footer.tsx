import { Phone, MessageSquare, AtSign, MapPin, Clock, Wine } from 'lucide-react';
import { venueInfo } from '@/data/venue';
import type { PageId } from './Navbar';

type FooterProps = {
  onNavigate: (page: PageId) => void;
};

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="relative mt-20 border-t border-ink-700/60 bg-ink-900/60">
      <div className="absolute inset-0 bg-noise opacity-40 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="grid place-items-center w-9 h-9 rounded-full bg-gold-gradient text-ink-950">
              <Wine size={18} strokeWidth={2.2} />
            </span>
            <span className="font-display text-xl">
              The Boulevard
              <span className="block text-gold-300 text-[0.6rem] tracking-[0.3em] uppercase font-body">
                Lounge
              </span>
            </span>
          </div>
          <p className="text-ink-300 text-sm leading-relaxed max-w-xs">
            A modern cocktail lounge serving craft drinks, weekend brunch, and unforgettable nights.
          </p>
        </div>

        <div>
          <h4 className="font-display text-lg text-gold-200 mb-4">Explore</h4>
          <ul className="space-y-2.5 text-sm">
            {[
              { id: 'home' as PageId, label: 'Home' },
              { id: 'menu' as PageId, label: 'Menu' },
              { id: 'reservations' as PageId, label: 'Reservations' },
              { id: 'events' as PageId, label: 'Events' },
              { id: 'about' as PageId, label: 'About Us' },
            ].map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => onNavigate(l.id)}
                  className="text-ink-300 hover:text-gold-200 transition-colors"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg text-gold-200 mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-ink-300">
            <li>
              <a href={venueInfo.phoneHref} className="flex items-center gap-2.5 hover:text-gold-200 transition-colors">
                <Phone size={15} className="text-gold-400" /> {venueInfo.phone}
              </a>
            </li>
            <li>
              <a href={venueInfo.textHref} className="flex items-center gap-2.5 hover:text-gold-200 transition-colors">
                <MessageSquare size={15} className="text-gold-400" /> Text {venueInfo.text}
              </a>
            </li>
            <li>
              <a href={venueInfo.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-gold-200 transition-colors">
                <AtSign size={15} className="text-gold-400" /> {venueInfo.instagramHandle}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin size={15} className="text-gold-400 mt-0.5" />
              <span>
                {venueInfo.address}
                <br />
                {venueInfo.city}
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg text-gold-200 mb-4">Hours</h4>
          <ul className="space-y-2 text-sm text-ink-300">
            {venueInfo.hours.map((h) => (
              <li key={h.day} className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2">
                  <Clock size={13} className="text-gold-400/70" />
                  {h.day}
                </span>
                <span className={h.time === 'Closed' ? 'text-wine-600' : 'text-ink-100'}>{h.time}</span>
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
