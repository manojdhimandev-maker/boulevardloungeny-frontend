import React from 'react';
import { Sparkles, Clock, Wine, Utensils, Flame, Calendar, Phone, MapPin, ChevronRight, Award, CheckCircle2 } from 'lucide-react';
import { venueInfo } from '@/data/venue';
import type { PageId } from '@/components/Navbar';

type HappyHourPageProps = {
  onNavigate: (page: PageId) => void;
};

export const HappyHourPage: React.FC<HappyHourPageProps> = ({ onNavigate }) => {
  return (
    <div className="animate-fade-in bg-ink-950 text-ink-100 min-h-screen pb-0">
      {/* 01 — HERO SECTION */}
      <section className="relative pt-24 sm:pt-32 md:pt-36 pb-12 sm:pb-20 border-b border-gold-400/20 bg-ink-950 overflow-hidden">
        {/* Subtle atmospheric glows */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-burgundy-800/20 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-noise opacity-20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
            {/* LEFT: FULL CLEAR HERO IMAGE */}
            <div className="lg:col-span-5 flex justify-center w-full order-2 lg:order-1">
              <div className="relative group w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-none">
                <div className="absolute -inset-1 rounded-sm bg-gradient-to-r from-gold-300 via-gold-500 to-gold-700 opacity-40 blur group-hover:opacity-70 transition duration-500" />
                <div className="relative glass-panel rounded-sm p-2 sm:p-3 border border-gold-400/40 shadow-2xl overflow-hidden bg-ink-900/90">
                  <img
                    src="/hero_happyHour.jpg"
                    alt="Boulevard Lounge Happy Hour Specials"
                    className="w-full h-auto object-cover rounded-sm shadow-lg group-hover:scale-[1.01] transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT: TEXT & DETAILS */}
            <div className="lg:col-span-7 flex flex-col items-start text-left order-1 lg:order-2">
              {/* BADGE */}
              <div className="inline-flex items-center gap-2.5 section-tag !text-sm sm:!text-base md:!text-lg font-bold tracking-[0.16em] mb-4 !whitespace-normal max-w-full">
                <Sparkles size={18} className="text-gold-400 animate-pulse shrink-0" />
                <span>SUNDAY – THURSDAY | 5:00 PM – 8:00 PM</span>
              </div>

              {/* MAIN TITLE */}
              <h1 className="font-fashion text-3xl sm:text-5xl lg:text-7xl font-bold uppercase tracking-[0.03em] leading-[1.02] text-ink-100">
                HAPPY <span className="text-gold-400 font-light italic">HOURS</span>
              </h1>

              <p className="mt-3 sm:mt-4 font-body text-sm sm:text-base lg:text-lg text-ink-200 leading-relaxed font-light max-w-xl">
                Your week deserves a little more Boulevard. Whether catching up with colleagues after work or starting a night out with friends, Boulevard Lounge is Staten Island's top destination for Happy Hour.
              </p>

              {/* CTA BUTTONS */}
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                <button
                  onClick={() => onNavigate('reservations')}
                  className="btn-gold py-3.5 sm:py-4 px-6 sm:px-8 text-xs font-bold w-full sm:w-auto justify-center"
                >
                  RESERVE A TABLE
                </button>
                <a
                  href="#happy-hour-menu"
                  className="btn-outline-gold py-3.5 sm:py-4 px-6 sm:px-8 text-xs font-bold w-full sm:w-auto justify-center"
                >
                  VIEW SPECIALS MENU
                </a>
              </div>

              {/* VENUE CONTACT QUICK BAR */}
              <div className="mt-6 sm:mt-8 border-t border-gold-400/15 pt-4 text-xs text-ink-300 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2.5 sm:gap-4 w-full">
                <span className="flex items-center gap-1.5 text-gold-300 font-medium">
                  <MapPin size={14} className="text-gold-400 shrink-0" /> 2636 Hylan Blvd Suite 115, Staten Island
                </span>
                <span className="flex items-center gap-1.5 text-gold-300 font-medium">
                  <Phone size={14} className="text-gold-400 shrink-0" /> (718) 799-4232
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — MENU SPECIALS GRID SECTION */}


      {/* 03 — OFFICIAL MENU FLYER DISPLAY */}
      <section id="happy-hour-menu"  className="relative max-w-6xl mx-auto px-5 sm:px-8 py-20 border-b border-gold-400/15">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="font-body text-[10px] tracking-[0.25em] font-semibold text-gold-400 uppercase block mb-2">
              WEEKDAY SPECIALS
            </span>
            <h2 className="font-fashion text-3xl sm:text-5xl font-bold text-ink-100 uppercase leading-tight mb-4">
              HAPPY HOUR <span className="text-gold-400 font-light italic">MENU</span>
            </h2>
            <p className="font-body text-sm text-ink-300 leading-relaxed mb-6 font-light">
             Available Sunday through Thursday from 5:00 PM to 8:00 PM. Highlighting curated drinks, savory small plates, and smooth hookah.
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-ink-200">
                <CheckCircle2 size={16} className="text-gold-400 shrink-0" />
                <span>Available Sunday through Thursday (5:00 PM – 8:00 PM)</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-ink-200">
                <CheckCircle2 size={16} className="text-gold-400 shrink-0" />
                <span>Walk-ins welcome or reserve your booth ahead</span>
              </div>
              {/* <div className="flex items-center gap-3 text-xs sm:text-sm text-ink-200">
                <CheckCircle2 size={16} className="text-gold-400 shrink-0" />
                <span>Located at {venueInfo.addressShort}</span>
              </div> */}
            </div>

            <button
              onClick={() => onNavigate('reservations')}
              className="btn-gold py-4 px-8 text-xs font-bold"
            >
              BOOK YOUR HAPPY HOUR TABLE
            </button>
          </div>

          <div className="relative group max-w-md mx-auto">
            <div className="relative glass-panel rounded-sm p-3 border border-gold-400/30 shadow-2xl overflow-hidden glow-gold">
              <img
                src="/happyHourMenu.jpg"
                alt="Boulevard Lounge Happy Hour Menu Flyer"
                className="w-full h-auto object-cover rounded-sm group-hover:scale-102 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 04 — CTA & LOCATION CALLOUT */}
      <section className="relative py-4 max-w-4xl mx-auto px-5 sm:px-8 text-center">
        <h2 className="font-fashion text-3xl sm:text-5xl font-bold uppercase text-ink-100 mb-4">
          BRING YOUR <span className="text-gold-400 font-light italic">CREW</span>
        </h2>
        <p className="font-body text-sm sm:text-base text-ink-300 max-w-xl mx-auto leading-relaxed mb-8 font-light">
          Whether catching up with colleagues after work or starting a night out with friends, Boulevard Lounge is Staten Island's top destination for Happy Hour.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onNavigate('reservations')}
            className="btn-gold py-4 px-8 text-xs font-bold"
          >
            RESERVE A TABLE
          </button>
          <a
            href={venueInfo.phoneHref}
            className="btn-outline-gold py-4 px-8 text-xs font-bold inline-flex items-center gap-2"
          >
            <Phone size={14} /> CALL (718) 799-4232
          </a>
        </div>
      </section>
    </div>
  );
};

