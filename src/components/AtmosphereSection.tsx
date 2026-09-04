  import React, { useState } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import type { PageId } from './Navbar';

export const photos = [
  {
    id: 1,
    src: '/instaposts-imeages/shisha_hookah_lounge_web.mp4',
    title: 'Shisha & Hookah Lounge',
    description: 'Custom handcrafted shisha flavors in a comfortable velvet seating ambiance.',
    isVideo: true,
  },
  {
    id: 2,
    src: '/instaposts-imeages/candlelit_intimate_dining.jpg',
    title: 'Candlelit Intimate Dining',
    description: 'Warm candlelight and fresh floral arrangements for an unforgettable romantic evening.',
  },
  {
    id: 3,
    src: '/instaposts-imeages/artisanal_tequila_shots.jpg',
    title: 'Artisanal Tequila & Shots',
    description: 'Hand-selected premium tequilas, sea salt, and fresh lime slices on slate.',
  },
  {
    id: 4,
    src: '/instaposts-imeages/vip_suite_champagne.jpg',
    title: 'VIP Suite & Champagne Service',
    description: 'Private plush booth seating with chilled champagne bottle service.',
  },
  {
    id: 5,
    src: '/instaposts-imeages/live_jazz_saxophone.jpg',
    title: 'Live Jazz & Saxophone Sessions',
    description: 'Live musical performances by top jazz artists and resident DJs nightly.',
  },
  {
    id: 6,
    src: '/instaposts-imeages/fine_dining_cuisine.jpg',
    title: 'Fine Dining Cuisine',
    description: 'Prime cut steaks, artisan sauces, and sommelier wine pairings.',
  },
];

type AtmosphereSectionProps = {
  onNavigate?: (page: PageId) => void;
};

export const AtmosphereSection: React.FC<AtmosphereSectionProps> = ({ onNavigate }) => {
  const [activePhoto, setActivePhoto] = useState<typeof photos[0] | null>(null);

  const handleCardClick = (item: typeof photos[0]) => {
    if (onNavigate) {
      onNavigate('about');
    } else {
      setActivePhoto(item);
    }
  };

  return (
    <section className="relative mx-auto max-w-7xl px-5 sm:px-8 py-[100px]" id="atmosphere">
      {/* TOP FLEX HEADER ROW MATCHING USER SPEC */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-gold-400/20 pb-8">
        <div>
          <span className="font-fashion text-xs tracking-[0.22em] font-semibold text-gold-400 uppercase block mb-3">
            THE ATMOSPHERE
          </span>
          <h2 className="font-fashion text-4xl sm:text-5xl lg:text-6xl font-light text-ink-100 leading-tight">
            A World Apart
          </h2>
        </div>
        <p className="font-body text-xs sm:text-sm text-ink-300 font-light max-w-md leading-relaxed self-start md:self-auto">
          Step inside and leave the outside world at the door. The Boulevard Lounge exists in a world of its own.
        </p>
      </div>

      {/* 6 PHOTO GALLERY GRID (3 x 2 GRID MATCHING SCREENSHOTS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((item) => (
          <div
            key={item.id}
            onClick={() => handleCardClick(item)}
            className="group cursor-pointer relative h-[360px] sm:h-[400px] rounded-sm overflow-hidden border border-gold-400/20 hover:border-gold-400/60 transition-all duration-500 shadow-xl glow-gold"
          >
            {/* PHOTO / VIDEO */}
            {(item as any).isVideo || item.src.endsWith('.mp4') ? (
              <video
                src={item.src}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
              />
            ) : (
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
              />
            )}

            {/* DARK GRADIENT OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

            {/* HOVER OVERLAY WITH GOLD MAGNIFYING GLASS ICON (EXACT MATCH FOR USER SCREENSHOT 2) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-12 h-12 rounded-full bg-gold-400 text-ink-950 grid place-items-center shadow-2xl scale-90 group-hover:scale-100 transition-transform duration-300 border border-gold-300">
                <Search size={22} className="stroke-[2.5]" />
              </div>
            </div>

            {/* BOTTOM TITLE & CAPTION */}
            <div className="absolute bottom-0 inset-x-0 p-5 z-10">
              <h3 className="font-fashion text-xl font-light text-ink-100 group-hover:text-gold-300 transition-colors leading-snug">
                {item.title}
              </h3>
              <p className="font-body text-xs text-ink-300 font-light mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX ZOOM MODAL */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-ink-950/90 backdrop-blur-md animate-fade-in"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full glass-panel rounded-sm border border-gold-400/40 p-4 shadow-2xl animate-scale-in overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-6 right-6 z-10 grid place-items-center w-9 h-9 rounded-sm bg-ink-950/90 text-gold-400 border border-gold-400/40 hover:bg-gold-400 hover:text-ink-950 transition-colors shadow-lg"
            >
              <X size={18} />
            </button>

            {/* FULL SIZE IMAGE / VIDEO */}
            <div className="relative max-h-[75vh] overflow-hidden rounded-sm bg-ink-950 border border-gold-400/20">
              {(activePhoto as any).isVideo || activePhoto.src.endsWith('.mp4') ? (
                <video
                  src={activePhoto.src}
                  autoPlay
                  loop
                  muted
                  controls
                  playsInline
                  className="w-full h-full object-contain max-h-[70vh] mx-auto"
                />
              ) : (
                <img
                  src={activePhoto.src}
                  alt={activePhoto.title}
                  className="w-full h-full object-contain max-h-[70vh] mx-auto"
                />
              )}
            </div>

            {/* CAPTION */}
            <div className="p-4 pt-5 text-center">
              <span className="font-body text-[9px] tracking-[0.25em] font-semibold text-gold-400 uppercase block mb-1">
                THE BOULEVARD EXPERIENCE
              </span>
              <h3 className="font-fashion text-2xl text-ink-100 font-light">{activePhoto.title}</h3>
              <p className="font-body text-xs sm:text-sm text-ink-300 mt-1 font-light max-w-lg mx-auto">
                {activePhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AtmosphereSection;
