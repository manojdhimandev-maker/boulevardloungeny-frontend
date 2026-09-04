import React, { useState } from 'react';
import {
  Sparkles,
  Calendar,
  Users,
  Utensils,
  Wine,
  Music,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Send,
  HelpCircle,
  Clock,
  Building,
  ShieldCheck,
  Award,
  ChevronRight,
  Flame,
  Volume2,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { syncToOwnerGoogleCalendar } from '@/lib/googleCalendarOwnerSync';
import type { PageId } from '@/components/Navbar';

type PrivateEventsPageProps = {
  onNavigate: (page: PageId) => void;
};

type PrivateEventFormState = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  event_type: string;
  preferred_date: string;
  alternative_date: string;
  start_time: string;
  duration: string;
  guest_count: string;
  guest_count_flexible: 'Yes' | 'No';
  event_style: 'Seated' | 'Mixed Seating & Standing' | 'Not Sure';
  privacy_preference: 'Private' | 'Semi-Private' | 'Either';
  food_preference: 'Passed Appetizers' | 'Platters' | 'No Food' | 'Not Sure';
  beverage_preference: 'Open Bar' | 'Limited Open Bar' | 'Drink Tickets';
  budget: 'Under $2,000' | '$2,000–$5,000' | '$5,000–$10,000' | '$10,000+' | 'Not Sure';
  dj_needed: 'Yes' | 'No' | 'Bringing Our Own';
  decorations: 'Yes' | 'No';
  cake: 'Yes' | 'No';
  photographer: 'Yes' | 'No';
  additional_notes: string;
  referral_source: string;
};

const emptyForm: PrivateEventFormState = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  event_type: 'Birthday',
  preferred_date: '',
  alternative_date: '',
  start_time: '7:00 PM',
  duration: '3 Hours',
  guest_count: '25',
  guest_count_flexible: 'Yes',
  event_style: 'Mixed Seating & Standing',
  privacy_preference: 'Private',
  food_preference: 'Passed Appetizers',
  beverage_preference: 'Open Bar',
  budget: '$2,000–$5,000',
  dj_needed: 'Yes',
  decorations: 'Yes',
  cake: 'No',
  photographer: 'No',
  additional_notes: '',
  referral_source: 'Instagram',
};

const eventTypeOptions = [
  'Birthday Celebration',
  'Anniversary / Date Night',
  'Engagement / Wedding Reception',
  'Corporate Buyout & Client Dinner',
  'Holiday Party',
  'Graduation Party',
  'Baby Shower',
  'Networking & Launch Event',
  'Other Private Celebration',
];

const referralOptions = [
  'Instagram',
  'Google Search',
  'TikTok',
  'Friend / Guest Referral',
  'Visited Previously',
  'Walk-In',
  'Other',
];

