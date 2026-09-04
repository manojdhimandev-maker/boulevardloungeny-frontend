import React, { useState } from 'react';
import type { PageId } from './Navbar';
import { Wine, ArrowRight, ChevronLeft, ChevronRight, X, Sparkles } from 'lucide-react';

type SignatureCocktailsSectionProps = {
  onNavigate: (page: PageId, categoryId?: string) => void;
};

export type SignatureCocktailItem = {
  id: string;
  name: string;
  tagline: string;
  desc: string;
  price: string;
  images: string[];
};

export const signatureCocktails: SignatureCocktailItem[] = [
  {
    id: 'mon-cherri',
    name: 'Mon Chéri',
    tagline: 'Smoke Bubble Effect',
    desc: 'Vodka, Elderflower, Italian Cherry Juice, Cranberry Juice, finished with a romantic smoke bubble.',
    price: '$21',
    images: [
      '/cocktails-with-name/mon_cherri.jpg',
      '/cocktails-with-name/mon_cherri_2.jpg',
      '/cocktails-with-name/mon_cherri_3.jpg',
      '/cocktails-with-name/mon_cherri_4.jpg',
      '/cocktails-with-name/mon_cherri_5.jpg',
    ],
  },
  {
    id: 'love-bomb',
    name: 'Love Bomb',
    tagline: 'Glittery Sparkle',
    desc: 'Gin, Elderflower, Hibiscus, Raspberry, Prosecco with edible hibiscus & shimmering sparkle.',
    price: '$22',
    images: [
      '/cocktails-with-name/love_bomb.jpg',
      '/cocktails-with-name/love_bomb_2.jpg',
      '/cocktails-with-name/love_bomb_3.jpg',
      '/cocktails-with-name/love_bomb_4.jpg',
    ],
  },
  {
    id: 'midnight-mirage',
    name: 'Midnight Mirage',
    tagline: 'Color Shifting Craft',
    desc: 'Empress Indigo Gin, Blue Curaçao, Fresh Lemon, Lavender & Sparkling Soda with a mystical glow.',
    price: '$20',
    images: [
      '/cocktails-with-name/midnight_mirage.jpg',
      '/cocktails-with-name/midnight_mirage_2.jpg',
      '/cocktails-with-name/midnight_mirage_3.jpg',
      '/cocktails-with-name/midnight_mirage_4.jpg',
      '/cocktails-with-name/midnight_mirage_5.jpg',
    ],
  },
  {
    id: 'afterglow',
    name: 'Afterglow',
    tagline: 'Day-To-Night Sip',
    desc: 'Aperol, Vanilla Vodka, Vanilla Syrup, Lemon Juice. A light bittersweet citrus balance.',
    price: '$17',
    images: [
      '/cocktails-with-name/afterglow.jpg',
      '/cocktails-with-name/afterglow_2.jpg',
      '/cocktails-with-name/afterglow_3.jpg',
      '/cocktails-with-name/afterglow_4.jpg',
      '/cocktails-with-name/afterglow_5.jpg',
    ],
  },
  {
    id: 'spa-spritz',
    name: 'Spa Spritz',
    tagline: 'Crisp & Refreshing',
    desc: 'Gin, Cucumber Juice, Fresh Lime Juice, Prosecco. An effortlessly crisp sip for pure relaxation.',
    price: '$17',
    images: [
      '/cocktails-with-name/spa_spritz.jpg',
      '/cocktails-with-name/spa_spritz_2.jpg',
      '/cocktails-with-name/spa_spritz_3.jpg',
      '/cocktails-with-name/spa_spritz_4.jpg',
    ],
  },
];

