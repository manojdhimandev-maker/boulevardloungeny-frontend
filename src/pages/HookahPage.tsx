import React from 'react';
import { Flame, Sparkles, Wind, ShieldAlert, RefreshCw } from 'lucide-react';
import type { PageId } from '@/components/Navbar';

type HookahPageProps = {
  onNavigate: (page: PageId) => void;
};

const classicBrands = [
  {
    brand: 'Serbetli',
    flavors: [
      'Lime Peach Ice',
      'Watermelon Ice',
      'Passion Fruit Ice',
      'Strawberry Ice',
      'Blueberry Ice',
      'Lemon Mint',
      'Mint',
      'Sweet Melon',
    ],
  },
  {
    brand: 'Adalya',
    flavors: [
      'Love 66',
      'Lady Killer',
      'Berlin Nights',
      'Baku Nights',
      'Blue Dragon',
      'Mi Amor',
    ],
  },
];

const exoticBrands = [
  {
    brand: 'Dark Side',
    flavors: [
      'Berrycolamist (Forest Berries & Cola)',
      'Citrusmist',
      'Skymist',
    ],
  },
  {
    brand: 'Must Have',
    flavors: [
      'Exotixmist (Mango, Passionfruit)',
      'Dessertmist',
      'Pinkislandmist',
    ],
  },
];

const baseUpgrades = [
  { title: 'Milk Base Infusion', desc: 'Rich velvety smoke base with milk enhancement', price: '$10' },
  { title: 'Wine Base Infusion', desc: 'Aromatic wine infused shisha base', price: '$15' },
  { title: 'Fresh Fruit Infusion', desc: 'Natural fresh fruit juice base infusion', price: '$20' },
];

const damageFees = [
  { title: 'Base Glass Replacement', price: '$200' },
  { title: 'Bowl Replacement', price: '$100' },
  { title: 'Kaloud Heat System', price: '$60' },
];

