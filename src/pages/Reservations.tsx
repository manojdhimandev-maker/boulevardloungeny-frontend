import { useState } from 'react';
import {
  CalendarDays,
  Clock,
  Users,
  Phone,
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
  Settings,
  X,
  Check,
  Info,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { venueInfo } from '@/data/venue';
import { createGoogleCalendarUrl } from '@/lib/googleCalendar';
import { syncToOwnerGoogleCalendar } from '@/lib/googleCalendarOwnerSync';
import {
  checkDepositRequirement,
  defaultDepositPolicy,
  type DepositPolicy,
} from '@/data/reservationConfig';

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
    name: 'Happy Hour (5:00 PM – 9:00 PM)',
    slots: ['5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM'],
  },
  {
    name: 'Prime Dinner & Lounge (9:00 PM – Close)',
    slots: ['9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM'],
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

const weekDaysList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function Reservations() {
  const [step, setStep] = useState<number>(1);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [showManagerModal, setShowManagerModal] = useState(false);

  // User manual deposit toggle on Step 4 (null = default policy recommendation, true = with deposit, false = without deposit)
  const [userWantsDeposit, setUserWantsDeposit] = useState<boolean | null>(null);

  // Dynamic deposit policy state (persisted locally)
  const [depositPolicy, setDepositPolicy] = useState<DepositPolicy>(() => {
    try {
      const saved = localStorage.getItem('boulevard_deposit_policy');
      return saved ? JSON.parse(saved) : defaultDepositPolicy;
    } catch {
      return defaultDepositPolicy;
    }
  });

  const today = new Date().toISOString().split('T')[0];
  const hasSelectedDate = Boolean(form.reservation_date);

  // Evaluate deposit requirement dynamically based on date & party size
  const depositResult = hasSelectedDate
    ? checkDepositRequirement(form.reservation_date, form.guest_count, undefined, depositPolicy)
    : { isRequired: false, amount: 0, reason: 'Select a date to verify deposit requirement.' };

  const defaultDepositAmount = depositResult.amount || 50;
  const isDepositRecommended = hasSelectedDate && depositResult.isRequired;

  // Active deposit decision: user override or recommended policy default
  const activeDeposit = userWantsDeposit !== null ? userWantsDeposit : isDepositRecommended;
  const finalDepositAmount = activeDeposit ? defaultDepositAmount : 0;

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const updatePolicy = (updater: (prev: DepositPolicy) => DepositPolicy) => {
    setDepositPolicy((prev) => {
      const next = updater(prev);
      try {
        localStorage.setItem('boulevard_deposit_policy', JSON.stringify(next));
      } catch (e) {
        console.warn('Could not save deposit policy:', e);
      }
      return next;
    });
  };

  const toggleDayDeposit = (day: string) => {
    updatePolicy((prev) => {
      const exists = prev.requiredDays.includes(day);
      const nextDays = exists
        ? prev.requiredDays.filter((d) => d !== day)
        : [...prev.requiredDays, day];
      return { ...prev, requiredDays: nextDays };
    });
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
      `Deposit Choice: ${activeDeposit ? `$${finalDepositAmount} Hold (${form.payment_method})` : 'Booked Without Deposit ($0)'}`,
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

    try {
      const { error } = await supabase.from('reservations').insert(payload);
      if (error) {
        console.warn('Supabase insert notice:', error);
      }
    } catch (err) {
      console.warn('Supabase request notice:', err);
    }

    // Automatically push reservation to Lounge Owner's Master Google Calendar
    syncToOwnerGoogleCalendar({
      type: 'reservation',
      guestName: form.guest_name,
      phone: form.phone,
      email: form.email,
      date: form.reservation_date,
      time: form.reservation_time,
      guestCount: form.guest_count,
      seatingArea: form.seating_area,
      occasion: form.occasion,
      depositStatus: activeDeposit ? `$${finalDepositAmount} Hold (${form.payment_method})` : 'No Deposit ($0)',
      notes: form.notes,
    });

    setStatus('success');
  };

  const reset = () => {
    setForm(emptyForm);
    setStep(1);
    setStatus('idle');
    setErrorMsg('');
    setUserWantsDeposit(null);
  };

  const googleCalendarUrl = () => {
    if (!form.reservation_date || !form.reservation_time) return '#';
    return createGoogleCalendarUrl({
      guestName: form.guest_name,
      phone: form.phone,
      email: form.email,
      date: form.reservation_date,
      time: form.reservation_time,
      guestCount: form.guest_count,
      seatingArea: form.seating_area,
      occasion: form.occasion,
      notes: form.notes,
    });
  };

  if (status === 'success') {
    return (
      <div className="animate-fade-in min-h-screen pt-36 pb-20 flex items-center justify-center">
        <div className="mx-auto max-w-xl px-5 w-full text-center">
          <div className="glass-panel p-10 sm:p-12 rounded-3xl border border-gold-500/30 glow-gold shadow-2xl relative overflow-hidden">
            <div className="w-20 h-20 bg-gold-gradient rounded-full grid place-items-center mx-auto mb-6 text-ink-950 shadow-xl shadow-gold-500/20">
              <CheckCircle2 size={42} strokeWidth={2.2} />
            </div>

            <h2 className="font-display text-3xl sm:text-4xl text-ink-100 font-bold tracking-tight">
              Table Reserved!
            </h2>
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
                <span className="font-bold text-gold-300">
                  {activeDeposit ? `$${finalDepositAmount}.00 (100% Credited)` : '$0.00 (Booked Without Deposit)'}
                </span>
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
            { num: 4, label: activeDeposit ? 'Deposit Hold' : 'Confirmation' },
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

        {/* SINGLE UNIFIED RESERVATION CONTAINER */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* MAIN FORM PANEL */}
          <div className="lg:col-span-8 glass-panel rounded-2xl p-6 sm:p-10 border border-gold-400/20 shadow-xl">
            <form onSubmit={submit}>
              {/* STEP 1: DATE & GUEST COUNT */}
              {step === 1 && (
                <div className="space-y-8 animate-fade-in font-body">
                  <div>
                    <label className="block text-xs uppercase font-semibold tracking-wider text-gold-400 mb-3 flex items-center gap-2">
                      <Users size={16} className="text-gold-400" /> How many guests in your party?
                    </label>
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <button
                          type="button"
                          key={num}
                          onClick={() => update('guest_count', num)}
                          className={`py-3 rounded-xl font-display text-lg font-light transition-all ${
                            form.guest_count === num
                              ? 'bg-gold-400 text-ink-950 shadow-md font-normal scale-[1.02]'
                              : 'bg-ink-900/60 border border-ink-700 text-ink-200 hover:border-gold-400/50'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-semibold tracking-wider text-gold-400 mb-3 flex items-center gap-2">
                      <CalendarDays size={16} className="text-gold-400" /> Select Reservation Date
                    </label>
                    <input
                      type="date"
                      min={today}
                      value={form.reservation_date}
                      onChange={(e) => update('reservation_date', e.target.value)}
                      className="w-full px-5 py-4 rounded-xl bg-ink-800/80 border border-ink-600 text-ink-50 font-display text-lg focus:outline-none focus:border-gold-400 transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-semibold tracking-wider text-gold-400 mb-3 flex items-center gap-2">
                      <Sparkles size={16} className="text-gold-400" /> Select Experience / Event Type
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: 'standard', title: 'Standard Lounge & Dining', tag: '✨ No Deposit Required', deposit: false, desc: 'Casual drinks, brunch & dinner' },
                        { id: 'weekend-dj', title: 'Friday / Saturday DJ Night', tag: '⚡ $50 Deposit Hold', deposit: true, desc: 'Peak nightlife & resident DJs' },
                        { id: 'vip-party', title: 'VIP Special Event', tag: '⚡ $50 Deposit Hold', deposit: true, desc: 'Bottle service & VIP booths' },
                      ].map((evt) => {
                        const selected = form.occasion === evt.title || (evt.id === 'standard' && (form.occasion === 'None' || form.occasion === 'Standard Lounge & Dining'));
                        return (
                          <button
                            type="button"
                            key={evt.id}
                            onClick={() => {
                              update('occasion', evt.title);
                              setUserWantsDeposit(evt.deposit);
                            }}
                            className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                              selected
                                ? 'bg-gold-900/40 border-gold-400 text-gold-100 ring-2 ring-gold-500/20'
                                : 'bg-ink-900/50 border-ink-700 text-ink-300 hover:border-gold-500/40'
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <span className="font-semibold text-xs text-ink-100">{evt.title}</span>
                              </div>
                              <p className="text-[11px] text-ink-400 leading-snug">{evt.desc}</p>
                            </div>
                            <span className={`inline-block mt-3 text-[10px] font-bold px-2 py-0.5 rounded-full border self-start ${
                              evt.deposit
                                ? 'bg-gold-400/20 text-gold-300 border-gold-400/40'
                                : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            }`}>
                              {evt.tag}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* DYNAMIC POLICY NOTIFICATION BANNER */}
                  {hasSelectedDate && (
                    <div className={`p-4 rounded-xl border text-xs flex items-center justify-between gap-3 ${
                      isDepositRecommended
                        ? 'bg-gold-950/40 border-gold-500/40 text-gold-200'
                        : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                    }`}>
                      <div className="flex items-center gap-2">
                        <Info size={16} className="shrink-0" />
                        <span>{depositResult.reason}</span>
                      </div>
                      <span className="font-bold shrink-0">
                        {isDepositRecommended ? `$${defaultDepositAmount} Hold` : 'No Deposit Required'}
                      </span>
                    </div>
                  )}

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        if (!form.reservation_date) {
                          setErrorMsg('Please choose a reservation date.');
                          return;
                        }
                        setErrorMsg('');
                        setStep(2);
                      }}
                      className="btn-gold py-3.5 px-8 text-xs tracking-[0.2em] uppercase font-semibold rounded-sm shadow-md inline-flex items-center gap-2"
                    >
                      CONTINUE TO TIME SLOT <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: TIME & SEATING AREA */}
              {step === 2 && (
                <div className="space-y-8 animate-fade-in font-body">
                  <div>
                    <label className="block text-xs uppercase font-semibold tracking-wider text-gold-400 mb-3 flex items-center gap-2">
                      <Clock size={16} className="text-gold-400" /> Select Time Slot
                    </label>
                    <div className="space-y-4">
                      {timeSlotGroups.map((group) => (
                        <div key={group.name} className="space-y-2">
                          <span className="text-[11px] font-semibold text-ink-400 uppercase tracking-wider block">
                            {group.name}
                          </span>
                          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                            {group.slots.map((slot) => (
                              <button
                                type="button"
                                key={slot}
                                onClick={() => update('reservation_time', slot)}
                                className={`py-2.5 px-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                                  form.reservation_time === slot
                                    ? 'bg-gold-gradient text-ink-950 shadow-md scale-[1.02]'
                                    : 'bg-ink-900/60 border border-ink-700/60 text-ink-200 hover:border-gold-400/50'
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
                    <label className="block text-xs uppercase font-semibold tracking-wider text-gold-400 mb-3">
                      Select Preferred Seating Atmosphere
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {seatingAreas.map((area) => {
                        const Icon = area.icon;
                        const selected = form.seating_area === area.id;
                        return (
                          <div
                            key={area.id}
                            onClick={() => update('seating_area', area.id)}
                            className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                              selected
                                ? 'bg-gold-900/40 border-gold-400 text-gold-100 ring-2 ring-gold-500/20'
                                : 'bg-ink-900/50 border-ink-700 text-ink-300 hover:border-gold-500/40'
                            }`}
                          >
                            <div className={`p-2.5 rounded-xl ${selected ? 'bg-gold-400 text-ink-950' : 'bg-ink-800 text-gold-400'}`}>
                              <Icon size={20} />
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-ink-100">{area.title}</h4>
                              <p className="text-xs text-ink-400 mt-0.5">{area.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                      <AlertCircle size={15} /> {errorMsg}
                    </div>
                  )}

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
                      onClick={() => {
                        if (!form.reservation_time) {
                          setErrorMsg('Please pick a time slot for your table.');
                          return;
                        }
                        setErrorMsg('');
                        setStep(3);
                      }}
                      className="btn-gold py-3.5 px-8 text-xs tracking-[0.2em] uppercase font-semibold rounded-sm shadow-md inline-flex items-center gap-2"
                    >
                      CONTINUE TO DETAILS <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: CONTACT & OCCASION DETAILS */}
              {step === 3 && (
                <div className="space-y-6 animate-fade-in font-body">
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-ink-300 mb-1.5">Phone Number (SMS Confirmation) *</label>
                      <input
                        required
                        type="tel"
                        placeholder="(555) 000-0000"
                        value={form.phone}
                        onChange={(e) => update('phone', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-ink-800/80 border border-ink-600 text-ink-50 placeholder:text-ink-500 focus:outline-none focus:border-gold-400 text-sm"
                      />
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
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-ink-300 mb-1.5">Select Special Occasion</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {occasions.map((occ) => (
                        <button
                          key={occ}
                          type="button"
                          onClick={() => update('occasion', occ)}
                          className={`p-3 rounded-xl border text-xs font-medium text-left transition-all ${
                            form.occasion === occ
                              ? 'bg-gold-400/20 border-gold-400 text-gold-200 font-semibold'
                              : 'bg-ink-900/60 border-ink-700/60 text-ink-300 hover:border-ink-500'
                          }`}
                        >
                          {occ}
                        </button>
                      ))}
                    </div>
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
                      className="btn-gold py-3.5 px-8 text-xs tracking-[0.2em] uppercase font-semibold rounded-sm shadow-md inline-flex items-center gap-2"
                    >
                      CONTINUE TO FINAL STEP <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: RESERVATION DEPOSIT OPTION & CONFIRMATION */}
              {step === 4 && (
                <div className="space-y-6 animate-fade-in">
                  {/* STEP 4 DEPOSIT TOGGLE SELECTION BOX */}
                  <div className="p-5 rounded-2xl bg-ink-900/90 border border-gold-400/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase font-bold tracking-wider text-gold-400 flex items-center gap-2">
                        <ShieldCheck size={16} className="text-gold-400" /> Deposit Options (Optional Toggle)
                      </span>
                      <span className="text-[11px] text-ink-300">Choose to book with or without deposit</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {/* OPTION 1: WITH DEPOSIT */}
                      <button
                        type="button"
                        onClick={() => setUserWantsDeposit(true)}
                        className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                          activeDeposit
                            ? 'bg-gold-900/40 border-gold-400 text-gold-100 ring-2 ring-gold-500/20 shadow-lg'
                            : 'bg-ink-950/60 border-ink-700/60 text-ink-300 hover:border-gold-500/40'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-sm text-ink-50">Pay Deposit Hold</span>
                            <span className="text-xs font-bold text-gold-300">${defaultDepositAmount}.00</span>
                          </div>
                          <p className="text-[11px] text-ink-300 leading-snug">
                            Guarantees priority VIP table hold. 100% credited toward your food & drinks bill upon arrival.
                          </p>
                        </div>
                        <div className="mt-3 flex items-center gap-1.5 text-[10px] text-gold-300 font-semibold uppercase tracking-wider">
                          {activeDeposit ? '✓ Selected (With Deposit)' : 'Select Deposit Hold'}
                        </div>
                      </button>

                      {/* OPTION 2: WITHOUT DEPOSIT */}
                      <button
                        type="button"
                        onClick={() => setUserWantsDeposit(false)}
                        className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                          !activeDeposit
                            ? 'bg-emerald-950/40 border-emerald-500 text-emerald-100 ring-2 ring-emerald-500/20 shadow-lg'
                            : 'bg-ink-950/60 border-ink-700/60 text-ink-300 hover:border-emerald-500/40'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-sm text-ink-50">Book Without Deposit</span>
                            <span className="text-xs font-bold text-emerald-300">FREE ($0)</span>
                          </div>
                          <p className="text-[11px] text-ink-300 leading-snug">
                            Standard table booking. Instant confirmation with zero upfront payment required.
                          </p>
                        </div>
                        <div className="mt-3 flex items-center gap-1.5 text-[10px] text-emerald-300 font-semibold uppercase tracking-wider">
                          {!activeDeposit ? '✓ Selected (Without Deposit)' : 'Select Without Deposit'}
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* BANNER BASED ON SELECTION */}
                  {activeDeposit ? (
                    <div className="p-5 rounded-2xl bg-gold-900/30 border border-gold-500/40 glow-gold">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-gold-300 font-bold">
                            Table Guarantee & Deposit Hold
                          </span>
                          <h3 className="font-display text-2xl text-ink-50 font-bold mt-0.5">
                            ${defaultDepositAmount}.00 Deposit Selected
                          </h3>
                          <p className="text-xs text-ink-200 mt-1 leading-relaxed">
                            100% of this deposit is <strong className="text-gold-200">credited toward your final bill</strong> upon arrival. Fully refundable with 24h cancellation notice.
                          </p>
                        </div>
                        <div className="shrink-0 text-center bg-gold-gradient text-ink-950 p-3 rounded-2xl font-bold font-display text-2xl shadow-lg">
                          ${defaultDepositAmount}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 glow-emerald">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-emerald-300 font-bold">
                            Free Reservation Selected
                          </span>
                          <h3 className="font-display text-2xl text-ink-50 font-bold mt-0.5">
                            Booked Without Deposit ($0)
                          </h3>
                          <p className="text-xs text-ink-200 mt-1 leading-relaxed">
                            No upfront payment required. Your table will be held for 15 minutes past your arrival time.
                          </p>
                        </div>
                        <div className="shrink-0 text-center bg-emerald-500 text-ink-950 p-3 rounded-2xl font-bold font-display text-xl shadow-lg">
                          FREE
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PAYMENT METHOD SELECTION (ONLY SHOWN IF USER CHOSE WITH DEPOSIT) */}
                  {activeDeposit ? (
                    <>
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
                                placeholder="10301"
                                value={form.card_zip}
                                onChange={(e) => update('card_zip', e.target.value)}
                                className="w-full px-3 py-2.5 rounded-xl bg-ink-800/80 border border-ink-600 text-ink-50 placeholder:text-ink-500 text-xs"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="p-4 rounded-2xl bg-ink-900/60 border border-ink-700/60 space-y-2 text-xs text-ink-200">
                      <p className="font-semibold text-emerald-300 flex items-center gap-2">
                        <CheckCircle2 size={16} /> Instant Free Confirmation
                      </p>
                      <p>
                        No credit card or deposit is needed for this reservation option. Click below to complete your table booking.
                      </p>
                    </div>
                  )}

                  {/* GUARANTEE NOTICE */}
                  <div className="flex items-center gap-2 text-xs text-ink-300 bg-ink-900/40 p-3 rounded-xl border border-ink-700/50">
                    <ShieldCheck size={16} className="text-gold-400 shrink-0" />
                    <span>Instant confirmation sent via SMS & email upon completing reservation.</span>
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
                      className="btn-gold py-4 px-10 text-xs tracking-[0.2em] uppercase font-semibold rounded-sm shadow-lg inline-flex items-center gap-2 disabled:opacity-50 transition-all"
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2 size={16} className="animate-spin" /> PROCESSING...
                        </>
                      ) : activeDeposit ? (
                        `PAY $${defaultDepositAmount} & CONFIRM`
                      ) : (
                        `RESERVE A TABLE`
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
            <div className="glass-panel rounded-2xl p-6 border border-gold-500/30 glow-gold">
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
                  <span className={`font-bold ${
                    !hasSelectedDate
                      ? 'text-ink-400 font-normal'
                      : activeDeposit
                      ? 'text-gold-300'
                      : 'text-emerald-300'
                  }`}>
                    {!hasSelectedDate
                      ? 'Select Date'
                      : activeDeposit
                      ? `$${defaultDepositAmount}.00 (100% Credited)`
                      : '$0.00 (Booked Without Deposit)'}
                  </span>
                </div>
              </div>

              <div className="mt-5 p-3.5 rounded-2xl bg-ink-900/60 border border-ink-700/50 flex items-start gap-2.5 text-xs text-ink-300">
                <ShieldCheck size={16} className="text-gold-400 shrink-0 mt-0.5" />
                <span>
                  {!hasSelectedDate
                    ? 'Pick your reservation date to view table hold & deposit options.'
                    : activeDeposit
                    ? '100% credited towards your food & drinks bill upon arrival.'
                    : 'Instant table hold with zero upfront deposit required.'}
                </span>
              </div>
            </div>

            {/* NEED HELP & CONTACT CARD */}
            <div className="glass-panel rounded-2xl p-6 border border-ink-700/60 space-y-4">
              <h4 className="font-display text-lg text-gold-200">Large Groups & Special Events?</h4>
              <p className="text-xs text-ink-300 leading-relaxed">
                For parties larger than 12 guests or custom VIP lounge packages, call our venue concierge directly.
              </p>
              <div className="pt-2 space-y-2 text-xs">
                <a
                  href={venueInfo.phoneHref}
                  className="flex items-center gap-2.5 text-gold-300 hover:text-gold-100 transition-colors font-medium"
                >
                  <Phone size={14} /> Call Concierge: {venueInfo.phone}
                </a>
                <a
                  href={venueInfo.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-ink-300 hover:text-gold-200 transition-colors"
                >
                  <MapPin size={14} className="text-gold-400" /> {venueInfo.address}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DISCRETE FLOATING MANAGER CONFIG BUTTON (BOTTOM-RIGHT) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => setShowManagerModal(true)}
          className="bg-ink-900/90 hover:bg-ink-800 text-gold-300 border border-gold-500/40 hover:border-gold-400 px-4 py-2.5 rounded-full shadow-2xl backdrop-blur-xl flex items-center gap-2 text-xs font-medium transition-all"
        >
          <Settings size={15} />
          <span>Deposit Rules Settings</span>
        </button>
      </div>

      {/* MANAGER CONFIGURATION MODAL */}
      {showManagerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/80 backdrop-blur-md animate-fade-in">
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-gold-400/40 max-w-lg w-full shadow-2xl relative space-y-5">
            <button
              onClick={() => setShowManagerModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-ink-400 hover:text-gold-200 hover:bg-ink-800/80 transition-colors"
            >
              <X size={20} />
            </button>

            <div>
              <div className="flex items-center gap-2 text-gold-400 font-bold text-xs uppercase tracking-wider mb-1">
                <Settings size={16} /> Venue Manager Controls
              </div>
              <h3 className="font-display text-2xl text-ink-100 font-bold">
                Configure Deposit Rules
              </h3>
              <p className="text-xs text-ink-300 mt-1">
                Toggle deposit requirements on/off by day of the week, party size, or global master switch.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between bg-ink-900/80 p-3.5 rounded-2xl border border-ink-700/60">
                <div>
                  <span className="font-bold text-ink-100 block">Master Deposit Switch</span>
                  <span className="text-ink-400 text-[11px]">Globally turn deposits on or off</span>
                </div>
                <button
                  type="button"
                  onClick={() => updatePolicy((p) => ({ ...p, enabledGlobal: !p.enabledGlobal }))}
                  className={`px-4 py-2 rounded-xl font-bold transition-all ${
                    depositPolicy.enabledGlobal
                      ? 'bg-gold-400 text-ink-950 shadow-md'
                      : 'bg-ink-800 text-ink-400 border border-ink-700'
                  }`}
                >
                  {depositPolicy.enabledGlobal ? 'ENABLED' : 'DISABLED'}
                </button>
              </div>

              <div>
                <label className="block font-bold text-gold-300 mb-2 uppercase tracking-wider text-[10px]">
                  Days Requiring Reservation Deposit
                </label>
                <div className="flex flex-wrap gap-2">
                  {weekDaysList.map((day) => {
                    const active = depositPolicy.requiredDays.includes(day);
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleDayDeposit(day)}
                        className={`px-3.5 py-2 rounded-xl border font-medium transition-all flex items-center gap-1.5 ${
                          active
                            ? 'bg-gold-400/20 border-gold-400 text-gold-200'
                            : 'bg-ink-900/60 border-ink-700 text-ink-400 hover:border-ink-500'
                        }`}
                      >
                        {active && <Check size={12} className="text-gold-300" />}
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between bg-ink-900/80 p-3.5 rounded-2xl border border-ink-700/60">
                <div>
                  <span className="font-bold text-ink-100 block">Mandatory Large Party Threshold</span>
                  <span className="text-ink-400 text-[11px]">Parties equal to or larger always require deposit</span>
                </div>
                <select
                  value={depositPolicy.minPartySizeForMandatoryDeposit}
                  onChange={(e) =>
                    updatePolicy((p) => ({
                      ...p,
                      minPartySizeForMandatoryDeposit: parseInt(e.target.value, 10),
                    }))
                  }
                  className="bg-ink-800 border border-ink-600 text-gold-200 px-3 py-2 rounded-xl font-medium text-xs focus:outline-none"
                >
                  <option value={4}>4+ Guests</option>
                  <option value={6}>6+ Guests</option>
                  <option value={8}>8+ Guests</option>
                  <option value={10}>10+ Guests</option>
                </select>
              </div>
            </div>

            <div className="pt-3 flex justify-end">
              <button
                type="button"
                onClick={() => setShowManagerModal(false)}
                className="bg-gold-gradient text-ink-950 font-bold px-6 py-2.5 rounded-full text-xs"
              >
                Apply & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
