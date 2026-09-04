import { useEffect, useState } from 'react';
import { Menu, X, Wine, CalendarDays, Phone } from 'lucide-react';
import { venueInfo } from '@/data/venue';

type NavbarProps = {
  onNavigate: (page: PageId, categoryId?: string) => void;
  current: PageId;
};

export type PageId = 'home' | 'menu' | 'hookah' | 'events' | 'happy-hour' | 'private-events' | 'reservations' | 'about' | 'contact';

const links: { id: PageId; label: string }[] = [
  { id: 'home', label: 'HOME' },
  { id: 'menu', label: 'MENU' },
  { id: 'happy-hour', label: 'HAPPY HOUR' },
  { id: 'hookah', label: 'HOOKAH' },
  { id: 'events', label: 'WEEKENDS' },
  { id: 'private-events', label: 'PRIVATE EVENTS' },
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
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'glass-panel border-b border-ink-700/60 py-3 shadow-lg' : 'py-5 bg-transparent'
          }`}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* BRAND LOGO */}
          <button onClick={() => go('home')} className="flex items-center gap-2.5 sm:gap-3 group text-left focus:outline-none shrink-0">
            <img
              src="/updatedLogo.png"
              alt="The Boulevard Lounge Logo"
              className="h-10 w-10 sm:h-13 sm:w-13 object-cover rounded-full border-2 border-gold-300 shadow-xl shadow-gold-400/35 transition-all duration-300 bg-black"
            />
            <span className="font-fashion text-base sm:text-lg lg:text-xl font-bold tracking-[0.14em] uppercase text-ink-100 group-hover:text-gold-300 transition-colors whitespace-nowrap">
              The Boulevard
            </span>
          </button>

          {/* DESKTOP NAV LINKS */}
          <ul className="hidden lg:flex items-center gap-5 xl:gap-7">
            {links.map((link) => (
              <li key={link.id} className="shrink-0">
                <button
                  onClick={() => go(link.id)}
                  className={`whitespace-nowrap font-fashion text-xs font-semibold tracking-[0.14em] uppercase transition-colors py-1.5 ${current === link.id
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
          className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
        >
          <ul className="px-5 pt-3 pb-5 space-y-1 glass-panel mt-3 mx-3 rounded-2xl border border-ink-700/60">
            {links.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => go(link.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-base font-fashion font-semibold tracking-wider transition-colors ${current === link.id
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
                className="btn-gold mt-2 w-full text-xs font-bold shadow-lg"
              >
                RESERVE A TABLE
              </button>
            </li>
          </ul>
        </div>
      </header>

      {/* MOBILE PERSISTENT FLOATING BOTTOM ACTION BAR */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 p-2 bg-ink-950/95 border-t border-gold-400/20 backdrop-blur-xl shadow-2xl">
        <div className="max-w-md mx-auto">
          <button
            onClick={() => go('reservations')}
            className="btn-gold w-full !py-2.5 !px-4 !text-xs font-bold tracking-[0.14em] gap-2 shadow-lg rounded-sm flex items-center justify-center"
          >
            <CalendarDays size={14} className="shrink-0" /> BOOK TABLE
          </button>
        </div>
      </div>
    </>
  );
}
