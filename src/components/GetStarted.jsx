import React, { useState, useEffect } from 'react';
import { X, CheckCircle, User, Phone, Mail, Briefcase, Calendar } from 'lucide-react';

function BookingModal({ onClose }) {
  const [step, setStep] = useState('form'); // 'form' | 'success'
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [errors, setErrors] = useState({});

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const services = [
    'Company Formation (LLC)',
    'Freezone Setup',
    'Mainland Licensing',
    'PRO & Visa Services',
    'Bank Account Opening',
    'Business Consulting',
    'Other',
  ];

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required.';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email is required.';
    if (!form.phone.trim()) e.phone = 'Phone number is required.';
    if (!form.service) e.service = 'Please select a service.';
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setStep('success');
  };

  const change = (field) => (ev) => {
    setForm(prev => ({ ...prev, [field]: ev.target.value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const inputBase =
    'w-full bg-white/5 border rounded-xl px-4 py-3 text-ivory text-sm placeholder-ivory/30 focus:outline-none focus:ring-1 focus:ring-champagne transition-all duration-200';

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full max-w-lg bg-[#13131a] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        style={{ animation: 'modal-in 0.35s cubic-bezier(0.34,1.56,0.64,1) both' }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-ivory/40 hover:text-ivory transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <div className="p-8 md:p-10">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-champagne" />
                <span className="text-xs font-mono text-champagne uppercase tracking-widest">Book a Consultation</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-sans font-bold text-ivory tracking-tight">
                Let's build your <span className="font-serif italic text-champagne">business.</span>
              </h3>
              <p className="text-ivory/50 text-sm mt-2 leading-relaxed">
                Fill in your details and our team will reach out within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
              {/* Name */}
              <div>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ivory/30" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={change('name')}
                    className={`${inputBase} pl-10 ${errors.name ? 'border-red-500/60' : 'border-white/10'}`}
                  />
                </div>
                {errors.name && <p className="text-red-400 text-xs mt-1 pl-1">{errors.name}</p>}
              </div>

              {/* Email + Phone side by side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ivory/30" />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={form.email}
                      onChange={change('email')}
                      className={`${inputBase} pl-10 ${errors.email ? 'border-red-500/60' : 'border-white/10'}`}
                    />
                  </div>
                  {errors.email && <p className="text-red-400 text-xs mt-1 pl-1">{errors.email}</p>}
                </div>
                <div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ivory/30" />
                    <input
                      type="tel"
                      placeholder="Phone / WhatsApp"
                      value={form.phone}
                      onChange={change('phone')}
                      className={`${inputBase} pl-10 ${errors.phone ? 'border-red-500/60' : 'border-white/10'}`}
                    />
                  </div>
                  {errors.phone && <p className="text-red-400 text-xs mt-1 pl-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Service */}
              <div>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ivory/30 pointer-events-none" />
                  <select
                    value={form.service}
                    onChange={change('service')}
                    className={`${inputBase} pl-10 appearance-none cursor-pointer ${errors.service ? 'border-red-500/60' : 'border-white/10'}`}
                    style={{ background: '#1a1a24' }}
                  >
                    <option value="" disabled>Select a Service</option>
                    {services.map(s => (
                      <option key={s} value={s} style={{ background: '#1a1a24', color: '#faf8f5' }}>{s}</option>
                    ))}
                  </select>
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ivory/30 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {errors.service && <p className="text-red-400 text-xs mt-1 pl-1">{errors.service}</p>}
              </div>

              {/* Message */}
              <textarea
                placeholder="Brief description of your requirements (optional)"
                value={form.message}
                onChange={change('message')}
                rows={3}
                className={`${inputBase} border-white/10 resize-none`}
              />

              {/* Submit */}
              <button
                type="submit"
                className="group relative overflow-hidden w-full bg-champagne text-obsidian py-4 rounded-xl font-bold text-base tracking-wide hover:scale-[1.02] transition-transform mt-2"
                style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
              >
                <span className="relative z-10">Book My Consultation →</span>
                <span className="absolute inset-0 bg-white/25 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
              </button>

              <p className="text-center text-ivory/30 text-xs mt-1">
                No spam. We'll only contact you regarding your enquiry.
              </p>
            </form>
          </div>
        ) : (
          /* Success state */
          <div className="p-10 flex flex-col items-center text-center min-h-[420px] justify-center">
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-full bg-champagne/10 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-champagne" strokeWidth={1.5} />
              </div>
              <span className="absolute inset-0 rounded-full border border-champagne/30 animate-ping" style={{ animationDuration: '2s' }} />
            </div>
            <h3 className="text-2xl md:text-3xl font-sans font-bold text-ivory mb-3 tracking-tight">
              Request Received
            </h3>
            <p className="text-ivory/60 text-sm leading-relaxed max-w-sm mb-2">
              Thank you, <span className="text-champagne font-semibold">{form.name.split(' ')[0]}</span>. Our team will review your enquiry and contact you within <span className="text-ivory font-semibold">24 hours</span>.
            </p>
            <p className="text-ivory/40 text-xs font-mono uppercase tracking-widest mt-1 mb-8">
              Elite Point Corporate Services LLC
            </p>
            <button
              onClick={onClose}
              className="px-8 py-3 border border-white/10 text-ivory/60 rounded-xl text-sm hover:border-champagne/40 hover:text-ivory transition-all duration-200"
            >
              Close
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes modal-in {
          from { opacity: 0; transform: scale(0.92) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default function GetStarted() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="py-32 px-6 md:px-16 bg-obsidian relative z-10 flex flex-col items-center justify-center text-center">
        <div className="max-w-4xl mx-auto bg-slate/30 border border-white/5 p-12 md:p-24 rounded-[3rem] drop-shadow-2xl flex flex-col items-center">
          <h2 className="text-4xl md:text-6xl font-sans tracking-tight text-ivory mb-6">
            Ready to structure your{' '}
            <span className="font-serif italic text-champagne">legacy?</span>
          </h2>
          <p className="text-ivory/70 text-lg md:text-xl max-w-2xl mb-12">
            Step into a streamlined corporate architecture designed for absolute scaling and uncompromising compliance.
          </p>
          <button
            onClick={() => setOpen(true)}
            className="group relative overflow-hidden bg-champagne text-obsidian px-10 py-5 rounded-full font-bold text-xl hover:scale-[1.03] transition-transform transform-gpu flex items-center gap-4"
            style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
          >
            <span className="relative z-10">Book a Consultation</span>
            <svg className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <span className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
          </button>
        </div>
      </section>

      {open && <BookingModal onClose={() => setOpen(false)} />}
    </>
  );
}
