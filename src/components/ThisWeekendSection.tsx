import React from 'react';
import type { PageId } from './Navbar';
import { Calendar, Music, Sparkles, ExternalLink, Flame } from 'lucide-react';

const InstagramIcon = ({ size = 15, className = '' }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

type ThisWeekendSectionProps = {
  onNavigate: (page: PageId) => void;
};

export type WeekendEvent = {
  day: string;
  date: string;
  dj: string;
  genre: string;
  tagline: string;
  highlights: string[];
  image: string;
  video?: string;
  instaUrl: string;
};

export const weekendEvents: WeekendEvent[] = [
  {
    day: 'FRIDAY',
    date: 'FROM 9:00 PM',
    dj: 'DJ JD',
    genre: 'Fridays at Boulevard',
    tagline: 'FRIDAY NIGHT VIBES',
    highlights: ['Live DJ JD', '9:00 PM Till Late'],
    image: '/updatedfriday.png',
    instaUrl: 'https://instagram.com/boulevardloungeny',
  },
  {
    day: 'SATURDAY',
    date: 'FROM 9:00 PM',
    dj: 'DJ ENNI',
    genre: 'Saturdays at Boulevard',
    tagline: 'SATURDAY NIGHT VIBES',
    highlights: ['Live DJ Enni', '9:00 PM Till Late'],
    image: '/saturdayupdated.png',
    instaUrl: 'https://instagram.com/boulevardloungeny',
  },
];

export const ThisWeekendSection: React.FC<ThisWeekendSectionProps> = ({ onNavigate }) => {
  return (
    <section className="relative py-10 sm:py-16 md:py-20 bg-ink-950 border-b border-gold-400/20 overflow-hidden">
      {/* BACKGROUND SHADOW & GLOW */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gold-400/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-gold-400/15 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 section-tag">
              <Sparkles size={12} className="text-gold-400" />
              WEEKEND PROGRAMMING
            </div>
            <h2 className="section-title text-4xl sm:text-5xl">
              This <span className="text-gold-400 font-light">Weekend</span>
            </h2>
            <p className="section-desc mt-2">
              Fridays and Saturdays hit different at Boulevard. Live DJs, handcrafted cocktails, and high-energy hookah service till late.
            </p>
          </div>
          <button
            onClick={() => onNavigate('events')}
            className="btn-outline-gold self-start md:self-auto text-xs py-3 px-6"
          >
            SEE ALL WEEKENDS
          </button>
        </div>

        {/* 2 LARGE CARDS FOR FRIDAY & SATURDAY */}
        <div className="grid lg:grid-cols-2 gap-8">
          {weekendEvents.map((evt, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-sm overflow-hidden border border-gold-400/30 hover:border-gold-400/60 transition-all duration-500 group flex flex-col justify-between shadow-2xl relative"
            >
              {/* POSTER IMAGE HEADER */}
              <div className="relative h-[380px] sm:h-[450px] overflow-hidden bg-ink-950">
                <img
                  src={evt.image}
                  alt={evt.dj}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-transparent to-ink-950/30 pointer-events-none" />

                {/* DAY BADGE */}
                <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-sm bg-ink-950/90 border border-gold-400/40 backdrop-blur-md shadow-lg z-10">
                  <span className="font-fashion text-xs tracking-widest text-gold-400 font-bold uppercase">
                    {evt.day}
                  </span>
                </div>

                {/* TIME BADGE */}
                <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-sm bg-ink-950/90 border border-gold-400/30 backdrop-blur-md shadow-lg z-10">
                  <span className="font-fashion text-xs tracking-wider text-ink-100 font-semibold">
                    {evt.date}
                  </span>
                </div>

                {/* OVERLAY HEADING */}
                <div className="absolute bottom-4 left-6 right-6 z-10">
                  <span className="text-[10px] tracking-[0.25em] text-gold-400 font-semibold uppercase block mb-0.5">
                    {evt.tagline}
                  </span>
                  <h3 className="font-fashion text-3xl sm:text-4xl font-bold uppercase text-ink-100 group-hover:text-gold-400 transition-colors drop-shadow-md">
                    {evt.dj}
                  </h3>
                  <p className="text-xs text-ink-200 font-medium tracking-wide mt-0.5">
                    {evt.genre}
                  </p>
                </div>
              </div>

              {/* CARD FOOTER WITH HIGHLIGHTS & ACTIONS */}
              <div className="p-6 bg-ink-900/90 flex flex-col justify-between flex-1 gap-6">
                <div className="flex flex-wrap gap-2">
                  {evt.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/20 text-[11px] text-gold-300 font-medium tracking-wider"
                    >
                       {h}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-gold-400/20 flex flex-wrap items-center justify-between gap-4">
                  <a
                    href={evt.instaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs text-ink-300 hover:text-gold-400 transition-colors font-medium tracking-wider"
                  >
                    <InstagramIcon size={15} className="text-gold-400" />
                    VIEW ON INSTAGRAM
                  </a>

                  <button
                    onClick={() => onNavigate('reservations')}
                    className="btn-gold text-xs py-3 px-6 shadow-md"
                  >
                    RESERVE TABLE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThisWeekendSection;
