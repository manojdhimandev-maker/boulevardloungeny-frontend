import React from 'react';
import type { PageId } from './Navbar';
import { Sparkles, Play, Flame, Music2, Wine } from 'lucide-react';

type VividWeekendsSectionProps = {
  onNavigate: (page: PageId) => void;
};

const mosaicItems = [
  {
    title: 'DJ Booth & Open Format',
    tag: 'LIVE SOUND',
    image: '/instaposts-imeages/event_afro_house.jpg',
    span: 'col-span-1 md:col-span-2 row-span-2',
  },
  {
    title: 'Signature Pours',
    tag: 'CRAFT COCKTAILS',
    image: '/instaposts-imeages/artisanal_tequila_shots.jpg',
    span: 'col-span-1 row-span-1',
  },
  {
    title: 'Atmospheric Smoke',
    tag: 'HOOKAH LOUNGE',
    image: '/instaposts-imeages/menu_card_hookah.jpg',
    span: 'col-span-1 row-span-1',
  },
  {
    title: 'Birthday & VIP Tables',
    tag: 'CELEBRATIONS',
    image: '/instaposts-imeages/event_vip_saturday.jpg',
    span: 'col-span-1 row-span-1',
  },
  {
    title: 'Vivid Late Nights',
    tag: 'THE VIBE',
    image: '/instaposts-imeages/home_hero_bg.jpg',
    span: 'col-span-1 md:col-span-2 row-span-1',
  },
];

export const VividWeekendsSection: React.FC<VividWeekendsSectionProps> = ({ onNavigate }) => {
  return (
    <section className="relative py-10 sm:py-16 md:py-24 bg-ink-950 border-b border-gold-400/20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 section-tag">
            <Sparkles size={14} className="text-gold-400" />
            NIGHTLIFE CENTERPIECE
          </div>
          <h2 className="section-title text-4xl sm:text-6xl uppercase tracking-wider">
            YOUR WEEKEND.<br />
            <span className="text-gold-400 font-light">TURNED ALL THE WAY UP.</span>
          </h2>
          <p className="section-desc mx-auto mt-3 text-base">
            DJs. Cocktails. Hookah. Celebrations. Late nights. Immerse yourself in Staten Island's premier weekend energy.
          </p>
        </div>

        {/* MOSAIC GALLERY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[220px]">
          {mosaicItems.map((item, idx) => (
            <div
              key={idx}
              className={`relative group overflow-hidden rounded-sm border border-gold-400/25 glass-panel ${item.span}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-85 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />

              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <span className="text-[9px] tracking-[0.2em] font-semibold text-gold-400 uppercase block mb-1">
                    {item.tag}
                  </span>
                  <h3 className="font-fashion text-xl sm:text-2xl font-bold uppercase text-ink-100">
                    {item.title}
                  </h3>
                </div>
                <div className="w-8 h-8 rounded-full bg-gold-400/20 border border-gold-400/40 grid place-items-center text-gold-400 group-hover:bg-gold-400 group-hover:text-ink-950 transition-colors">
                  <Play size={14} className="fill-current" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <button
            onClick={() => onNavigate('events')}
            className="btn-gold py-4 px-8 text-sm"
          >
            EXPERIENCE THE WEEKEND
          </button>
        </div>
      </div>
    </section>
  );
};

export default VividWeekendsSection;
