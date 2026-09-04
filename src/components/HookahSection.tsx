import React from 'react';
import type { PageId } from './Navbar';
import { Flame, Wind, Sparkles, ShieldCheck } from 'lucide-react';

type HookahSectionProps = {
  onNavigate: (page: PageId) => void;
};

export const HookahSection: React.FC<HookahSectionProps> = ({ onNavigate }) => {
  return (
    <section className="relative py-10 sm:py-16 md:py-24 bg-ink-950 border-b border-gold-400/20 overflow-hidden">
      {/* BACKGROUND VIDEO & ATMOSPHERIC SMOKE OVERLAY */}
      <div className="absolute inset-0 z-0 opacity-40">
        <video
          src="/smoke_sip.mov"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover filter brightness-75 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/80 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950 pointer-events-none" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* LEFT COLUMN: BRAND COPY & CTA */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-400 text-xs font-semibold tracking-widest uppercase mb-4">
            <Flame size={14} className="text-gold-400 animate-pulse" />
            THE BOULEVARD HOOKAH LOUNGE
          </div>

          <h2 className="font-fashion text-4xl sm:text-6xl font-bold uppercase tracking-wider text-ink-100 leading-tight">
            SMOKE. SIP.<br />
            <span className="text-gold-400 font-light">STAY A WHILE.</span>
          </h2>

          <p className="mt-4 font-body text-base sm:text-lg text-ink-300 max-w-xl leading-relaxed">
            Premium hookah. Signature flavors. Made for the table. Unwind with Staten Island's finest coconut charcoal hookah session, crafted with fruit head upgrades and ice hose chilling.
          </p>

          {/* HOOKAH HIGHLIGHTS */}
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <div className="p-4 glass-panel rounded border border-gold-400/20">
              <div className="font-fashion text-lg font-bold text-gold-400">House Signature Blends</div>
              <p className="text-xs text-ink-400 mt-1">Love Spell, Dark Grape, Peach Ice & Berry Rush</p>
            </div>
            <div className="p-4 glass-panel rounded border border-gold-400/20">
              <div className="font-fashion text-lg font-bold text-gold-400">Fresh Pineapple Heads</div>
              <p className="text-xs text-ink-400 mt-1">Natural fruit tops for prolonged flavor enhancement</p>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate('hookah')}
              className="btn-gold py-4 px-8 text-sm"
            >
              EXPLORE HOOKAH
            </button>
            <button
              onClick={() => onNavigate('reservations')}
              className="btn-outline-gold py-4 px-8 text-sm"
            >
              RESERVE A TABLE
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: VISUAL FEATURE CARD */}
        <div className="relative">
          <div className="glass-panel p-3 rounded-sm border border-gold-400/30 glow-gold overflow-hidden">
            <video
              src="/smoke_sip.mov"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-[420px] object-cover rounded-sm border border-gold-400/20"
            />
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-ink-950/90 backdrop-blur border border-gold-400/30 rounded-sm">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gold-400 tracking-widest font-bold uppercase block">SERVED NIGHTLY</span>
                  <h4 className="font-fashion text-xl font-bold text-ink-100 uppercase">Table Side Charcoal Master</h4>
                </div>
                <span className="font-fashion text-2xl font-bold text-gold-400">$35+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HookahSection;