export default HappyHourPage;

      // <section id="happy-hour-menu" className="relative max-w-7xl mx-auto px-5 sm:px-8 py-20 border-b border-gold-400/15">
      //   <div className="text-center max-w-3xl mx-auto mb-16">
      //     <div className="inline-flex items-center gap-2 section-tag">
      //       <Wine size={15} className="text-gold-400" />
      //       WEEKDAY SPECIALS
      //     </div>
      //     <h2 className="font-fashion text-4xl sm:text-6xl font-bold text-ink-100 uppercase tracking-wider leading-tight">
      //       HAPPY HOUR <span className="text-gold-400 font-light italic">MENU</span>
      //     </h2>
      //     <p className="font-body text-sm sm:text-base text-ink-300 mt-3 leading-relaxed max-w-xl mx-auto">
      //       Available Sunday through Thursday from 5:00 PM to 8:00 PM. Highlighting curated drinks, savory small plates, and smooth hookah.
      //     </p>
      //   </div>

      //   <div className="grid lg:grid-cols-2 gap-8 items-start">
      //     {/* COLUMN 1: DRINKS & SHISHA */}
      //     <div className="space-y-6">
      //       <div className="glass-panel p-6 sm:p-8 rounded-sm border border-gold-400/30 glow-gold">
      //         <div className="flex items-center gap-3 border-b border-gold-400/20 pb-4 mb-6">
      //           <Wine className="text-gold-400 shrink-0" size={24} />
      //           <div>
      //             <h3 className="font-fashion text-2xl font-bold text-ink-100 uppercase tracking-wider">DRINKS & SHISHA</h3>
      //             <p className="font-body text-xs text-gold-400/90 font-medium tracking-wide">Sunday – Thursday | 5:00 PM – 8:00 PM</p>
      //           </div>
      //         </div>

      //         <div className="space-y-6">
      //           {/* ITEM 1 */}
      //           <div className="flex items-start justify-between border-b border-gold-400/10 pb-4">
      //             <div>
      //               <h4 className="font-fashion text-xl font-bold text-ink-100 uppercase tracking-wide">BEERS</h4>
      //               <p className="font-body text-xs text-ink-300 mt-1">Import & Domestic Selections</p>
      //             </div>
      //             <span className="font-fashion text-2xl font-bold text-gold-400 shrink-0">$5</span>
      //           </div>

      //           {/* ITEM 2 */}
      //           <div className="flex items-start justify-between border-b border-gold-400/10 pb-4">
      //             <div>
      //               <h4 className="font-fashion text-xl font-bold text-ink-100 uppercase tracking-wide">HOUSE WINE</h4>
      //               <p className="font-body text-xs text-ink-300 mt-1">Selected Reds & Whites</p>
      //             </div>
      //             <span className="font-fashion text-2xl font-bold text-gold-400 shrink-0">$10</span>
      //           </div>

      //           {/* ITEM 3 */}
      //           <div className="flex items-start justify-between pt-1">
      //             <div>
      //               <h4 className="font-fashion text-xl font-bold text-ink-100 uppercase tracking-wide">HOOKAH</h4>
      //               <p className="font-body text-xs text-ink-300 mt-1">Light Blends Only (Mint, Blueberry, Peach & Fruit Mixes)</p>
      //             </div>
      //             <span className="font-fashion text-2xl font-bold text-gold-400 shrink-0">$40</span>
      //           </div>
      //         </div>
      //       </div>

      //       {/* DESSERTS BOX */}
      //       <div className="glass-panel p-6 sm:p-8 rounded-sm border border-gold-400/30">
      //         <div className="flex items-center gap-3 border-b border-gold-400/20 pb-4 mb-6">
      //           <Utensils className="text-gold-400 shrink-0" size={22} />
      //           <div>
      //             <h3 className="font-fashion text-2xl font-bold text-ink-100 uppercase tracking-wider">SWEET TREATS</h3>
      //             <p className="font-body text-xs text-gold-400/90 font-medium tracking-wide">House Desserts</p>
      //           </div>
      //         </div>

      //         <div className="flex items-start justify-between">
      //           <div>
      //             <h4 className="font-fashion text-xl font-bold text-ink-100 uppercase tracking-wide">DESSERT SELECTION</h4>
      //             <p className="font-body text-xs text-ink-300 mt-1">Daily fresh house desserts & sweet lounge treats</p>
      //           </div>
      //           <span className="font-fashion text-2xl font-bold text-gold-400 shrink-0">$10</span>
      //         </div>
      //       </div>
      //     </div>

      //     {/* COLUMN 2: SMALL PLATES & APPETIZERS */}
      //     <div className="glass-panel p-6 sm:p-8 rounded-sm border border-gold-400/30">
      //       <div className="flex items-center justify-between border-b border-gold-400/20 pb-4 mb-6">
      //         <div className="flex items-center gap-3">
      //           <Utensils className="text-gold-400 shrink-0" size={24} />
      //           <div>
      //             <h3 className="font-fashion text-2xl font-bold text-ink-100 uppercase tracking-wider">SMALL PLATES</h3>
      //             <p className="font-body text-xs text-gold-400/90 font-medium tracking-wide">Appetizers — $10 Each</p>
      //           </div>
      //         </div>
      //         <span className="font-fashion text-2xl font-bold text-gold-400 bg-gold-400/10 px-3 py-1 rounded border border-gold-400/30">$10</span>
      //       </div>

      //       <div className="space-y-5">
      //         <div className="border-b border-gold-400/10 pb-4">
      //           <div className="flex justify-between items-baseline">
      //             <h4 className="font-fashion text-lg sm:text-xl font-bold text-gold-200 uppercase tracking-wide">Emperor’s Caesar</h4>
      //           </div>
      //           <p className="font-body text-xs text-ink-300 mt-1">Crisp romaine hearts, shaved parmesan crisp, house caesar dressing & garlic croutons</p>
      //         </div>

      //         <div className="border-b border-gold-400/10 pb-4">
      //           <div className="flex justify-between items-baseline">
      //             <h4 className="font-fashion text-lg sm:text-xl font-bold text-gold-200 uppercase tracking-wide">Boulevard Wings</h4>
      //           </div>
      //           <p className="font-body text-xs text-ink-300 mt-1">Crispy jumbo wings tossed in signature house glaze with ranch or blue cheese dip</p>
      //         </div>

      //         <div className="border-b border-gold-400/10 pb-4">
      //           <div className="flex justify-between items-baseline">
      //             <h4 className="font-fashion text-lg sm:text-xl font-bold text-gold-200 uppercase tracking-wide">Lounge Tenders</h4>
      //           </div>
      //           <p className="font-body text-xs text-ink-300 mt-1">Hand-battered golden chicken tenders served with honey mustard or house dipping sauce</p>
      //         </div>

      //         <div className="border-b border-gold-400/10 pb-4">
      //           <div className="flex justify-between items-baseline">
      //             <h4 className="font-fashion text-lg sm:text-xl font-bold text-gold-200 uppercase tracking-wide">Big Cheese Sticks</h4>
      //           </div>
      //           <p className="font-body text-xs text-ink-300 mt-1">Molten mozzarella cheese sticks with crispy herb breading & warm spiced marinara</p>
      //         </div>

      //         <div className="pt-1">
      //           <div className="flex justify-between items-baseline">
      //             <h4 className="font-fashion text-lg sm:text-xl font-bold text-gold-200 uppercase tracking-wide">Hylan Bruschetta</h4>
      //           </div>
      //           <p className="font-body text-xs text-ink-300 mt-1">Toasted artisan bread topped with vine tomatoes, garlic, extra virgin olive oil & balsamic glaze</p>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </section>

        // <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl">
        //         <div className="p-3.5 glass-panel rounded-sm border border-gold-400/25 text-center">
        //           <span className="font-fashion text-2xl font-bold text-gold-400 block">$5</span>
        //           <span className="font-body text-[10px] tracking-widest text-ink-300 uppercase block font-semibold mt-0.5">BEERS</span>
        //         </div>
        //         <div className="p-3.5 glass-panel rounded-sm border border-gold-400/25 text-center">
        //           <span className="font-fashion text-2xl font-bold text-gold-400 block">$10</span>
        //           <span className="font-body text-[10px] tracking-widest text-ink-300 uppercase block font-semibold mt-0.5">APPETIZERS</span>
        //         </div>
        //         <div className="p-3.5 glass-panel rounded-sm border border-gold-400/25 text-center">
        //           <span className="font-fashion text-2xl font-bold text-gold-400 block">$10</span>
        //           <span className="font-body text-[10px] tracking-widest text-ink-300 uppercase block font-semibold mt-0.5">HOUSE WINES</span>
        //         </div>
        //         <div className="p-3.5 glass-panel rounded-sm border border-gold-400/25 text-center">
        //           <span className="font-fashion text-2xl font-bold text-gold-400 block">$40</span>
        //           <span className="font-body text-[10px] tracking-widest text-ink-300 uppercase block font-semibold mt-0.5">HOOKAH</span>
        //         </div>
        //       </div>