const CocktailCard: React.FC<{
  item: SignatureCocktailItem;
  onNavigate: (page: PageId, categoryId?: string) => void;
  onOpenLightbox: (images: string[], initialIndex: number, title: string) => void;
}> = ({ item, onNavigate, onOpenLightbox }) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % item.images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev - 1 + item.images.length) % item.images.length);
  };

  return (
    <div className="glass-panel rounded-xl overflow-hidden border border-gold-400/20 hover:border-gold-400/60 transition-all duration-500 group flex flex-col justify-between shadow-2xl relative bg-ink-950/90 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(212,175,55,0.15)]">
      {/* MEDIA CONTAINER WITH WIDESCREEN ASPECT RATIO */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink-950">
        <img
          src={item.images[currentImgIndex]}
          alt={`${item.name} angle ${currentImgIndex + 1}`}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 brightness-90 group-hover:brightness-100 cursor-pointer"
          onClick={() => onOpenLightbox(item.images, currentImgIndex, item.name)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent pointer-events-none" />

        {/* TAGLINE BADGE */}
        <span className="absolute top-3 left-3 px-3 py-1 bg-ink-950/85 backdrop-blur border border-gold-400/30 text-gold-400 font-fashion text-[11px] uppercase font-semibold tracking-widest rounded-full shadow-md">
          {item.tagline}
        </span>

        {/* PRICE TAG */}
        <span className="absolute top-3 right-3 px-3 py-1 bg-ink-950/85 backdrop-blur border border-gold-400/40 text-gold-400 font-fashion font-bold text-sm rounded-full shadow-md">
          {item.price}
        </span>

        {/* CHEVRON SLIDER CONTROLS */}
        {item.images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-ink-950/85 border border-gold-400/40 text-gold-400 hover:bg-gold-400 hover:text-ink-950 transition-all opacity-90 hover:opacity-100 shadow-lg z-10"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-ink-950/85 border border-gold-400/40 text-gold-400 hover:bg-gold-400 hover:text-ink-950 transition-all opacity-90 hover:opacity-100 shadow-lg z-10"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}

        {/* PAGINATION DOTS */}
        {item.images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5 z-10 px-4">
            {item.images.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImgIndex(dotIdx);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  dotIdx === currentImgIndex
                    ? 'w-5 bg-gold-400 shadow-sm'
                    : 'w-1.5 bg-ink-100/30 hover:bg-gold-400/50'
                }`}
                title={`View shot ${dotIdx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* CARD CONTENT BODY */}
      <div className="p-6 flex-1 flex flex-col justify-between bg-ink-950/95">
        <div>
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-fashion text-2xl font-semibold uppercase text-gold-400 tracking-wide">
              {item.name}
            </h3>
            <span className="text-[10px] text-gold-300 font-medium tracking-wider shrink-0 bg-gold-400/10 px-2.5 py-0.5 rounded-full border border-gold-400/30">
              {item.images.length} SHOTS
            </span>
          </div>
          <p className="text-xs sm:text-sm text-ink-200 leading-relaxed mt-2.5 font-normal line-clamp-2">
            {item.desc}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-gold-400/15 flex items-center justify-between">
          <button
            onClick={() => onNavigate('menu', 'cocktails')}
            className="text-xs text-gold-400 font-semibold tracking-widest uppercase inline-flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
          >
            ORDER AT TABLE <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export const SignatureCocktailsSection: React.FC<SignatureCocktailsSectionProps> = ({ onNavigate }) => {
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    images: string[];
    index: number;
    title: string;
  }>({
    isOpen: false,
    images: [],
    index: 0,
    title: '',
  });

  const handleOpenLightbox = (images: string[], initialIndex: number, title: string) => {
    setLightboxState({
      isOpen: true,
      images,
      index: initialIndex,
      title,
    });
  };

  const handleCloseLightbox = () => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <section className="relative py-10 sm:py-16 md:py-24 bg-ink-900/60 border-b border-gold-400/20 overflow-hidden">
      {/* GLOW DECORATION */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gold-400/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-400 text-xs font-semibold tracking-[0.22em] uppercase mb-4">
            <Wine size={15} className="text-gold-400 shrink-0" />
            <span>CRAFT MIXOLOGY</span>
          </div>
          <h2 className="section-title text-4xl sm:text-5xl uppercase tracking-wider">
            COCKTAILS MADE FOR THE NIGHT.
          </h2>
          <p className="section-desc mx-auto mt-3">
            Bold flavors. Beautiful presentation. Explore all multi-angle photo shots of Boulevard’s 5 signature pours.
          </p>
        </div>

        {/* TOP ROW: 3 CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {signatureCocktails.slice(0, 3).map((item) => (
            <CocktailCard
              key={item.id}
              item={item}
              onNavigate={onNavigate}
              onOpenLightbox={handleOpenLightbox}
            />
          ))}
        </div>

        {/* BOTTOM ROW: 2 CARDS CENTERED */}
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-8 mt-8">
          {signatureCocktails.slice(3, 5).map((item) => (
            <CocktailCard
              key={item.id}
              item={item}
              onNavigate={onNavigate}
              onOpenLightbox={handleOpenLightbox}
            />
          ))}
        </div>

        {/* CTA BUTTON */}
        <div className="mt-14 text-center">
          <button
            onClick={() => onNavigate('menu', 'cocktails')}
            className="btn-gold py-4 px-8 text-sm"
          >
            EXPLORE THE FULL COCKTAIL MENU
          </button>
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL FOR MULTI-SHOT COCKTAILS */}
      {lightboxState.isOpen && (
        <div className="fixed inset-0 z-50 bg-ink-950/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-8 animate-fade-in">
          {/* TOP BAR */}
          <div className="w-full max-w-5xl flex items-center justify-between z-10 border-b border-gold-400/20 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-gold-400 text-xs font-semibold tracking-widest uppercase">
                <Sparkles size={13} />
                <span>SIGNATURE COCKTAIL GALLERY</span>
              </div>
              <h3 className="font-fashion text-2xl sm:text-3xl text-ink-100 uppercase font-light">
                {lightboxState.title}
              </h3>
            </div>
            <button
              onClick={handleCloseLightbox}
              className="p-2 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-400 hover:bg-gold-400 hover:text-ink-950 transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* MAIN LIGHTBOX DISPLAY */}
          <div className="relative max-w-4xl max-h-[65vh] w-full flex items-center justify-center my-auto">
            <img
              src={lightboxState.images[lightboxState.index]}
              alt={`${lightboxState.title} view ${lightboxState.index + 1}`}
              className="max-h-[65vh] max-w-full object-contain rounded-sm shadow-2xl border border-gold-400/30"
            />

            {/* PREV / NEXT BUTTONS */}
            {lightboxState.images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setLightboxState((prev) => ({
                      ...prev,
                      index: (prev.index - 1 + prev.images.length) % prev.images.length,
                    }))
                  }
                  className="absolute left-2 p-3 rounded-full bg-ink-950/80 border border-gold-400/30 text-gold-400 hover:bg-gold-400 hover:text-ink-950 transition-all shadow-xl"
                  aria-label="Previous photo"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={() =>
                    setLightboxState((prev) => ({
                      ...prev,
                      index: (prev.index + 1) % prev.images.length,
                    }))
                  }
                  className="absolute right-2 p-3 rounded-full bg-ink-950/80 border border-gold-400/30 text-gold-400 hover:bg-gold-400 hover:text-ink-950 transition-all shadow-xl"
                  aria-label="Next photo"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>

          {/* BOTTOM THUMBNAIL STRIP */}
          <div className="w-full max-w-4xl flex items-center justify-center gap-3 overflow-x-auto pt-4 border-t border-gold-400/15">
            {lightboxState.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setLightboxState((prev) => ({ ...prev, index: idx }))}
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-sm overflow-hidden border transition-all shrink-0 ${
                  idx === lightboxState.index
                    ? 'border-gold-400 ring-2 ring-gold-400/50 scale-105'
                    : 'border-gold-400/20 opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default SignatureCocktailsSection;
