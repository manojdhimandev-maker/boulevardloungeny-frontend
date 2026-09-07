import React from 'react';
import type { PageId } from '@/components/Navbar';
import HeroVideoBackground from '@/components/HeroVideoBackground';
import HeroReservationWidget from '@/components/HeroReservationWidget';
import ThisWeekendSection from '@/components/ThisWeekendSection';
import SignatureCocktailsSection from '@/components/SignatureCocktailsSection';
import HookahSection from '@/components/HookahSection';
import VividWeekendsSection from '@/components/VividWeekendsSection';
import TransformationSection from '@/components/TransformationSection';
import PrivateEventsSpotlight from '@/components/PrivateEventsSpotlight';
import CustomSocialGallery from '@/components/CustomSocialGallery';
import TableAwaitsCtaSection from '@/components/TableAwaitsCtaSection';
import { Star, Quote, Flame } from 'lucide-react';
import { venueInfo } from '@/data/venue';

type HomeProps = {
  onNavigate: (page: PageId, categoryId?: string) => void;
};

const testimonials = [
  {
    name: 'Marcus Vance',
    role: 'Verified Guest',
    stars: 5,
    text: 'Hands down the best nightlife and cocktail lounge experience on Staten Island! The Love Spell Martini, pineapple hookah, and Afro House DJ after 10 PM are unmatched.',
  },
  {
    name: 'Elena Rostova',
    role: 'VIP Event Guest',
    stars: 5,
    text: 'Hosted my 30th birthday group in the VIP booth. The bottle presentation, music energy, and table side hookah service made it completely unforgettable.',
  },
  {
    name: 'David Chen',
    role: 'Regular Guest',
    stars: 5,
    text: 'Boulevard Saturday nights hit different. Premium hookah, craft cocktails, and high-energy music. Best weekend spot by far.',
  },
];

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="animate-fade-in pb-12 bg-ink-950">
      {/* 01 — HERO: THE NIGHT STARTS HERE */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden border-b border-gold-400/20">
        <HeroVideoBackground />

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 pt-24 sm:pt-32 md:pt-36 pb-12 sm:pb-20 md:pb-24 w-full flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-12">
          {/* LEFT COLUMN: HERO HEADLINE & ACTIONS */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2.5 section-tag animate-fade-up !text-sm sm:!text-base md:!text-lg font-semibold">
              <Flame size={18} className="text-gold-400 animate-pulse shrink-0" />
              STATEN ISLAND’S PREMIER LOUNGE
            </div>

            <h1
              className="mt-3 font-fashion text-[clamp(28px,3.8vw,52px)] font-bold uppercase tracking-[0.05em] leading-[1.05] text-ink-100 animate-fade-up"
              style={{ animationDelay: '0.1s' }}
            >
              COCKTAILS.<br />
              <span className="text-gold-400 font-light">HOOKAH.</span><br />
              VIVID NIGHTS.
            </h1>

            <p
              className="mt-6 font-body text-base sm:text-lg text-ink-300 max-w-xl leading-relaxed animate-fade-up"
              style={{ animationDelay: '0.2s' }}
            >
              Staten Island nights hit different at Boulevard. Crafted cocktails, premium hookah, weekend DJs, and private celebrations.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <button
                onClick={() => onNavigate('reservations')}
                className="btn-gold py-4 px-8 text-xs font-bold"
              >
                RESERVE A TABLE
              </button>
              <button
                onClick={() => onNavigate('events')}
                className="btn-outline-gold py-4 px-8 text-xs font-bold"
              >
                SEE THIS WEEKEND
              </button>
            </div>

            {/* KEY STATS */}
            <div
              className="mt-12 flex flex-wrap items-center gap-8 border-t border-gold-400/20 pt-6 text-ink-300 animate-fade-up"
              style={{ animationDelay: '0.4s' }}
            >
              <div>
                <span className="font-fashion text-3xl font-bold text-gold-400 block leading-none">9 PM</span>
                <span className="font-fashion text-[10px] tracking-[0.2em] uppercase text-ink-300 mt-1 block font-semibold">LIVE DJs WEEKENDS</span>
              </div>
              <div className="h-6 w-[1px] bg-gold-400/20 hidden sm:block" />
              <div>
                <span className="font-fashion text-3xl font-bold text-gold-400 block leading-none">15+</span>
                <span className="font-fashion text-[10px] tracking-[0.2em] uppercase text-ink-300 mt-1 block font-semibold">HOOKAH FLAVORS</span>
              </div>
              <div className="h-6 w-[1px] bg-gold-400/20 hidden sm:block" />
              <div>
                <span className="font-fashion text-3xl font-bold text-gold-400 block leading-none">4.9 ★</span>
                <span className="font-fashion text-[10px] tracking-[0.2em] uppercase text-ink-300 mt-1 block font-semibold">NIGHTLIFE RATING</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM TICKER STRIP */}
      <section className="relative z-20 bg-ink-900 border-b border-gold-400/30 overflow-hidden py-3">
        <div className="animate-marquee whitespace-nowrap flex gap-10 text-xs font-fashion font-bold tracking-[0.2em] text-gold-300 uppercase">
          <span>FRIDAY & SATURDAY</span>
          <span className="text-gold-500/40">✦</span>
          <span>LIVE DJs</span>
          <span className="text-gold-500/40">✦</span>
          <span>PREMIUM HOOKAH</span>
          <span className="text-gold-500/40">✦</span>
          <span>CRAFT COCKTAILS</span>
          <span className="text-gold-500/40">✦</span>
          <span>LATE NIGHT POURS</span>
          <span className="text-gold-500/40">✦</span>
          <span>FRIDAY & SATURDAY</span>
          <span className="text-gold-500/40">✦</span>
          <span>LIVE DJs</span>
          <span className="text-gold-500/40">✦</span>
          <span>PREMIUM HOOKAH</span>
          <span className="text-gold-500/40">✦</span>
          <span>CRAFT COCKTAILS</span>
          <span className="text-gold-500/40">✦</span>
          <span>LATE NIGHT POURS</span>
        </div>
      </section>

      {/* 02 — THIS WEEKEND */}
      <ThisWeekendSection onNavigate={onNavigate} />

      {/* 03 — SIGNATURE COCKTAILS */}
      <SignatureCocktailsSection onNavigate={onNavigate} />

      {/* 04 — HOOKAH EXPERIENCE */}
      <HookahSection onNavigate={onNavigate} />

      {/* 05 — VIVID WEEKENDS (EMOTIONAL CENTERPIECE) */}
      <VividWeekendsSection onNavigate={onNavigate} />

      {/* 06 — DAY TO NIGHT TRANSFORMATION */}
      <TransformationSection onNavigate={onNavigate} />

      {/* 07 — PRIVATE EVENTS & CELEBRATIONS */}
      <PrivateEventsSpotlight onNavigate={onNavigate} />

      {/* GUEST REVIEWS */}
      <section className="relative py-24 bg-ink-900/60 border-b border-gold-400/20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <div className="section-tag">GUEST EXPERIENCES</div>
            <h2 className="section-title text-4xl uppercase">LOVED BY GUESTS</h2>
            <div className="mt-3 flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="fill-current text-gold-400" />
              ))}
              <span className="ml-2 font-fashion text-xs text-gold-400 tracking-wider font-semibold uppercase">4.9 / 5.0 Rating</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="glass-panel rounded-sm p-6 border border-gold-400/20 flex flex-col justify-between relative shadow-lg"
              >
                <Quote size={28} className="text-gold-400/20 absolute top-5 right-5" />
                <div>
                  <div className="flex gap-1 mb-3">
                    {[...Array(t.stars)].map((_, s) => (
                      <Star key={s} size={14} className="fill-current text-gold-400" />
                    ))}
                  </div>
                  <p className="font-body text-xs sm:text-sm text-ink-200 leading-relaxed italic">"{t.text}"</p>
                </div>
                <div className="mt-6 pt-4 border-t border-gold-400/20 flex items-center justify-between">
                  <div>
                    <h4 className="font-fashion text-base text-ink-100 font-bold uppercase">{t.name}</h4>
                    <p className="font-body text-[0.7rem] text-gold-400/80 uppercase tracking-wider">{t.role}</p>
                  </div>
                  <span className="font-fashion text-[0.65rem] uppercase tracking-wider px-2.5 py-1 rounded-sm bg-gold-400/10 text-gold-400 border border-gold-400/30 font-bold">
                    Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 08 — INSTAGRAM / SOCIAL PROOF */}
      <CustomSocialGallery />

      {/* 09 — FINAL RESERVATION CTA */}
      <TableAwaitsCtaSection onNavigate={onNavigate} />
    </div>
  );
}
