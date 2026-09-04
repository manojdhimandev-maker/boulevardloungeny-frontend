import React from 'react';
import { venueInfo } from '@/data/venue';
import type { PageId } from './Navbar';

type TableAwaitsCtaSectionProps = {
  onNavigate: (page: PageId) => void;
};

export const TableAwaitsCtaSection: React.FC<TableAwaitsCtaSectionProps> = ({ onNavigate }) => {
  return (
    <section className="relative py-12 sm:py-20 md:py-[100px] my-0 overflow-hidden border-y border-gold-400/20 bg-ink-950">
      {/* ATMOSPHERIC BACKGROUND WITH DARK GRADIENT OVERLAY */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/instaposts-imeages/table_cta_bg.jpg"
          alt="Boulevard Lounge evening ambiance"
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-950/90 to-ink-950" />
      </div>

      {/* CENTERED CONTENT */}
      <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-8 text-center">
        {/* SMALL TOP TAG */}
        <span className="font-body text-[10px] tracking-[0.25em] font-semibold text-gold-400 uppercase block mb-3">
          FINAL RESERVATION CALL
        </span>

        {/* MAIN DISPLAY TITLE */}
        <h2 className="font-fashion text-4xl sm:text-6xl font-bold text-ink-100 uppercase leading-tight mb-4">
          YOUR TABLE. YOUR CREW.<br />
          <span className="text-gold-400 font-light">YOUR NIGHT.</span>
        </h2>

        {/* SUBTITLE PARAGRAPH */}
        <p className="font-body text-xs sm:text-sm text-ink-300 max-w-xl mx-auto leading-relaxed mb-8">
          Join us for cocktails, hookah, and vivid weekend music at Staten Island's premier lounge. Book your table ahead to guarantee booth seating.
        </p>

        {/* BUTTONS ROW */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <button
            onClick={() => onNavigate('reservations')}
            className="btn-gold py-4 px-8 text-xs font-bold font-fashion tracking-[0.18em] uppercase"
          >
            RESERVE NOW
          </button>
          <button
            onClick={() => onNavigate('private-events')}
            className="btn-outline-gold py-4 px-8 text-xs font-bold font-fashion tracking-[0.18em] uppercase"
          >
            PRIVATE EVENTS
          </button>
        </div>

        {/* CONTACT DETAILS FOOTER */}
        <p className="font-body text-[11px] text-ink-400 tracking-wider uppercase">
          <a href={venueInfo.phoneHref} className="hover:text-gold-400 transition-colors">
            {venueInfo.phone}
          </a>
          <span className="mx-2.5 text-gold-400/40">•</span>
          <a href={`mailto:${venueInfo.email}`} className="hover:text-gold-400 transition-colors">
            {venueInfo.email}
          </a>
        </p>
      </div>
    </section>
  );
};

export default TableAwaitsCtaSection;
