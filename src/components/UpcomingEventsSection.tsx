import React from 'react';
import type { PageId } from './Navbar';

type UpcomingEventsSectionProps = {
  onNavigate: (page: PageId) => void;
};

export const upcomingOccasions = [
  {
    id: 'velvet-sessions',
    day: '14',
    month: 'AUG',
    subtitle: 'JAZZ & CHAMPAGNE EVENING',
    title: 'Velvet Sessions',
    timing: 'Doors 8PM · Show 9PM',
    price: 'From $85',
    image: '/instaposts-imeages/event_jazz_wednesdays.jpg',
    imageAlt: 'Jazz and Champagne Evening',
  },
  {
    id: 'chefs-table',
    day: '21',
    month: 'AUG',
    subtitle: 'SEVEN-COURSE TASTING MENU',
    title: "Chef's Table Night",
    timing: 'Seatings at 7PM & 9:30PM',
    price: 'From $220',
    image: '/instaposts-imeages/menu_card_mains.jpg',
    imageAlt: 'Seven Course Tasting Menu',
  },
  {
    id: 'midnight-garden',
    day: '28',
    month: 'AUG',
    subtitle: 'LATE NIGHT COCKTAIL AFFAIR',
    title: 'Midnight Garden',
    timing: 'Doors 11PM · Close 4AM',
    price: 'From $45',
    image: '/instaposts-imeages/event_midnight_garden.jpg',
    imageAlt: 'Late Night Cocktail Affair',
  },
];

export const UpcomingEventsSection: React.FC<UpcomingEventsSectionProps> = ({ onNavigate }) => {
  return (
    <section className="relative mx-auto max-w-7xl px-5 sm:px-8 py-[100px]">
      {/* HEADER ROW */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 border-b border-gold-400/15 pb-6">
        <div>
          <span className="font-body text-[10px] tracking-[0.25em] font-semibold text-gold-400 uppercase block mb-2">
            UPCOMING
          </span>
          <h2 className="font-fashion text-3xl sm:text-4xl lg:text-5xl font-light text-ink-100 leading-tight">
            Events <span className="font-fashion italic font-normal text-gold-400">&</span> Occasions
          </h2>
        </div>
        <button
          onClick={() => onNavigate('events')}
          className="btn-outline-gold self-start sm:self-auto py-2.5 px-6 text-[10px]"
        >
          VIEW ALL EVENTS
        </button>
      </div>

      {/* 3 CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {upcomingOccasions.map((item, i) => (
          <div
            key={item.id}
            onClick={() => onNavigate('reservations')}
            className="group cursor-pointer glass-panel rounded-sm overflow-hidden border border-gold-400/20 hover:border-gold-400/50 transition-all duration-300 flex flex-col justify-between shadow-xl animate-fade-up"
            style={{ animationDelay: `${0.1 * i}s` }}
          >
            {/* IMAGE WITH TOP-LEFT DATE BADGE */}
            <div className="relative h-64 sm:h-60 overflow-hidden bg-ink-950 border-b border-gold-400/10">
              <img
                src={item.image}
                alt={item.imageAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
              />
              {/* DATE BADGE */}
              <div className="absolute top-3.5 left-3.5 w-11 h-13 bg-ink-950/85 backdrop-blur border border-gold-400/30 rounded-sm flex flex-col items-center justify-center shadow-lg">
                <span className="font-fashion text-xl text-gold-400 font-light leading-none">{item.day}</span>
                <span className="font-body text-[8px] tracking-[0.2em] text-gold-400/90 font-semibold uppercase mt-0.5">
                  {item.month}
                </span>
              </div>
              {/* DEPOSIT BADGE */}
              <div className="absolute top-3.5 right-3.5 px-2.5 py-1 bg-ink-950/85 backdrop-blur border border-gold-400/30 rounded text-[9px] font-semibold tracking-wider text-gold-300 uppercase shadow-lg">
                {item.id === 'midnight-garden' || item.id === 'chefs-table' ? '⚡ $50 Deposit' : '✨ No Deposit'}
              </div>
            </div>

            {/* CARD BODY */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <span className="font-body text-[9px] tracking-[0.22em] font-semibold text-gold-400 uppercase mb-2 block">
                  {item.subtitle}
                </span>
                <h3 className="font-fashion text-2xl sm:text-3xl font-light text-ink-100 group-hover:text-gold-400 transition-colors leading-tight mb-4">
                  {item.title}
                </h3>
              </div>

              {/* CARD FOOTER DIVIDER ROW */}
              <div className="pt-4 border-t border-gold-400/15 flex items-end justify-between gap-3 mt-4">
                <div>
                  <span className="font-body text-[11px] text-ink-400 block mb-0.5">{item.timing}</span>
                  <span className="font-body text-xs sm:text-sm text-gold-400 font-medium">{item.price}</span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('reservations');
                  }}
                  className="btn-gold py-2 px-5 text-[10px]"
                >
                  RESERVE
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UpcomingEventsSection;
