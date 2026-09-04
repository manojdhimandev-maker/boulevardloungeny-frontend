import React from 'react';
import type { PageId } from './Navbar';

type OurStorySectionProps = {
  onNavigate?: (page: PageId) => void;
};

export const OurStorySection: React.FC<OurStorySectionProps> = ({ onNavigate }) => {
  return (
    <section className="relative mx-auto max-w-7xl px-5 sm:px-8 py-[100px]">
      <div className="glass-panel rounded-sm border border-gold-400/20 overflow-hidden grid lg:grid-cols-12 items-stretch shadow-2xl">
        {/* LEFT COLUMN: ATMOSPHERIC VIDEO */}
        <div className="lg:col-span-6 relative min-h-[320px] lg:min-h-[460px] h-[360px] lg:h-[480px] bg-ink-950 overflow-hidden">
          <video
            src="/story_hero_video_web.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-ink-950/30 lg:bg-gradient-to-r lg:from-transparent lg:to-ink-950/70" />
        </div>

        {/* RIGHT COLUMN: OUR STORY CONTENT */}
        <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 flex flex-col justify-between bg-ink-950/95">
          <div>
            {/* TOP LABEL */}
            <span className="font-body text-[10px] tracking-[0.25em] font-semibold text-gold-400 uppercase block mb-3">
              OUR STORY
            </span>

            {/* MAIN HEADING (ELEGANT PROPORTIONAL DIDONE TYPOGRAPHY) */}
            <h2 className="font-fashion text-3xl sm:text-4xl lg:text-[44px] font-light text-ink-100 leading-[1.15] mb-5">
              A Vision Born <br />
              <span className="text-gold-400 font-light">in the Heart of NYC</span>
            </h2>

            {/* THIN HORIZONTAL DIVIDER */}
            <div className="w-full h-[1px] bg-gold-400/20 my-5" />

            {/* PARAGRAPH TEXT */}
            <div className="space-y-3.5 font-body text-xs sm:text-sm text-ink-300 leading-relaxed font-light">
              <p>
                The Boulevard Lounge was conceived as an antidote to the ordinary — a space where the city's most discerning guests could gather in an atmosphere of genuine refinement. Inspired by the great supper clubs of another era, reimagined for modern Manhattan.
              </p>
              <p>
                Our interiors, designed by award-winning studio Atelier Nord, blend hand-laid marble, aged brass, and bespoke velvet furnishings to create an environment that feels simultaneously intimate and grand. Every evening here is an occasion.
              </p>
            </div>
          </div>

          <div>
            {/* STATS ROW */}
            <div className="mt-8 pt-6 border-t border-gold-400/15 grid grid-cols-3 gap-4">
              <div>
                <span className="font-fashion text-3xl sm:text-4xl text-gold-400 font-light block leading-none">
                  180
                </span>
                <span className="font-body text-[9px] tracking-[0.2em] uppercase text-ink-200 font-semibold block mt-2">
                  SEATS
                </span>
                <span className="font-body text-[10px] text-ink-400 block mt-0.5">
                  intimate capacity
                </span>
              </div>

              <div>
                <span className="font-fashion text-3xl sm:text-4xl text-gold-400 font-light block leading-none">
                  3
                </span>
                <span className="font-body text-[9px] tracking-[0.2em] uppercase text-ink-200 font-semibold block mt-2">
                  SPACES
                </span>
                <span className="font-body text-[10px] text-ink-400 block mt-0.5">
                  dining, bar & terrace
                </span>
              </div>

              <div>
                <span className="font-fashion text-3xl sm:text-4xl text-gold-400 font-light block leading-none">
                  48
                </span>
                <span className="font-body text-[9px] tracking-[0.2em] uppercase text-ink-200 font-semibold block mt-2">
                  WINES
                </span>
                <span className="font-body text-[10px] text-ink-400 block mt-0.5">
                  curated cellar list
                </span>
              </div>
            </div>

            {/* OUR FULL STORY BUTTON MATCHING IMAGE */}
            <div className="mt-8">
              <button
                onClick={() => onNavigate?.('about')}
                className="btn-outline-gold py-3.5 px-8 text-[10px] font-body tracking-[0.18em] uppercase font-semibold"
              >
                OUR FULL STORY
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;
