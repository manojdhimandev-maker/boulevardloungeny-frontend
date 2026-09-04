import { useEffect, useState } from 'react';
import { Menu, X, Wine, CalendarDays, Phone } from 'lucide-react';
import { venueInfo } from '@/data/venue';

type NavbarProps = {
  onNavigate: (page: PageId) => void;
  current: PageId;
};

export type PageId = 'home' | 'menu' | 'reservations' | 'about' | 'events';

const links: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'menu', label: 'Menu' },
  { id: 'reservations', label: 'Reservations' },
  { id: 'events', label: 'Events' },
  { id: 'about', label: 'About' },
];

export default function Navbar({ onNavigate, current }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: PageId) => {
    onNavigate(id);
    setOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass-panel border-b border-ink-700/60 py-3 shadow-lg' : 'py-5 bg-transparent'
        }`}
      >
        <nav className="mx-auto max-w-7xl px-5 sm:px-8 flex items-center justify-between">
          <button onClick={() => go('home')} className="flex items-center gap-3 group text-left">
            <span className="grid place-items-center w-9 h-9 rounded-full bg-gold-400 text-ink-950 shadow-md shadow-gold-400/20 group-hover:scale-105 transition-transform">
              <Wine size={18} strokeWidth={2.2} />
            </span>
            <span className="flex flex-col">
              <span className="font-display text-xl sm:text-2xl font-normal tracking-[0.25em] uppercase text-ink-100 leading-none">
                The Boulevard
              </span>
              <span className="text-gold-400 text-[8px] tracking-[0.35em] uppercase mt-1 font-body font-medium">
                Luxury Lounge • New York
              </span>
            </span>
          </button>

          <ul className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => go(link.id)}
                  className={`font-body text-[11px] font-medium tracking-[0.15em] uppercase transition-colors py-1 ${
                    current === link.id
                      ? 'text-gold-400 font-semibold'
                      : 'text-ink-300 hover:text-gold-400'
                  }`}
                >
                  {link.label}
                  {current === link.id && (
                    <span className="block h-[1px] bg-gold-400 mt-0.5 rounded-full" />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <button
              onClick={() => go('reservations')}
              className="btn-gold"
            >
              Reserve a Table
            </button>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden grid place-items-center w-10 h-10 rounded-full bg-ink-800/80 text-gold-200 border border-ink-700/60"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        <div
          className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${
            open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <ul className="px-5 pt-3 pb-5 space-y-1 glass-panel mt-3 mx-3 rounded-2xl border border-ink-700/60">
            {links.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => go(link.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    current === link.id
                      ? 'bg-ink-700/60 text-gold-200 font-semibold'
                      : 'text-ink-100 hover:bg-ink-800/60'
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => go('reservations')}
                className="mt-2 w-full bg-gold-gradient text-ink-950 font-semibold px-4 py-3 rounded-xl shadow-lg"
              >
                Reserve a Table
              </button>
            </li>
          </ul>
        </div>
      </header>

      {/* MOBILE PERSISTENT FLOATING BOTTOM ACTION BAR */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 p-3 glass-panel border-t border-ink-700/60 backdrop-blur-xl">
        <div className="flex gap-2">
          <a
            href={venueInfo.phoneHref}
            className="flex-1 py-3 px-4 rounded-full border border-ink-600 bg-ink-900/90 text-ink-100 font-semibold text-xs inline-flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <Phone size={15} className="text-gold-400" /> Call Lounge
          </a>
          <button
            onClick={() => go('reservations')}
            className="flex-1 py-3 px-4 rounded-full bg-gold-gradient text-ink-950 font-semibold text-xs inline-flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
          >
            <CalendarDays size={15} /> Book Table
          </button>
        </div>
      </div>
    </>
  );
}
