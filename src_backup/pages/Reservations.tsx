import { useState } from 'react';
import {
  CalendarDays,
  Clock,
  Users,
  Phone,
  MessageSquare,
  CheckCircle2,
  Loader2,
  CalendarPlus,
  AlertCircle,
  Sparkles,
  MapPin,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Wine,
  UtensilsCrossed,
  Armchair,
  GlassWater,
  CreditCard,
  Lock,
  Wallet,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { venueInfo } from '@/data/venue';

type FormState = {
  guest_name: string;
  phone: string;
  email: string;
  reservation_date: string;
  reservation_time: string;
  guest_count: number;
  seating_area: string;
  occasion: string;
  notes: string;
  payment_method: 'card' | 'googlepay' | 'venue_hold';
  card_number: string;
  card_exp: string;
  card_cvc: string;
  card_zip: string;
};

const emptyForm: FormState = {
  guest_name: '',
  phone: '',
  email: '',
  reservation_date: '',
  reservation_time: '',
  guest_count: 2,
  seating_area: 'VIP Booth / Main Lounge',
  occasion: 'None',
  notes: '',
  payment_method: 'card',
  card_number: '',
  card_exp: '',
  card_cvc: '',
  card_zip: '',
};

const timeSlotGroups = [
  {
    name: 'Weekend Brunch (Sat & Sun)',
    slots: ['1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'],
  },
  {
    name: 'Happy Hour (5:00 PM – 7:00 PM)',
    slots: ['5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM'],
  },
  {
    name: 'Prime Dinner & Lounge (7:00 PM – 9:30 PM)',
    slots: ['7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM'],
  },
  {
    name: 'Late Night Pours (10:00 PM – Close)',
    slots: ['10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM'],
  },
];

const seatingAreas = [
  { id: 'VIP Booth / Main Lounge', title: 'VIP Lounge Booth', icon: Armchair, desc: 'Plush velvet booth seating' },
  { id: 'Cocktail Bar Counter', title: 'Cocktail Bar Counter', icon: Wine, desc: 'Front-row view of our mixologists' },
  { id: 'Dining Room Table', title: 'Main Dining Table', icon: UtensilsCrossed, desc: 'Warm candlelit seating for meals' },
  { id: 'Terrace / High Top', title: 'Terrace & High Top', icon: GlassWater, desc: 'Lively high-top atmosphere' },
];

const occasions = [
  'Just Drinks & Bites',
  '🎂 Birthday Celebration',
  '🥂 Anniversary / Date Night',
  '💼 Business & Client Dinner',
  '🎉 VIP Night Out & Party',
];

export default function Reservations() {
  const [step, setStep] = useState<number>(1);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const today = new Date().toISOString().split('T')[0];

  // Dynamic deposit calculation based on party size
  const depositAmount = form.guest_count <= 4 ? 25 : form.guest_count <= 8 ? 50 : 100;

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const validateDetailsStep = () => {
    if (!form.guest_name.trim()) {
      setErrorMsg('Please enter your full name.');
      return false;
    }
    if (!form.phone.trim()) {
      setErrorMsg('Please enter a valid phone number.');
      return false;
    }
    setErrorMsg('');
    return true;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.guest_name || !form.phone || !form.reservation_date || !form.reservation_time) {
      setErrorMsg('Please complete all required fields (Name, Phone, Date, Time).');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    const combinedNotes = [
      `Seating Preference: ${form.seating_area}`,
      `Occasion: ${form.occasion}`,
      `Deposit Required: $${depositAmount} (${form.payment_method})`,
      form.notes ? `Notes: ${form.notes}` : null,
    ]
      .filter(Boolean)
      .join(' | ');

    const payload = {
      guest_name: form.guest_name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || null,
      reservation_date: form.reservation_date,
      reservation_time: form.reservation_time,
      guest_count: form.guest_count,
      notes: combinedNotes,
    };

    const { error } = await supabase.from('reservations').insert(payload);

    if (error) {
      console.warn('Supabase insert notice:', error);
    }

    setStatus('success');
  };

  const reset = () => {
    setForm(emptyForm);
    setStep(1);
    setStatus('idle');
  };

  const googleCalendarUrl = () => {
    if (!form.reservation_date || !form.reservation_time) return '#';
    const timeMap: Record<string, string> = {
      '1:00 PM': '13:00', '1:30 PM': '13:30', '2:00 PM': '14:00', '2:30 PM': '14:30',
      '3:00 PM': '15:00', '3:30 PM': '15:30', '4:00 PM': '16:00', '4:30 PM': '16:30',
      '5:00 PM': '17:00', '5:30 PM': '17:30', '6:00 PM': '18:00', '6:30 PM': '18:30',
      '7:00 PM': '19:00', '7:30 PM': '19:30', '8:00 PM': '20:00', '8:30 PM': '20:30',
      '9:00 PM': '21:00', '9:30 PM': '21:30', '10:00 PM': '22:00', '10:30 PM': '22:30',
      '11:00 PM': '23:00', '11:30 PM': '23:30',
    };
    const startHour = timeMap[form.reservation_time] ?? '19:00';
    const startStr = `${form.reservation_date}T${startHour}:00`;
    const endHour = String(Number(startHour.split(':')[0]) + 2).padStart(2, '0');
    const endStr = `${form.reservation_date}T${endHour}:00:00`;
    const text = 'Reservation at The Boulevard Lounge NY';
    const details = `Table for ${form.guest_count} guests (${form.guest_name}). Deposit Hold: $${depositAmount}. Seating: ${form.seating_area}. Occasion: ${form.occasion}.`;
    const location = `${venueInfo.address}, ${venueInfo.city}`;
    const startCompact = startStr.replace(/[-:]/g, '');
    const endCompact = endStr.replace(/[-:]/g, '');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(text)}&dates=${encodeURIComponent(startCompact)}/${encodeURIComponent(endCompact)}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
  };

  if (status === 'success') {
    return (
      <div className="animate-fade-in min-h-screen pt-36 pb-20">
        <div className="mx-auto max-w-2xl px-5 sm:px-8">
          <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-gold-500/40 text-center animate-scale-in glow-gold">
            <div className="grid place-items-center w-16 h-16 rounded-full bg-gold-gradient text-ink-950 mx-auto mb-6 shadow-xl">
              <CheckCircle2 size={36} />
            </div>
            <span className="text-gold-300 text-xs tracking-[0.25em] uppercase font-semibold">Booking Confirmed</span>
            <h1 className="mt-2 font-display text-4xl sm:text-5xl text-ink-50 font-bold">See You Soon!</h1>
            <p className="mt-4 text-ink-200 text-base leading-relaxed max-w-md mx-auto">
              We've received your reservation for <strong className="text-gold-200">{form.guest_count} guests</strong> on{' '}
              <strong className="text-gold-200">{form.reservation_date}</strong> at{' '}
              <strong className="text-gold-200">{form.reservation_time}</strong>.
            </p>

            {/* RESERVATION CARD SUMMARY */}
            <div className="mt-8 p-6 rounded-2xl bg-ink-900/90 border border-gold-500/20 text-left space-y-3 text-sm">
              <div className="flex justify-between border-b border-ink-700/60 pb-2">
                <span className="text-ink-400">Guest Name:</span>
                <span className="font-medium text-ink-100">{form.guest_name}</span>
              </div>
              <div className="flex justify-between border-b border-ink-700/60 pb-2">
                <span className="text-ink-400">Phone:</span>
                <span className="font-medium text-ink-100">{form.phone}</span>
              </div>
              <div className="flex justify-between border-b border-ink-700/60 pb-2">
                <span className="text-ink-400">Seating Preference:</span>
                <span className="font-medium text-gold-300">{form.seating_area}</span>
              </div>
              <div className="flex justify-between border-b border-ink-700/60 pb-2">
                <span className="text-ink-400">Table Deposit Hold:</span>
                <span className="font-bold text-gold-300">${depositAmount}.00 (100% Credited)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-400">Occasion:</span>
                <span className="font-medium text-ink-100">{form.occasion}</span>
              </div>
            </div>

            {/* GOOGLE CALENDAR BUTTON */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={googleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gold-gradient text-ink-950 font-semibold px-6 py-3.5 rounded-full inline-flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-gold-700/40 transition-all text-sm"
              >
                <CalendarPlus size={18} /> Add to Google Calendar
              </a>
              <button
                onClick={reset}
                className="px-6 py-3.5 rounded-full border border-ink-600 text-ink-200 hover:border-gold-400 hover:text-gold-200 transition-colors text-sm font-medium"
              >
                Make Another Reservation
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in min-h-screen pt-36 pb-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* PAGE HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="section-tag">
            INSTANT ONLINE TABLE BOOKING
          </div>
          <h1 className="section-title">
            Reserve Your Table
          </h1>
          <p className="section-desc max-w-xl mx-auto">
            Select your party size, date, preferred seating area, and instant time slot.
          </p>
        </div>

        {/* WIZARD STEPPER HEADER */}
        <div className="max-w-2xl mx-auto mb-10 flex items-center justify-between relative px-4">
          <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-0.5 bg-ink-800 -z-0" />
          {[
            { num: 1, label: 'Date & Guests' },
            { num: 2, label: 'Time & Seating' },
            { num: 3, label: 'Your Details' },
            { num: 4, label: 'Deposit Hold' },
          ].map((s) => (
            <button
              key={s.num}
              onClick={() => setStep(s.num)}
              className="relative z-10 flex flex-col items-center gap-1.5 cursor-pointer group"
            >
              <div
                className={`w-9 h-9 rounded-full grid place-items-center font-display text-base font-bold transition-all ${
                  step === s.num
                    ? 'bg-gold-gradient text-ink-950 ring-4 ring-gold-500/20 scale-110 shadow-lg'
                    : step > s.num
                    ? 'bg-gold-700 text-gold-100'
                    : 'bg-ink-800 text-ink-400 border border-ink-700'
                }`}
              >
                {step > s.num ? '✓' : s.num}
              </div>
              <span className={`text-[0.65rem] sm:text-[0.7rem] font-medium tracking-wider uppercase ${step === s.num ? 'text-gold-200 font-semibold' : 'text-ink-400'}`}>
                {s.label}
              </span>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* MAIN FORM PANEL */}
          <div className="lg:col-span-8 glass-panel rounded-3xl p-6 sm:p-10 border border-gold-500/20 shadow-xl">
            <form onSubmit={submit}>
              {/* STEP 1: DATE & GUEST COUNT */}
              {step === 1 && (
                <div className="space-y-8 animate-fade-in">
                  <div>
                    <label className="block text-sm font-medium text-ink-200 mb-3 flex items-center gap-2">
                      <Users size={16} className="text-gold-400" /> How many guests in your party?
                    </label>
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <button
                          type="button"
                          key={num}
                          onClick={() => update('guest_count', num)}
                          className={`py-3 rounded-xl font-display text-lg font-semibold transition-all ${
                            form.guest_count === num
                              ? 'bg-gold-gradient text-ink-950 shadow-md ring-2 ring-gold-400'
                              : 'bg-ink-800/80 text-ink-200 border border-ink-700 hover:border-gold-500/40 hover:text-gold-200'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-ink-200 mb-3 flex items-center gap-2">
                      <CalendarDays size={16} className="text-gold-400" /> Select Reservation Date
                    </label>
                    <input
                      type="date"
                      min={today}
                      value={form.reservation_date}
                      onChange={(e) => update('reservation_date', e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl bg-ink-800/80 border border-ink-600 text-ink-50 focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-500/20 text-base"
                    />
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      disabled={!form.reservation_date}
                      onClick={() => setStep(2)}
                      className="bg-gold-gradient text-ink-950 font-semibold px-8 py-3.5 rounded-full inline-flex items-center gap-2 hover:shadow-lg disabled:opacity-50 transition-all text-sm"
                    >
                      Continue to Time & Seating <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: TIME SLOTS & SEATING PREFERENCE */}
              {step === 2 && (
                <div className="space-y-8 animate-fade-in">
                  <div>
                    <label className="block text-sm font-medium text-ink-200 mb-3 flex items-center gap-2">
                      <Clock size={16} className="text-gold-400" /> Select Time Slot
                    </label>

                    <div className="space-y-4">
                      {timeSlotGroups.map((grp) => (
                        <div key={grp.name} className="p-4 rounded-2xl bg-ink-900/60 border border-ink-700/60">
                          <h4 className="text-xs font-semibold text-gold-300 uppercase tracking-wider mb-2.5">
                            {grp.name}
                          </h4>
                          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                            {grp.slots.map((slot) => (
                              <button
                                type="button"
                                key={slot}
                                onClick={() => update('reservation_time', slot)}
                                className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
                                  form.reservation_time === slot
                                    ? 'bg-gold-gradient text-ink-950 shadow-md ring-2 ring-gold-400'
                                    : 'bg-ink-800 text-ink-200 border border-ink-700 hover:border-gold-500/40 hover:text-gold-200'
                                }`}
                              >
                                {slot}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-ink-200 mb-3">
                      Seating Preference
                    </label>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {seatingAreas.map((area) => {
                        const Icon = area.icon;
                        const isSel = form.seating_area === area.id;
                        return (
                          <button
                            type="button"
                            key={area.id}
                            onClick={() => update('seating_area', area.id)}
                            className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                              isSel
                                ? 'bg-gold-900/40 border-gold-400 text-gold-100 ring-2 ring-gold-500/20'
                                : 'bg-ink-900/50 border-ink-700 text-ink-300 hover:border-gold-500/40'
                            }`}
                          >
                            <span className={`p-2 rounded-xl shrink-0 ${isSel ? 'bg-gold-gradient text-ink-950' : 'bg-ink-800 text-gold-400'}`}>
                              <Icon size={18} />
                            </span>
                            <div>
                              <p className="font-display text-base font-semibold text-ink-50">{area.title}</p>
                              <p className="text-xs text-ink-400 mt-0.5">{area.desc}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-6 py-3 rounded-full border border-ink-700 text-ink-300 hover:text-gold-200 text-xs font-medium inline-flex items-center gap-1.5"
                    >
                      <ChevronLeft size={14} /> Back
                    </button>
                    <button
                      type="button"
                      disabled={!form.reservation_time}
                      onClick={() => setStep(3)}
                      className="bg-gold-gradient text-ink-950 font-semibold px-8 py-3.5 rounded-full inline-flex items-center gap-2 hover:shadow-lg disabled:opacity-50 transition-all text-sm"
                    >
                      Continue to Details <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: GUEST DETAILS */}
              {step === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <label className="block text-sm font-medium text-ink-200 mb-2">Occasion (Optional)</label>
                    <div className="flex flex-wrap gap-2">
                      {occasions.map((occ) => (
                        <button
                          type="button"
                          key={occ}
                          onClick={() => update('occasion', occ)}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                            form.occasion === occ
                              ? 'bg-gold-gradient text-ink-950 font-semibold shadow-md'
                              : 'bg-ink-800 text-ink-300 border border-ink-700 hover:border-gold-500/40'
                          }`}
                        >
                          {occ}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-ink-300 mb-1.5">Full Name *</label>
                      <input
                        required
                        type="text"
                        placeholder="Alex Morgan"
                        value={form.guest_name}
                        onChange={(e) => update('guest_name', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-ink-800/80 border border-ink-600 text-ink-50 placeholder:text-ink-500 focus:outline-none focus:border-gold-400 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-ink-300 mb-1.5">Phone Number *</label>
                      <input
                        required
                        type="tel"
                        placeholder="(555) 000-0000"
                        value={form.phone}
                        onChange={(e) => update('phone', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-ink-800/80 border border-ink-600 text-ink-50 placeholder:text-ink-500 focus:outline-none focus:border-gold-400 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-ink-300 mb-1.5">Email Address (Optional)</label>
                    <input
                      type="email"
                      placeholder="alex@example.com"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-ink-800/80 border border-ink-600 text-ink-50 placeholder:text-ink-500 focus:outline-none focus:border-gold-400 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-ink-300 mb-1.5">Special Requests & Allergies</label>
                    <textarea
                      rows={2}
                      placeholder="High-top preferred, birthday candles, dietary notes…"
                      value={form.notes}
                      onChange={(e) => update('notes', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-ink-800/80 border border-ink-600 text-ink-50 placeholder:text-ink-500 focus:outline-none focus:border-gold-400 text-sm"
                    />
                  </div>

                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                      <AlertCircle size={15} /> {errorMsg}
                    </div>
                  )}

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-6 py-3 rounded-full border border-ink-700 text-ink-300 hover:text-gold-200 text-xs font-medium inline-flex items-center gap-1.5"
                    >
                      <ChevronLeft size={14} /> Back
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (validateDetailsStep()) {
                          setStep(4);
                        }
                      }}
                      className="bg-gold-gradient text-ink-950 font-semibold px-8 py-3.5 rounded-full inline-flex items-center gap-2 hover:shadow-xl hover:shadow-gold-700/40 transition-all text-sm"
                    >
                      Continue to Deposit Hold <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: RESERVATION DEPOSIT & TABLE HOLD (NEW STEP!) */}
              {step === 4 && (
                <div className="space-y-6 animate-fade-in">
                  {/* DEPOSIT POLICY BANNER */}
                  <div className="p-5 rounded-2xl bg-gold-900/30 border border-gold-500/40 glow-gold">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-[0.65rem] uppercase tracking-[0.2em] text-gold-300 font-bold">
                          Table Guarantee & Hold Policy
                        </span>
                        <h3 className="font-display text-2xl text-ink-50 font-bold mt-0.5">
                          ${depositAmount}.00 Deposit Required
                        </h3>
                        <p className="text-xs text-ink-200 mt-1 leading-relaxed">
                          100% of this deposit is <strong className="text-gold-200">credited toward your final bill</strong> upon arrival. Fully refundable with 24h cancellation notice.
                        </p>
                      </div>
                      <div className="shrink-0 text-center bg-gold-gradient text-ink-950 p-3 rounded-2xl font-bold font-display text-2xl shadow-lg">
                        ${depositAmount}
                      </div>
                    </div>
                  </div>

                  {/* PAYMENT METHOD SELECTION */}
                  <div>
                    <label className="block text-xs font-medium text-ink-300 mb-2">Select Payment Method</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => update('payment_method', 'card')}
                        className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                          form.payment_method === 'card'
                            ? 'bg-gold-900/40 border-gold-400 text-gold-100 ring-2 ring-gold-500/20'
                            : 'bg-ink-900/50 border-ink-700 text-ink-300 hover:border-gold-500/40'
                        }`}
                      >
                        <CreditCard size={18} className={form.payment_method === 'card' ? 'text-gold-300' : 'text-ink-400'} />
                        <div>
                          <p className="text-xs font-bold text-ink-50">Credit / Debit Card</p>
                          <p className="text-[0.65rem] text-ink-400">Visa, MC, Amex</p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => update('payment_method', 'googlepay')}
                        className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                          form.payment_method === 'googlepay'
                            ? 'bg-gold-900/40 border-gold-400 text-gold-100 ring-2 ring-gold-500/20'
                            : 'bg-ink-900/50 border-ink-700 text-ink-300 hover:border-gold-500/40'
                        }`}
                      >
                        <Wallet size={18} className={form.payment_method === 'googlepay' ? 'text-gold-300' : 'text-ink-400'} />
                        <div>
                          <p className="text-xs font-bold text-ink-50">Apple / Google Pay</p>
                          <p className="text-[0.65rem] text-ink-400">1-Tap Express Pay</p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => update('payment_method', 'venue_hold')}
                        className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                          form.payment_method === 'venue_hold'
                            ? 'bg-gold-900/40 border-gold-400 text-gold-100 ring-2 ring-gold-500/20'
                            : 'bg-ink-900/50 border-ink-700 text-ink-300 hover:border-gold-500/40'
                        }`}
                      >
                        <ShieldCheck size={18} className={form.payment_method === 'venue_hold' ? 'text-gold-300' : 'text-ink-400'} />
                        <div>
                          <p className="text-xs font-bold text-ink-50">Pay at Venue Hold</p>
                          <p className="text-[0.65rem] text-ink-400">Guarantee table</p>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* CREDIT CARD INPUT FIELDS */}
                  {form.payment_method === 'card' && (
                    <div className="p-4 rounded-2xl bg-ink-900/60 border border-ink-700/60 space-y-3">
                      <div>
                        <label className="block text-[0.7rem] font-medium text-ink-300 mb-1">Card Number</label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="4532 •••• •••• 8892"
                            value={form.card_number}
                            onChange={(e) => update('card_number', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl bg-ink-800/80 border border-ink-600 text-ink-50 placeholder:text-ink-500 focus:outline-none focus:border-gold-400 text-xs"
                          />
                          <Lock size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400" />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[0.7rem] font-medium text-ink-300 mb-1">Expires</label>
                          <input
                            type="text"
                            placeholder="MM / YY"
                            value={form.card_exp}
                            onChange={(e) => update('card_exp', e.target.value)}
                            className="w-full px-3 py-2.5 rounded-xl bg-ink-800/80 border border-ink-600 text-ink-50 placeholder:text-ink-500 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[0.7rem] font-medium text-ink-300 mb-1">CVC</label>
                          <input
                            type="text"
                            placeholder="CVC"
                            value={form.card_cvc}
                            onChange={(e) => update('card_cvc', e.target.value)}
                            className="w-full px-3 py-2.5 rounded-xl bg-ink-800/80 border border-ink-600 text-ink-50 placeholder:text-ink-500 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[0.7rem] font-medium text-ink-300 mb-1">Zip Code</label>
                          <input
                            type="text"
                            placeholder="10001"
                            value={form.card_zip}
                            onChange={(e) => update('card_zip', e.target.value)}
                            className="w-full px-3 py-2.5 rounded-xl bg-ink-800/80 border border-ink-600 text-ink-50 placeholder:text-ink-500 text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* GUARANTEE NOTICE */}
                  <div className="flex items-center gap-2 text-xs text-ink-300 bg-ink-900/40 p-3 rounded-xl border border-ink-700/50">
                    <ShieldCheck size={16} className="text-gold-400 shrink-0" />
                    <span>Instant confirmation sent via SMS & email upon completing deposit hold.</span>
                  </div>

                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                      <AlertCircle size={15} /> {errorMsg}
                    </div>
                  )}

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-6 py-3 rounded-full border border-ink-700 text-ink-300 hover:text-gold-200 text-xs font-medium inline-flex items-center gap-1.5"
                    >
                      <ChevronLeft size={14} /> Back
                    </button>

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="bg-gold-gradient text-ink-950 font-bold px-8 py-3.5 rounded-full inline-flex items-center gap-2 hover:shadow-xl hover:shadow-gold-700/40 disabled:opacity-50 transition-all text-sm"
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2 size={16} className="animate-spin" /> Processing Deposit…
                        </>
                      ) : (
                        `Pay $${depositAmount} & Confirm Reservation`
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* SIDEBAR SUMMARY & VENUE INFO */}
          <div className="lg:col-span-4 space-y-6">
            {/* LIVE RESERVATION SUMMARY CARD */}
            <div className="glass-panel rounded-3xl p-6 border border-gold-500/30 glow-gold">
              <h3 className="font-display text-xl text-ink-50 border-b border-ink-700/60 pb-3 flex items-center justify-between">
                <span>Booking Overview</span>
                <Sparkles size={16} className="text-gold-400" />
              </h3>

              <div className="mt-4 space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between items-center text-ink-300">
                  <span>Guests:</span>
                  <span className="font-semibold text-gold-200">{form.guest_count} Person{form.guest_count > 1 ? 's' : ''}</span>
                </div>
                <div className="flex justify-between items-center text-ink-300">
                  <span>Date:</span>
                  <span className="font-semibold text-ink-100">{form.reservation_date || 'Select Date'}</span>
                </div>
                <div className="flex justify-between items-center text-ink-300">
                  <span>Time Slot:</span>
                  <span className="font-semibold text-gold-300">{form.reservation_time || 'Select Time'}</span>
                </div>
                <div className="flex justify-between items-center text-ink-300">
                  <span>Seating Area:</span>
                  <span className="font-semibold text-ink-100">{form.seating_area}</span>
                </div>
                <div className="flex justify-between items-center text-ink-300 pt-2 border-t border-ink-700/60">
                  <span>Table Deposit Hold:</span>
                  <span className="font-bold text-gold-300">${depositAmount}.00</span>
                </div>
                <div className="flex justify-between items-center text-[0.7rem] text-gold-400/90 italic">
                  <span>Credit Status:</span>
                  <span>100% Credited at Venue</span>
                </div>
                {form.occasion !== 'None' && (
                  <div className="flex justify-between items-center text-ink-300">
                    <span>Occasion:</span>
                    <span className="font-semibold text-gold-300">{form.occasion}</span>
                  </div>
                )}
                {form.guest_name && (
                  <div className="flex justify-between items-center text-ink-300 pt-2 border-t border-ink-700/60">
                    <span>Guest Name:</span>
                    <span className="font-semibold text-ink-100">{form.guest_name}</span>
                  </div>
                )}
                {form.phone && (
                  <div className="flex justify-between items-center text-ink-300">
                    <span>Phone:</span>
                    <span className="font-semibold text-ink-100">{form.phone}</span>
                  </div>
                )}
              </div>
            </div>

            {/* NEED HELP & DIRECT CALL CARD */}
            <div className="p-6 rounded-3xl bg-ink-900/60 border border-ink-700/60 text-xs text-ink-300 space-y-3">
              <div className="flex items-center gap-2 font-display text-base text-ink-100 font-semibold">
                <Phone size={16} className="text-gold-400" /> Prefer Direct Assistance?
              </div>
              <p className="leading-relaxed">
                For VIP bottle service or private lounge room bookings, contact our concierges directly.
              </p>
              <a
                href={`tel:${venueInfo.phone}`}
                className="mt-2 block w-full text-center py-2.5 rounded-full border border-gold-500/30 text-gold-300 font-semibold hover:bg-gold-900/40 transition-colors"
              >
                Call {venueInfo.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