export default function HookahPage({ onNavigate }: HookahPageProps) {
  return (
    <div className="animate-fade-in pt-24 pb-20">
      {/* HERO BANNER */}
      <section className="relative min-h-[48vh] flex items-center justify-center overflow-hidden border-b border-gold-400/20 bg-ink-950">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="/instaposts-imeages/menu_card_hookah.jpg"
            alt="Boulevard Lounge Hookah"
            className="w-full h-full object-cover filter brightness-75 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950/90 via-transparent to-ink-950/90" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-5 text-center py-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-400 text-xs uppercase font-fashion font-semibold tracking-widest mb-4">
            <Flame size={14} className="text-gold-400 animate-pulse" />
            SMOKE. SIP. STAY A WHILE.
          </div>
          <h1 className="font-fashion text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-wider text-ink-100">
            The Hookah <span className="text-gold-400 font-light">Experience</span>
          </h1>
          <p className="mt-4 font-body text-base sm:text-lg text-ink-300 max-w-2xl mx-auto leading-relaxed font-light">
            Elevate your Staten Island night out with premium smooth shisha profiles, natural coconut coals, custom base infusions, and velvet booth seating.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button onClick={() => onNavigate('reservations')} className="btn-gold">
              RESERVE A TABLE
            </button>
            <button onClick={() => onNavigate('menu')} className="btn-outline-gold">
              VIEW FULL MENU
            </button>
          </div>
        </div>
      </section>

      {/* FLAVOR MENU GRID */}
      <section className="py-16 max-w-6xl mx-auto px-5">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="section-tag">PREMIUM SHISHA BLENDS</span>
          <h2 className="section-title text-3xl sm:text-5xl">Signature Hookah Menu</h2>
          <p className="section-desc mx-auto">
            Each Boulevard hookah is freshly prepared by our lounge charcoal masters using 100% natural coconut coals.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* CLASSIC PROFILES ($50) */}
          <div className="glass-panel p-6 sm:p-8 rounded-sm border border-gold-400/30 flex flex-col justify-between shadow-2xl relative bg-ink-950/90">
            <div>
              <div className="flex items-center justify-between border-b border-gold-400/25 pb-4 mb-6">
                <div>
                  <h3 className="font-fashion text-2xl sm:text-3xl font-bold text-ink-100 uppercase">CLASSIC PROFILES</h3>
                  <p className="text-xs text-gold-400/90 mt-1 font-body">Smooth traditional hookah blends prepared with natural coals</p>
                </div>
                <span className="font-fashion text-3xl font-bold text-gold-400">$50</span>
              </div>

              <div className="space-y-6">
                {classicBrands.map((b, idx) => (
                  <div key={idx} className="border-b border-gold-400/15 pb-5 last:border-0">
                    <div className="inline-block px-3 py-0.5 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-400 font-fashion font-semibold text-sm uppercase mb-3">
                      {b.brand}
                    </div>
                    <ul className="grid sm:grid-cols-2 gap-2">
                      {b.flavors.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-ink-200 font-body">
                          <span className="text-gold-400 text-base font-bold">•</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* EXOTIC BOLD PROFILES ($60) */}
          <div className="glass-panel p-6 sm:p-8 rounded-sm border border-gold-400/30 flex flex-col justify-between shadow-2xl relative bg-ink-950/90">
            <div>
              <div className="flex items-center justify-between border-b border-gold-400/25 pb-4 mb-6">
                <div>
                  <h3 className="font-fashion text-2xl sm:text-3xl font-bold text-ink-100 uppercase">EXOTIC BOLD PROFILES</h3>
                  <p className="text-xs text-gold-400/90 mt-1 font-body">Rich, intense dark-leaf & specialty exotic formulations</p>
                </div>
                <span className="font-fashion text-3xl font-bold text-gold-400">$60</span>
              </div>

              <div className="space-y-6">
                {exoticBrands.map((b, idx) => (
                  <div key={idx} className="border-b border-gold-400/15 pb-5 last:border-0">
                    <div className="inline-block px-3 py-0.5 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-400 font-fashion font-semibold text-sm uppercase mb-3">
                      {b.brand}
                    </div>
                    <ul className="grid sm:grid-cols-1 gap-2">
                      {b.flavors.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-ink-200 font-body">
                          <span className="text-gold-400 text-base font-bold">•</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* UPGRADE BASE & DAMAGE FEES SECTION */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          {/* BASE UPGRADES */}
          <div className="glass-panel p-6 sm:p-8 rounded-sm border border-gold-400/30">
            <h3 className="font-fashion text-2xl font-bold text-gold-400 uppercase mb-2">Upgrade Base Infusions</h3>
            <p className="text-xs text-ink-300 mb-6 font-light">Pair your shisha session with custom velvety base infusions.</p>

            <div className="space-y-3">
              {baseUpgrades.map((u, i) => (
                <div key={i} className="p-4 rounded-sm bg-ink-900/90 border border-gold-400/20 flex items-center justify-between">
                  <div>
                    <h4 className="font-fashion text-base font-bold text-ink-100 uppercase">{u.title}</h4>
                    <p className="text-xs text-ink-300 mt-0.5 font-light">{u.desc}</p>
                  </div>
                  <span className="font-fashion text-lg font-bold text-gold-400">{u.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* HOOKAH DAMAGE & REPLACEMENT FEES */}
          <div className="glass-panel p-6 sm:p-8 rounded-sm border border-gold-400/30">
            <div className="flex items-center gap-2 mb-2">
              <ShieldAlert className="text-gold-400" size={20} />
              <h3 className="font-fashion text-2xl font-bold text-gold-400 uppercase">Hookah Replacement Fees</h3>
            </div>
            <p className="text-xs text-ink-300 mb-6 font-light">Accidental damage & component replacement cost schedule.</p>

            <div className="space-y-3">
              {damageFees.map((d, i) => (
                <div key={i} className="p-4 rounded-sm bg-ink-900/90 border border-gold-400/20 flex items-center justify-between">
                  <span className="font-fashion text-base font-bold text-ink-100 uppercase">{d.title}</span>
                  <span className="font-fashion text-lg font-bold text-gold-400">{d.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA BANNER */}
        <div className="mt-16 text-center glass-panel p-8 sm:p-12 border border-gold-400/30 glow-gold">
          <h2 className="font-fashion text-3xl sm:text-4xl font-bold uppercase text-ink-100">
            YOUR TABLE. YOUR FLAVOR. YOUR NIGHT.
          </h2>
          <p className="text-sm text-ink-300 max-w-xl mx-auto mt-3 font-light">
            Book your Friday or Saturday night hookah table in advance to guarantee prime booth seating.
          </p>
          <div className="mt-6">
            <button onClick={() => onNavigate('reservations')} className="btn-gold">
              RESERVE A TABLE
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
