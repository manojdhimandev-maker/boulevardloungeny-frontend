import React from 'react';
import { venueInfo } from '@/data/venue';

export const instagramGalleryImages = [
  {
    id: 1,
    url: '/instaposts-imeages/insta_masterpiece_sip_1.jpg',
    alt: 'Masterpiece in every sip - Boulevard Craft Cocktail',
    caption: 'Crafted like a work of art 🍹',
  },
  {
    id: 2,
    url: '/instaposts-imeages/insta_masterpiece_sip_2.jpg',
    alt: 'Boulevard Lounge Signature Pour',
    caption: 'Creativity in every glass ✨',
  },
  {
    id: 3,
    url: '/instaposts-imeages/insta_mixology_stages_1.jpg',
    alt: 'Cocktail Mixology in action at Boulevard Lounge',
    caption: 'Every stage is a masterpiece 🍸',
  },
  {
    id: 4,
    url: '/instaposts-imeages/insta_mixology_stages_2.jpg',
    alt: 'Artisanal Drink Preparation at Boulevard',
    caption: 'Precision & passion in every glass 🥃',
  },
  {
    id: 5,
    url: '/instaposts-imeages/insta_mixology_stages_3.jpg',
    alt: 'Boulevard Lounge Signature Serve',
    caption: 'Staten Island premier pours 🥂',
  },
  {
    id: 6,
    url: '/instaposts-imeages/artisanal_tequila_shots.jpg',
    alt: 'VIP Lounge Atmosphere & Cocktail Service',
    caption: 'Unforgettable evening vibes ✨',
  },
];

export const InstagramShowcaseSection: React.FC = () => {
  return (
    <section className="relative mx-auto max-w-7xl px-5 sm:px-8 py-[100px]">
      {/* HEADER CENTERED */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="font-fashion text-xs tracking-[0.22em] font-semibold text-gold-400 uppercase block mb-2">
          {venueInfo.instagramHandle}
        </span>
        <h2 className="font-fashion text-3xl sm:text-4xl lg:text-5xl font-light text-ink-100 mb-2 leading-tight">
          Follow the Evening
        </h2>
        <p className="font-body text-xs sm:text-sm text-ink-300 font-light">
          Real posts & moments directly from our Instagram
        </p>
      </div>

      {/* 6 SQUARE PHOTO GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {instagramGalleryImages.map((img) => (
          <a
            key={img.id}
            href={venueInfo.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden rounded-xl glass-panel border border-gold-400/30 hover:border-gold-400/70 transition-all duration-300 shadow-xl block"
          >
            <img
              src={img.url}
              alt={img.alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-95 group-hover:brightness-105"
            />
            {/* HOVER OVERLAY WITH INSTAGRAM ICON */}
            <div className="absolute inset-0 bg-ink-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center">
              <svg className="w-7 h-7 fill-current text-gold-400 drop-shadow-md mb-2" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span className="text-[10px] font-fashion text-gold-200 font-semibold leading-tight">{img.caption}</span>
            </div>
          </a>
        ))}
      </div>

      {/* ACTION BUTTON */}
      <div className="mt-10 text-center">
        <a
          href={venueInfo.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline-gold inline-flex py-3.5 px-8 text-xs font-fashion tracking-[0.18em] uppercase font-semibold rounded-full shadow-lg"
        >
          FOLLOW ON INSTAGRAM
        </a>
      </div>
    </section>
  );
};

export default InstagramShowcaseSection;
