import { CalendarPlus, Clock, ArrowRight, MapPin, Sparkles, Music2, Wine, UtensilsCrossed } from 'lucide-react';
import { events } from '@/data/events';
import { venueInfo } from '@/data/venue';
import type { PageId } from '@/components/Navbar';

type EventsProps = {
  onNavigate: (page: PageId) => void;
};

export default function Events({ onNavigate }: EventsProps) {
  const addToGoogleCalendar = (ev: typeof events[number]) => {
    const timeMatch = ev.time.match(/(\d+):(\d+)\s*(AM|PM)/i);
    let startHour = 19;
    if (timeMatch) {
      let h = parseInt(timeMatch[1], 10);
      const ampm = timeMatch[3].toUpperCase();
      if (ampm === 'PM' && h !== 12) h += 12;
      if (ampm === 'AM' && h === 12) h = 0;
      startHour = h;
    }
    const date = ev.date.replace(/-/g, '');
    const start = `${date}T${String(startHour).padStart(2, '0')}0000`;
    const end = `${date}T${String(startHour + 3).padStart(2, '0')}0000`;
    const text = `${ev.title} at The Boulevard Lounge NY`;
    const details = ev.description;
    const location = `${venueInfo.address}, ${venueInfo.city}`;
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(text)}&dates=${encodeURIComponent(start)}/${encodeURIComponent(end)}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
  };

  return (
    <div className="animate-fade-in pb-16">
      {/* HEADER */}
      <section className="relative pt-36 pb-14 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/5865076/pexels-photo-5865076.jpeg?auto=compress&cs=tinysrgb&h=1200&w=2000"
            alt="Boulevard Lounge event atmosphere"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/90 to-ink-950" />
        </div>
        <div className="relative mx-auto max-w-3xl px-5 sm:px-8 text-center">
          <div className="section-tag">
            DJ NIGHTS · GAME WATCH PARTIES · JAZZ SESSIONS
          </div>
          <h1 className="section-title">
            Events & Special Nights
          </h1>
          <p className="section-desc max-w-xl mx-auto">
            From DJ-driven Friday nights to game-day watch parties and weekly jazz sessions — pull up a seat at The Boulevard Lounge NY.
          </p>
        </div>
      </section>

      {/* WEEKLY RECURRING HIGHLIGHTS MATRIX */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="font-display text-3xl text-ink-50">Weekly Nightly Specials</h2>
          <p className="text-xs sm:text-sm text-ink-400 mt-1">What's happening every day of the week at Boulevard Lounge</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {venueInfo.weeklyHighlights.map((hl, idx) => (
            <div
              key={hl.day}
              className="p-5 rounded-2xl border border-ink-700/60 bg-ink-900/50 hover:border-gold-500/40 hover:bg-ink-800/60 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="px-3 py-1 rounded-full bg-gold-900/50 text-gold-300 font-semibold text-xs border border-gold-500/30">
                  {hl.day}
                </span>
                <Sparkles size={14} className="text-gold-400/60" />
              </div>
              <h3 className="font-display text-xl text-ink-50 mt-2">{hl.title}</h3>
              <p className="text-xs text-ink-300 mt-1 leading-relaxed">{hl.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* UPCOMING FEATURED EVENTS */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-10">
        <div className="flex items-center justify-between border-b border-ink-700/60 pb-4 mb-8">
          <div>
            <h2 className="font-display text-3xl text-ink-50">Upcoming Featured Events</h2>
            <p className="text-xs sm:text-sm text-ink-400 mt-0.5">Special guest DJs, sports watch parties & theme nights</p>
          </div>
          <button
            onClick={() => onNavigate('reservations')}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-gold-300 font-semibold hover:text-gold-100"
          >
            Reserve Table for Any Event <ArrowRight size={14} />
          </button>
        </div>

        <div className="space-y-6">
          {events.map((ev, i) => (
            <article
              key={ev.id}
              className="group flex flex-col sm:flex-row gap-5 p-5 rounded-3xl border border-ink-700/60 bg-ink-900/40 hover:border-gold-500/50 hover:bg-ink-800/50 transition-all shadow-lg animate-fade-up"
              style={{ animationDelay: `${0.08 * i}s` }}
            >
              {/* THUMBNAIL */}
              <div className="relative sm:w-56 sm:shrink-0 h-40 sm:h-36 rounded-2xl overflow-hidden">
                <img
                  src={ev.image}
                  alt={ev.imageAlt}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-ink-950/80 backdrop-blur text-gold-200 text-[0.65rem] font-semibold tracking-wide border border-gold-500/30">
                  {ev.tag}
                </span>
              </div>

              {/* DATE + DETAILS */}
              <div className="flex gap-4 flex-1 min-w-0 items-center">
                {/* DATE BADGE */}
                <div className="shrink-0 grid place-items-center w-16 h-16 rounded-2xl glass-panel border border-gold-500/30 text-center shadow-md">
                  <div>
                    <p className="font-display text-2xl text-gold-200 font-bold leading-none">{ev.day}</p>
                    <p className="text-[0.6rem] tracking-[0.2em] text-ink-300 uppercase font-semibold mt-0.5">{ev.month}</p>
                  </div>
                </div>

                {/* TEXT */}
                <div className="flex-1 min-w-0">
                  <h2 className="font-display text-2xl sm:text-3xl text-ink-50 leading-tight group-hover:text-gold-200 transition-colors">
                    {ev.title}
                  </h2>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-gold-300 font-medium">
                    <Clock size={13} /> {ev.time}
                  </p>
                  <p className="text-xs sm:text-sm text-ink-300 mt-2 leading-relaxed">{ev.description}</p>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex sm:flex-col gap-2.5 sm:items-end sm:justify-center shrink-0">
                <button
                  onClick={() => onNavigate('reservations')}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 bg-gold-gradient text-ink-950 font-semibold px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-gold-700/40 transition-all text-xs whitespace-nowrap"
                >
                  Reserve Table <ArrowRight size={13} />
                </button>
                <a
                  href={addToGoogleCalendar(ev)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-ink-600 text-ink-200 hover:border-gold-400 hover:text-gold-200 transition-colors text-xs whitespace-nowrap"
                >
                  <CalendarPlus size={13} /> Add to Google Calendar
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* INSTAGRAM LIVE SHOWCASE BANNER */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-6">
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-gold-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 glow-gold">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="grid place-items-center w-14 h-14 rounded-2xl bg-gold-gradient text-ink-950 shrink-0 shadow-lg">
              <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </div>
            <div>
              <h3 className="font-display text-2xl text-ink-50">Follow Boulevard Lounge NY</h3>
              <p className="text-xs sm:text-sm text-ink-300 mt-0.5">
                Check out live stories, party flyers, and DJ sets on <strong className="text-gold-200">{venueInfo.instagramHandle}</strong>.
              </p>
            </div>
          </div>
          <a
            href={venueInfo.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-gold-gradient text-ink-950 font-semibold px-7 py-3.5 rounded-full hover:shadow-xl transition-all text-xs sm:text-sm"
          >
            Visit Instagram Profile ↗
          </a>
        </div>
      </section>

      {/* PRIVATE EVENTS CTA */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 pb-10 pt-6">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-gold-500/20 text-center">
          <MapPin className="mx-auto text-gold-300" size={32} />
          <h2 className="mt-4 font-display text-3xl sm:text-4xl text-ink-50">Host Your Private Celebration</h2>
          <p className="text-ink-300 mt-3 text-sm sm:text-base max-w-md mx-auto">
            We offer full lounge buyouts, birthday packages, and corporate cocktail receptions.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => onNavigate('reservations')}
              className="bg-gold-gradient text-ink-950 font-semibold px-8 py-3.5 rounded-full hover:shadow-xl hover:shadow-gold-700/40 transition-all text-sm"
            >
              Start a Reservation
            </button>
            <a
              href={venueInfo.phoneHref}
              className="px-8 py-3.5 rounded-full border border-ink-500 text-ink-100 hover:border-gold-400 hover:text-gold-200 transition-colors font-medium text-sm"
            >
              Call {venueInfo.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
