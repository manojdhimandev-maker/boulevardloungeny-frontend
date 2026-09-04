import React from 'react';
import type { PageId } from './Navbar';
import { CalendarDays, Sparkles, Gift, Users } from 'lucide-react';

type PrivateEventsSpotlightProps = {
  onNavigate: (page: PageId) => void;
};

export const PrivateEventsSpotlight: React.FC<PrivateEventsSpotlightProps> = ({ onNavigate }) => {
  return (
    <section className="relative py-10 sm:py-16 md:py-24 bg-ink-950 border-b border-gold-400/20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* LEFT COLUMN: IMAGE GRID */}
        <div className="relative grid grid-cols-2 gap-4">
          <img
            src="/instaposts-imeages/event_midnight_garden.jpg"
            alt="Boulevard Birthday Celebration"
            className="w-full h-[320px] object-cover rounded-sm border border-gold-400/30 shadow-xl"
          />
          <img
            src="/instaposts-imeages/home_hero_bg.jpg"
            alt="Boulevard VIP Private Lounge"
            className="w-full h-[320px] object-cover rounded-sm border border-gold-400/30 shadow-xl mt-8"
          />
        </div>

        {/* RIGHT COLUMN: COPY & CTA */}
        <div>
          <div className="inline-flex items-center gap-2 section-tag">
            <Gift size={14} className="text-gold-400" />
            PRIVATE CELEBRATIONS
          </div>

          <h2 className="font-fashion text-4xl sm:text-6xl font-bold uppercase tracking-wider text-ink-100 leading-tight">
            MAKE IT A<br />
            <span className="text-gold-400 font-light">BOULEVARD NIGHT.</span>
          </h2>

          <p className="mt-4 font-body text-base text-ink-300 max-w-xl leading-relaxed">
            Birthdays. Sweet 16s. VIP group outings. Corporate celebrations. Host your next milestone occasion at Boulevard Lounge with dedicated bottle presentations, custom hookah packages, and private booth reservations.
          </p>

          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-3 text-ink-200 text-sm">
              <span className="w-2 h-2 rounded-full bg-gold-400" /> Dedicated Host & VIP Bottle Parade
            </div>
            <div className="flex items-center gap-3 text-ink-200 text-sm">
              <span className="w-2 h-2 rounded-full bg-gold-400" /> Tailored Hookah & Cocktail Menus
            </div>
            <div className="flex items-center gap-3 text-ink-200 text-sm">
              <span className="w-2 h-2 rounded-full bg-gold-400" /> Private Lounge Section Buyouts
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate('private-events')}
              className="btn-gold py-4 px-8 text-sm"
            >
              PLAN YOUR EVENT
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivateEventsSpotlight;
