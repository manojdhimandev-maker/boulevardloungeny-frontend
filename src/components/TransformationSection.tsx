import React, { useState } from 'react';
import type { PageId } from './Navbar';
import { Sun, Moon, UtensilsCrossed, Disc3, Sparkles } from 'lucide-react';

type TransformationSectionProps = {
  onNavigate: (page: PageId) => void;
};

export const TransformationSection: React.FC<TransformationSectionProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'day' | 'night'>('night');

  return (
    <section className="relative py-24 bg-ink-900/80 border-b border-gold-400/20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 section-tag">
            <Sparkles size={14} className="text-gold-400" />
            THE TRANSFORMATION
          </div>
          <h2 className="section-title text-4xl sm:text-6xl uppercase tracking-wider">
            DINNER ENDS.<br />
            <span className="text-gold-400 font-light">BOULEVARD BEGINS.</span>
          </h2>
          <p className="section-desc mx-auto mt-2">
            DAY TO NIGHT. WORLDS APART. Watch the lounge transform from refined early evening dining into a high-energy nightlife experience.
          </p>
        </div>

        {/* TOGGLE BUTTONS */}
        <div className="flex justify-center mb-8 sm:mb-12 w-full max-w-2xl mx-auto">
          <div className="p-1.5 glass-panel rounded-xl sm:rounded-full border border-gold-400/30 flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('day')}
              className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-full text-[11px] sm:text-xs font-bold font-fashion tracking-wider sm:tracking-widest uppercase transition-all w-full sm:w-auto text-center ${
                activeTab === 'day'
                  ? 'bg-gold-400 text-ink-950 shadow-lg'
                  : 'text-ink-300 hover:text-gold-400'
              }`}
            >
              <Sun size={15} className="shrink-0" />
              <span>EARLY EVENING (7 PM - 10 PM)</span>
            </button>
            <button
              onClick={() => setActiveTab('night')}
              className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-full text-[11px] sm:text-xs font-bold font-fashion tracking-wider sm:tracking-widest uppercase transition-all w-full sm:w-auto text-center ${
                activeTab === 'night'
                  ? 'bg-gold-400 text-ink-950 shadow-lg'
                  : 'text-ink-300 hover:text-gold-400'
              }`}
            >
              <Moon size={15} className="shrink-0" />
              <span>AFTER DARK (10 PM - LATE)</span>
            </button>
          </div>
        </div>

        {/* COMPARISON CONTENT CARDS */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* EARLY EVENING */}
          <div
            className={`glass-panel p-8 rounded-sm border transition-all duration-500 ${
              activeTab === 'day' ? 'border-gold-400/60 shadow-2xl scale-[1.02]' : 'border-gold-400/15 opacity-70'
            }`}
          >
            <div className="flex items-center gap-3 text-gold-400 mb-4">
              <UtensilsCrossed size={24} />
              <span className="font-fashion text-xl font-bold uppercase tracking-widest">Early Evening Vibe</span>
            </div>
            <h3 className="font-fashion text-3xl font-bold text-ink-100 uppercase mb-3">Dinner • Cocktails • Hookah</h3>
            <p className="text-sm text-ink-300 leading-relaxed mb-6">
              Sophisticated candlelit ambiance, crafted signature cocktails, artisanal dinner entrees, and smooth hookah starting at 7:00 PM.
            </p>
            <ul className="space-y-2.5 text-xs text-ink-200 mb-8 border-t border-gold-400/15 pt-4">
              <li className="flex items-center gap-2">✦ Artisanal Skirt Steak & Salmon Entrees</li>
              <li className="flex items-center gap-2">✦ Signature Craft Cocktail Tasting</li>
              <li className="flex items-center gap-2">✦ Smooth Coconut Charcoal Hookah</li>
            </ul>
            <button onClick={() => onNavigate('reservations')} className="btn-outline-gold w-full text-xs py-3">
              RESERVE DINNER TABLE
            </button>
          </div>

          {/* AFTER DARK */}
          <div
            className={`glass-panel p-8 rounded-sm border transition-all duration-500 ${
              activeTab === 'night' ? 'border-gold-400/60 shadow-2xl scale-[1.02] glow-gold' : 'border-gold-400/15 opacity-70'
            }`}
          >
            <div className="flex items-center gap-3 text-gold-400 mb-4">
              <Disc3 size={24} className="animate-spin-slow" />
              <span className="font-fashion text-xl font-bold uppercase tracking-widest">After Dark Experience</span>
            </div>
            <h3 className="font-fashion text-3xl font-bold text-ink-100 uppercase mb-3">DJs • Dancing • Bottles • Vivid Nights</h3>
            <p className="text-sm text-ink-300 leading-relaxed mb-6">
              At 10:00 PM the lights dim, the DJ takes control of the room, bottle service starts, and Staten Island's vivid night begins.
            </p>
            <ul className="space-y-2.5 text-xs text-ink-200 mb-8 border-t border-gold-400/15 pt-4">
              <li className="flex items-center gap-2">✦ Live Guest DJs (Open Format, Afro, House, Latin)</li>
              <li className="flex items-center gap-2">✦ VIP Table & Premium Bottle Presentations</li>
              <li className="flex items-center gap-2">✦ Birthday & Group Celebrations</li>
            </ul>
            <button onClick={() => onNavigate('reservations')} className="btn-gold w-full text-xs py-3">
              RESERVE AFTER DARK BOOTH
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransformationSection;
