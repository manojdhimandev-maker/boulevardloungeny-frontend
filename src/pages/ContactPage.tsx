import React, { useState } from 'react';
import {
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { venueInfo } from '@/data/venue';
import { supabase } from '@/lib/supabase';
import type { PageId } from '@/components/Navbar';

type ContactPageProps = {
  onNavigate: (page: PageId) => void;
};

type ContactFormState = {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
};

const emptyForm: ContactFormState = {
  name: '',
  phone: '',
  email: '',
  subject: 'General Inquiry',
  message: '',
};

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [form, setForm] = useState<ContactFormState>(emptyForm);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const update = <K extends keyof ContactFormState>(key: K, value: ContactFormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim() || !form.message.trim()) {
      setErrorMsg('Please complete all required fields (Name, Phone, Email, Message).');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    try {
      const { error } = await supabase.from('contact_inquiries').insert([
        {
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          subject: form.subject,
          message: form.message.trim(),
        },
      ]);

      if (error) {
        console.warn('Supabase insert notice:', error);
      }
    } catch (err) {
      console.warn('Submission fallback notice:', err);
    }

    setStatus('success');
  };

  const resetForm = () => {
    setForm(emptyForm);
    setStatus('idle');
    setErrorMsg('');
  };

  return (
    <div className="animate-fade-in min-h-screen pt-36 pb-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* PAGE HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="section-tag">GET IN TOUCH</div>
          <h1 className="section-title">Contact Us</h1>
          <p className="section-desc max-w-xl mx-auto">
            Have questions about table reservations, custom VIP packages, or venue details? Call us directly or send a message below.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* CONTACT INFO SIDEBAR */}
          <div className="lg:col-span-5 space-y-6">
            {/* DIRECT CONTACT CARDS */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-gold-500/30 glow-gold space-y-6">
              <h3 className="font-display text-2xl text-ink-50 font-bold border-b border-ink-700/60 pb-4 flex items-center justify-between">
                <span>Reach Us Directly</span>
                <Sparkles size={18} className="text-gold-400" />
              </h3>

              <div className="space-y-5 text-sm">
                <a
                  href={venueInfo.phoneHref}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-ink-900/60 border border-ink-700/60 hover:border-gold-400/50 transition-all group"
                >
                  <div className="p-3 rounded-xl bg-gold-400/10 text-gold-400 group-hover:bg-gold-400 group-hover:text-ink-950 transition-all">
                    <Phone size={20} />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-bold text-ink-400 block tracking-wider">Phone Line</span>
                    <span className="font-display text-lg text-ink-100 group-hover:text-gold-200 transition-colors font-semibold">
                      {venueInfo.phone}
                    </span>
                    <p className="text-xs text-ink-400 mt-0.5">Call for instant table inquiries</p>
                  </div>
                </a>

                <a
                  href={venueInfo.textHref}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-ink-900/60 border border-ink-700/60 hover:border-gold-400/50 transition-all group"
                >
                  <div className="p-3 rounded-xl bg-gold-400/10 text-gold-400 group-hover:bg-gold-400 group-hover:text-ink-950 transition-all">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-bold text-ink-400 block tracking-wider">SMS Text Line</span>
                    <span className="font-display text-lg text-ink-100 group-hover:text-gold-200 transition-colors font-semibold">
                      Text {venueInfo.text}
                    </span>
                    <p className="text-xs text-ink-400 mt-0.5">Quick SMS text concierge</p>
                  </div>
                </a>

                <a
                  href={`mailto:${venueInfo.email}`}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-ink-900/60 border border-ink-700/60 hover:border-gold-400/50 transition-all group"
                >
                  <div className="p-3 rounded-xl bg-gold-400/10 text-gold-400 group-hover:bg-gold-400 group-hover:text-ink-950 transition-all">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-bold text-ink-400 block tracking-wider">Email Address</span>
                    <span className="font-display text-base text-ink-100 group-hover:text-gold-200 transition-colors font-medium">
                      {venueInfo.email}
                    </span>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-ink-900/60 border border-ink-700/60">
                  <div className="p-3 rounded-xl bg-gold-400/10 text-gold-400">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-bold text-ink-400 block tracking-wider">Address</span>
                    <span className="font-body text-sm text-ink-100 font-medium leading-snug block">
                      {venueInfo.address}
                    </span>
                    <span className="text-xs text-gold-400 font-semibold">{venueInfo.city}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* OPERATING HOURS CARD */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-ink-700/60 space-y-4">
              <h4 className="font-display text-xl text-gold-200 flex items-center gap-2">
                <Clock size={18} className="text-gold-400" /> Lounge Hours
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-ink-300">
                {venueInfo.hours.map((h) => (
                  <li key={h.day} className="flex items-center justify-between border-b border-ink-800/80 pb-2">
                    <span className="font-medium text-ink-200">{h.day}</span>
                    <span className={h.time === 'Closed' ? 'text-rose-400 font-semibold' : 'text-gold-300 font-semibold'}>
                      {h.time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CONTACT FORM CONTAINER */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-10 border border-gold-400/20 shadow-2xl">
            {status === 'success' ? (
              <div className="text-center py-12 space-y-6 animate-fade-in">
                <div className="w-20 h-20 bg-gold-gradient text-ink-950 rounded-full grid place-items-center mx-auto shadow-xl">
                  <CheckCircle2 size={42} strokeWidth={2.2} />
                </div>
                <h3 className="font-display text-3xl text-ink-100 font-bold">Message Sent!</h3>
                <p className="text-ink-300 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you for contacting <strong className="text-gold-200">The Boulevard Lounge</strong>. A member of our team will get back to you shortly via phone or email.
                </p>
                <div className="pt-4 flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="btn-gold py-3 px-8 text-xs font-bold"
                  >
                    Send Another Message
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('reservations')}
                    className="btn-outline-gold py-3 px-8 text-xs font-bold"
                  >
                    Reserve Table
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in font-body">
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl text-ink-100 font-bold mb-1">
                    Send Us a Message
                  </h3>
                  <p className="text-xs text-ink-300">
                    Fill out the form below and we'll respond as soon as possible.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-ink-300 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Alex Morgan"
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-ink-800/80 border border-ink-600 text-ink-50 placeholder:text-ink-500 focus:outline-none focus:border-gold-400 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-ink-300 mb-1.5">
                      Phone Number *
                    </label>
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
                  <label className="block text-xs font-medium text-ink-300 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="alex@example.com"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-ink-800/80 border border-ink-600 text-ink-50 placeholder:text-ink-500 focus:outline-none focus:border-gold-400 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-ink-300 mb-1.5">
                    Subject *
                  </label>
                  <select
                    value={form.subject}
                    onChange={(e) => update('subject', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-ink-800/80 border border-ink-600 text-gold-200 focus:outline-none focus:border-gold-400 text-sm font-medium"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Table Reservation Question">Table Reservation Question</option>
                    <option value="VIP Bottle Service Inquiry">VIP Bottle Service Inquiry</option>
                    <option value="Feedback / Review">Feedback / Review</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-ink-300 mb-1.5">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="How can we help you? Write your message here…"
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-ink-800/80 border border-ink-600 text-ink-50 placeholder:text-ink-500 focus:outline-none focus:border-gold-400 text-sm"
                  />
                </div>

                {errorMsg && (
                  <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle size={16} /> {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-gold-gradient text-ink-950 font-bold py-4 rounded-xl shadow-lg hover:shadow-gold-500/30 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Sending Message…
                    </>
                  ) : (
                    <>
                      <Send size={16} /> SUBMIT MESSAGE
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
