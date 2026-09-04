import { useEffect, useState } from 'react';
import { Menu, X, Wine, CalendarDays, Phone } from 'lucide-react';
import { venueInfo } from '@/data/venue';

type NavbarProps = {
  onNavigate: (page: PageId, categoryId?: string) => void;
  current: PageId;
};

export type PageId = 'home' | 'menu' | 'hookah' | 'events' | 'private-events' | 'reservations' | 'about' | 'contact';

const links: { id: PageId; label: string }[] = [
  { id: 'home', label: 'HOME' },
  { id: 'menu', label: 'MENU' },
  { id: 'hookah', label: 'HOOKAH' },
  { id: 'events', label: 'WEEKENDS' },
  { id: 'private-events', label: 'PRIVATE EVENTS' },
  { id: 'reservations', label: 'RESERVATIONS' },
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
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* BRAND LOGO */}
          <button onClick={() => go('home')} className="flex items-center gap-2.5 group text-left focus:outline-none shrink-0">
            <img
              src="/logo.png"
              alt="The Boulevard Lounge Logo"
              className="h-9 w-9 sm:h-10 sm:w-10 object-cover rounded-full border border-gold-400/50 shadow-md shadow-gold-400/20 group-hover:scale-105 group-hover:border-gold-300 transition-all duration-300"
            />
            <span className="flex flex-col">
              <span className="font-fashion text-lg sm:text-xl font-semibold tracking-[0.2em] uppercase text-ink-100 leading-none group-hover:text-gold-400 transition-colors whitespace-nowrap">
                The Boulevard
              </span>
              <span className="text-gold-400 text-[8px] sm:text-[9px] tracking-[0.16em] uppercase mt-1 font-fashion font-semibold whitespace-nowrap">
                Staten Island's premier lounge
              </span>
            </span>
          </button>

          {/* DESKTOP NAV LINKS */}
          <ul className="hidden lg:flex items-center gap-5 xl:gap-7">
            {links.map((link) => (
              <li key={link.id} className="shrink-0">
                <button
                  onClick={() => go(link.id)}
                  className={`whitespace-nowrap font-fashion text-xs font-semibold tracking-[0.14em] uppercase transition-colors py-1.5 ${
                    current === link.id
                      ? 'text-gold-400 border-b border-gold-400'
                      : 'text-ink-100 hover:text-gold-400'
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* DESKTOP RESERVE BUTTON */}
          <div className="hidden lg:block shrink-0">
            <button
              onClick={() => go('reservations')}
              className="btn-gold whitespace-nowrap py-2.5 px-5 text-xs tracking-[0.14em] font-fashion font-bold shadow-lg"
            >
              Reserve a Table
            </button>
          </div>

          {/* MOBILE HAMBURGER BUTTON */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden grid place-items-center w-10 h-10 rounded-full bg-ink-800/80 text-gold-200 border border-ink-700/60 shrink-0"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {/* MOBILE DROPDOWN MENU */}
        <div
          className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${
            open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <ul className="px-5 pt-3 pb-5 space-y-1 glass-panel mt-3 mx-3 rounded-2xl border border-ink-700/60">
            {links.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => go(link.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-base font-fashion font-semibold tracking-wider transition-colors ${
                    current === link.id
                      ? 'bg-ink-700/60 text-gold-400'
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
                className="mt-2 w-full bg-gold-gradient text-ink-950 font-fashion font-bold uppercase tracking-wider px-4 py-3 rounded-xl shadow-lg"
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