export const PrivateEventsPage: React.FC<PrivateEventsPageProps> = ({ onNavigate }) => {
  const [form, setForm] = useState<PrivateEventFormState>(emptyForm);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const update = <K extends keyof PrivateEventFormState>(key: K, value: PrivateEventFormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.first_name.trim() ||
      !form.last_name.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.preferred_date ||
      !form.start_time ||
      !form.guest_count
    ) {
      setErrorMsg('Please complete all required fields marked with an asterisk (*).');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    try {
      const { error } = await supabase.from('private_event_inquiries').insert([
        {
          first_name: form.first_name.trim(),
          last_name: form.last_name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          event_type: form.event_type,
          preferred_date: form.preferred_date,
          alternative_date: form.alternative_date || null,
          start_time: form.start_time,
          duration: form.duration,
          guest_count: form.guest_count,
          guest_count_flexible: form.guest_count_flexible,
          event_style: form.event_style,
          privacy_preference: form.privacy_preference,
          food_preference: form.food_preference,
          beverage_preference: form.beverage_preference,
          budget: form.budget,
          dj_needed: form.dj_needed,
          decorations: form.decorations,
          cake: form.cake,
          photographer: form.photographer,
          additional_notes: form.additional_notes.trim() || null,
          referral_source: form.referral_source,
        },
      ]);

      if (error) {
        console.warn('Supabase insert notice:', error);
      }
    } catch (err) {
      console.warn('Private event inquiry fallback notice:', err);
    }

    // Automatically push buyout inquiry to Lounge Owner's Master Google Calendar
    syncToOwnerGoogleCalendar({
      type: 'private_event',
      guestName: `${form.first_name} ${form.last_name}`,
      phone: form.phone,
      email: form.email,
      date: form.preferred_date,
      time: form.start_time,
      guestCount: form.guest_count,
      seatingArea: form.event_type,
      occasion: form.event_type,
      depositStatus: `Budget: ${form.budget} | Style: ${form.event_style}`,
      notes: form.additional_notes,
    });

    setStatus('success');
  };

  const resetForm = () => {
    setForm(emptyForm);
    setStatus('idle');
    setErrorMsg('');
  };

  return (
    <div className="animate-fade-in min-h-screen pb-24">
      {/* ── HERO HEADER WITH ATMOSPHERIC BACKDROP ── */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/instaposts-imeages/private_events_hero_bg.jpg"
            alt="Boulevard Lounge Private Event Atmosphere"
            className="w-full h-full object-cover opacity-30 brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/90 via-ink-950/75 to-ink-950" />
        </div>

        <div className="relative mx-auto max-w-5xl px-5 sm:px-8 text-center">
          <span className="font-fashion text-xs tracking-[0.25em] font-semibold text-gold-400 uppercase block mb-3 animate-fade-up">
            LUXURY PRIVATE VENUE BUYOUTS
          </span>
          <h1 className="font-fashion text-4xl sm:text-6xl lg:text-7xl font-semibold text-ink-100 leading-tight mb-5 animate-fade-up">
            Host Your Extraordinary Event
          </h1>
          <p className="font-body text-sm sm:text-base text-ink-300 font-light leading-relaxed max-w-2xl mx-auto mb-10 animate-fade-up">
            From intimate milestone birthday toasts to full lounge corporate buyouts, experience world-class hospitality, bespoke cocktail menus, and a sophisticated Staten Island atmosphere.
          </p>

        </div>
      </section>

      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        {/* ── BUYOUT INQUIRY FORM CONTAINER ── */}
        <section id="inquiry-form" className="scroll-mt-32">
          {status === 'success' ? (
            <div className="glass-panel p-10 sm:p-16 rounded-sm border border-gold-400/40 glow-gold text-center max-w-2xl mx-auto space-y-6 animate-fade-in shadow-2xl">
              <div className="w-20 h-20 bg-gold-gradient text-ink-950 rounded-full grid place-items-center mx-auto shadow-xl">
                <CheckCircle2 size={42} strokeWidth={2.2} />
              </div>
              <h2 className="font-fashion text-3xl sm:text-4xl text-ink-100 font-semibold">
                Inquiry Received!
              </h2>
              <p className="font-body text-ink-200 text-sm leading-relaxed">
                Thank you, <strong className="text-gold-400">{form.first_name} {form.last_name}</strong>! We have received your buyout inquiry for your <strong className="text-gold-400">{form.event_type}</strong> on <strong className="text-gold-400">{form.preferred_date}</strong>.
              </p>
              <div className="p-5 rounded-sm bg-ink-900/80 border border-gold-400/30 text-xs text-ink-300 leading-relaxed text-left space-y-2 font-body">
                <p className="font-fashion text-sm font-semibold text-gold-400 uppercase tracking-wider">What Happens Next?</p>
                <p>
                  A member of our private events concierge team will review your specs and contact you within 24 hours to discuss date availability, custom menus, minimum spend requirements, and lounge layouts.
                </p>
              </div>
              <div className="pt-4 flex justify-center gap-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn-gold py-3.5 px-8 text-xs font-fashion font-bold"
                >
                  Submit Another Inquiry
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="btn-outline-gold py-3.5 px-8 text-xs font-fashion font-bold"
                >
                  Return to Home
                </button>
              </div>
            </div>
          ) : (
            <div className="relative rounded-sm p-6 sm:p-12 border border-gold-400/40 shadow-[0_30px_90px_rgba(0,0,0,0.95),0_0_50px_rgba(181,138,59,0.15)] overflow-hidden">
              {/* LUXURY BACKGROUND IMAGE & GRADIENT OVERLAY */}
              <div className="absolute inset-0 pointer-events-none">
                <img
                  src="/instaposts-imeages/vip_suite_champagne.jpg"
                  alt="Lounge Bar Ambiance"
                  className="w-full h-full object-cover opacity-20 brightness-50"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'radial-gradient(ellipse at 50% 0%, rgba(22, 20, 16, 0.95) 0%, rgba(10, 9, 8, 0.98) 100%)',
                  }}
                />
              </div>

              {/* CORNER LUXURY GOLD ACCENTS */}
              <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-gold-400/60 pointer-events-none" />
              <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-gold-400/60 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-gold-400/60 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-gold-400/60 pointer-events-none" />

              <div className="relative z-10">
                <div className="text-center max-w-xl mx-auto mb-10">
                  <span className="font-fashion text-xs tracking-[0.25em] font-semibold text-gold-400 uppercase block mb-2">
                    EVENT CONCIERGE
                  </span>
                  <h3 className="font-fashion text-3xl sm:text-4xl text-ink-100 font-semibold">
                    Request Event Availability
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-ink-300 font-light mt-2">
                    Fill out the form below to receive a personalized buyout proposal from our event team.
                  </p>
                </div>

              <form onSubmit={handleSubmit} className="space-y-10 animate-fade-in font-body">
                {/* STEP 1: CONTACT INFORMATION */}
                <div className="space-y-5">
                  <div className="border-b border-gold-400/20 pb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gold-400/15 border border-gold-400/40 text-gold-400 grid place-items-center text-xs font-fashion font-bold">
                        01
                      </div>
                      <h4 className="font-fashion text-xl text-ink-100 font-semibold uppercase tracking-wider">
                        Contact Information
                      </h4>
                    </div>
                    <span className="font-fashion text-xs text-gold-400/70 tracking-widest uppercase">Required *</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-fashion font-semibold text-gold-400 uppercase tracking-wider mb-1.5">First Name *</label>
                      <input
                        required
                        type="text"
                        placeholder="Alex"
                        value={form.first_name}
                        onChange={(e) => update('first_name', e.target.value)}
                        className="w-full px-4 py-3 rounded-sm bg-ink-900/90 border border-gold-400/20 text-ink-100 placeholder:text-ink-500 focus:outline-none focus:border-gold-400 text-sm font-body transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-fashion font-semibold text-gold-400 uppercase tracking-wider mb-1.5">Last Name *</label>
                      <input
                        required
                        type="text"
                        placeholder="Morgan"
                        value={form.last_name}
                        onChange={(e) => update('last_name', e.target.value)}
                        className="w-full px-4 py-3 rounded-sm bg-ink-900/90 border border-gold-400/20 text-ink-100 placeholder:text-ink-500 focus:outline-none focus:border-gold-400 text-sm font-body transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-fashion font-semibold text-gold-400 uppercase tracking-wider mb-1.5">Email Address *</label>
                      <input
                        required
                        type="email"
                        placeholder="alex@example.com"
                        value={form.email}
                        onChange={(e) => update('email', e.target.value)}
                        className="w-full px-4 py-3 rounded-sm bg-ink-900/90 border border-gold-400/20 text-ink-100 placeholder:text-ink-500 focus:outline-none focus:border-gold-400 text-sm font-body transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-fashion font-semibold text-gold-400 uppercase tracking-wider mb-1.5">Phone Number *</label>
                      <input
                        required
                        type="tel"
                        placeholder="(555) 000-0000"
                        value={form.phone}
                        onChange={(e) => update('phone', e.target.value)}
                        className="w-full px-4 py-3 rounded-sm bg-ink-900/90 border border-gold-400/20 text-ink-100 placeholder:text-ink-500 focus:outline-none focus:border-gold-400 text-sm font-body transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* STEP 2: EVENT DETAILS */}
                <div className="space-y-5">
                  <div className="border-b border-gold-400/20 pb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gold-400/15 border border-gold-400/40 text-gold-400 grid place-items-center text-xs font-fashion font-bold">
                        02
                      </div>
                      <h4 className="font-fashion text-xl text-ink-100 font-semibold uppercase tracking-wider">
                        Event Specs & Timeline
                      </h4>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-fashion font-semibold text-gold-400 uppercase tracking-wider mb-1.5">Event Type *</label>
                      <select
                        value={form.event_type}
                        onChange={(e) => update('event_type', e.target.value)}
                        className="w-full px-4 py-3.5 rounded-sm bg-ink-900/90 border border-gold-400/20 text-ink-100 focus:outline-none focus:border-gold-400 text-sm font-body font-semibold cursor-pointer"
                      >
                        {eventTypeOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-ink-950 text-ink-100">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-fashion font-semibold text-gold-400 uppercase tracking-wider mb-1.5">Preferred Event Date *</label>
                      <input
                        required
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={form.preferred_date}
                        onChange={(e) => update('preferred_date', e.target.value)}
                        className="w-full px-4 py-3 rounded-sm bg-ink-900/90 border border-gold-400/20 text-ink-100 focus:outline-none focus:border-gold-400 text-sm font-body"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-fashion font-semibold text-gold-400 uppercase tracking-wider mb-1.5">Alternative Date</label>
                      <input
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={form.alternative_date}
                        onChange={(e) => update('alternative_date', e.target.value)}
                        className="w-full px-4 py-3 rounded-sm bg-ink-900/90 border border-gold-400/20 text-ink-100 focus:outline-none focus:border-gold-400 text-sm font-body"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-fashion font-semibold text-gold-400 uppercase tracking-wider mb-1.5">Preferred Start Time *</label>
                      <select
                        value={form.start_time}
                        onChange={(e) => update('start_time', e.target.value)}
                        className="w-full px-4 py-3 rounded-sm bg-ink-900/90 border border-gold-400/20 text-ink-100 focus:outline-none focus:border-gold-400 text-sm font-body cursor-pointer"
                      >
                        {['5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM'].map((t) => (
                          <option key={t} value={t} className="bg-ink-950 text-ink-100">
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-fashion font-semibold text-gold-400 uppercase tracking-wider mb-1.5">Estimated Duration</label>
                      <select
                        value={form.duration}
                        onChange={(e) => update('duration', e.target.value)}
                        className="w-full px-4 py-3 rounded-sm bg-ink-900/90 border border-gold-400/20 text-ink-100 focus:outline-none focus:border-gold-400 text-sm font-body cursor-pointer"
                      >
                        {['2 Hours', '3 Hours', '4 Hours', 'Full Evening Buyout'].map((d) => (
                          <option key={d} value={d} className="bg-ink-950 text-ink-100">
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-fashion font-semibold text-gold-400 uppercase tracking-wider mb-1.5">Estimated Number of Guests *</label>
                      <input
                        required
                        type="number"
                        min={5}
                        max={200}
                        placeholder="e.g. 35"
                        value={form.guest_count}
                        onChange={(e) => update('guest_count', e.target.value)}
                        className="w-full px-4 py-3 rounded-sm bg-ink-900/90 border border-gold-400/20 text-ink-100 placeholder:text-ink-500 focus:outline-none focus:border-gold-400 text-sm font-body"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-fashion font-semibold text-gold-400 uppercase tracking-wider mb-2">Guest Count Flexible?</label>
                      <div className="flex gap-3">
                        {(['Yes', 'No'] as const).map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => update('guest_count_flexible', opt)}
                            className={`flex-1 py-3 rounded-sm border text-xs font-fashion tracking-wider uppercase font-semibold transition-all ${
                              form.guest_count_flexible === opt
                                ? 'bg-gold-400 text-ink-950 border-gold-400 shadow-md'
                                : 'bg-ink-900/60 border-gold-400/20 text-ink-300 hover:border-gold-400/50'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* STEP 3: FOOD & BAR PROGRAM */}
                <div className="space-y-5">
                  <div className="border-b border-gold-400/20 pb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gold-400/15 border border-gold-400/40 text-gold-400 grid place-items-center text-xs font-fashion font-bold">
                        03
                      </div>
                      <h4 className="font-fashion text-xl text-ink-100 font-semibold uppercase tracking-wider">
                        Food & Bar Program
                      </h4>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-xs font-fashion font-semibold text-gold-400 uppercase tracking-wider mb-2">Food Preference</label>
                      <select
                        value={form.food_preference}
                        onChange={(e) => update('food_preference', e.target.value as any)}
                        className="w-full px-4 py-3 rounded-sm bg-ink-900/90 border border-gold-400/20 text-ink-100 focus:outline-none focus:border-gold-400 text-xs font-body cursor-pointer"
                      >
                        {['Passed Appetizers', 'Platters', 'No Food', 'Not Sure'].map((f) => (
                          <option key={f} value={f} className="bg-ink-950 text-ink-100">
                            {f}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-fashion font-semibold text-gold-400 uppercase tracking-wider mb-2">Beverage Preference</label>
                      <select
                        value={form.beverage_preference}
                        onChange={(e) => update('beverage_preference', e.target.value as any)}
                        className="w-full px-4 py-3 rounded-sm bg-ink-900/90 border border-gold-400/20 text-ink-100 focus:outline-none focus:border-gold-400 text-xs font-body cursor-pointer"
                      >
                        {['Open Bar', 'Limited Open Bar', 'Drink Tickets'].map((b) => (
                          <option key={b} value={b} className="bg-ink-950 text-ink-100">
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-fashion font-semibold text-gold-400 uppercase tracking-wider mb-2">Estimated Budget Range</label>
                      <select
                        value={form.budget}
                        onChange={(e) => update('budget', e.target.value as any)}
                        className="w-full px-4 py-3 rounded-sm bg-ink-900/90 border border-gold-400/20 text-gold-400 font-semibold focus:outline-none focus:border-gold-400 text-xs font-body cursor-pointer"
                      >
                        {['Under $2,000', '$2,000–$5,000', '$5,000–$10,000', '$10,000+', 'Not Sure'].map((bud) => (
                          <option key={bud} value={bud} className="bg-ink-950 text-ink-100">
                            {bud}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* STEP 4: ADDITIONAL REQUIREMENTS */}
                <div className="space-y-4">
                  <div className="border-b border-gold-400/20 pb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gold-400/15 border border-gold-400/40 text-gold-400 grid place-items-center text-xs font-fashion font-bold">
                        04
                      </div>
                      <h4 className="font-fashion text-xl text-ink-100 font-semibold uppercase tracking-wider">
                        Special Requests & Notes
                      </h4>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-fashion font-semibold text-gold-400 uppercase tracking-wider mb-2">
                      Event Vision, Custom Menus & Special Setup Instructions
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Share details about your event theme, custom cocktail ideas, DJ requirements, VIP booth preferences, or milestone announcements..."
                      value={form.additional_notes}
                      onChange={(e) => update('additional_notes', e.target.value)}
                      className="w-full px-4 py-3 rounded-sm bg-ink-900/90 border border-gold-400/20 text-ink-100 placeholder:text-ink-500 focus:outline-none focus:border-gold-400 text-sm font-body transition-colors"
                    />
                  </div>
                </div>

                {/* STEP 5: HOW DID YOU HEAR ABOUT US */}
                <div className="space-y-4">
                  <label className="block text-xs font-fashion font-semibold text-gold-400 uppercase tracking-wider mb-2">How did you hear about us?</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {referralOptions.map((ref) => (
                      <button
                        key={ref}
                        type="button"
                        onClick={() => update('referral_source', ref)}
                        className={`p-3 rounded-sm border text-xs font-fashion font-semibold uppercase tracking-wider transition-all ${
                          form.referral_source === ref
                            ? 'bg-gold-400 text-ink-950 border-gold-400 shadow-md'
                            : 'bg-ink-900/60 border-gold-400/20 text-ink-300 hover:border-gold-400/50'
                        }`}
                      >
                        {ref}
                      </button>
                    ))}
                  </div>
                </div>

                {errorMsg && (
                  <div className="p-4 rounded-sm bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 font-body">
                    <AlertCircle size={16} /> {errorMsg}
                  </div>
                )}

                {/* SUBMIT BUTTON */}
                <div className="space-y-4 pt-4 border-t border-gold-400/20">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full btn-gold py-4 text-xs font-fashion font-bold tracking-[0.2em] shadow-xl hover:shadow-gold-400/30 transition-all flex items-center justify-center gap-2 uppercase disabled:opacity-50"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 size={18} className="animate-spin" /> Submitting Buyout Request…
                      </>
                    ) : (
                      <>
                        <Send size={16} /> REQUEST EVENT AVAILABILITY & PROPOSAL
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-ink-400 italic text-center leading-relaxed font-body">
                    * Submitting an inquiry does not obligate or confirm a buyout reservation. Our event manager will contact you within 24 hours to present space layouts, menu options, and date availability.
                  </p>
                </div>
              </form>
              </div>
            </div>
          )}
        </section>

        {/* ── VENUE SPEC HIGHLIGHT CARDS (AFTER FORM) ── */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {[
            { title: 'UP TO 200 GUESTS', desc: 'Full venue capacity' },
            { title: '3 DISTINCT SPACES', desc: 'Dining, bar & lounge' },
            { title: 'FULL DJ & SOUND', desc: 'Surround acoustic setup' },
            { title: 'TAILORED MENUS', desc: 'Chef & mixologist curated' },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="glass-panel p-5 rounded-sm border border-gold-400/25 shadow-lg text-center backdrop-blur-md"
            >
              <span className="font-fashion text-sm sm:text-base text-gold-400 font-semibold uppercase block tracking-wider">
                {stat.title}
              </span>
              <span className="font-body text-[10px] text-ink-300 uppercase tracking-widest block mt-1">
                {stat.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivateEventsPage;
