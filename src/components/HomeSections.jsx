import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ── ANIMATED COUNTER ──────────────────────────────────────────────────────────
function Counter({ target, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const triggered = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          let start = 0;
          const duration = 2000;
          const step = target / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

// ── STATS BELT ────────────────────────────────────────────────────────────────
function StatsBelt() {
  const stats = [
    { value: 200000, suffix: '+', label: 'New Licenses Issued in UAE 2024', prefix: '' },
    { value: 30, suffix: '%', label: 'Freezone Registration Growth YoY', prefix: '+' },
    { value: 1, suffix: 'M+', label: 'Active Commercial Licenses in UAE', prefix: '' },
    { value: 8.1, suffix: 'B', label: 'Consulting Market by 2033 (USD)', prefix: '$' },
  ];

  return (
    <section className="py-20 border-y border-white/5 bg-[#0a0a0e] relative z-10 overflow-hidden">
      {/* Subtle scan line */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(201,168,76,0.015)_1px,transparent_1px)] bg-[size:100%_60px] pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 md:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center md:items-start gap-1 text-center md:text-left md:border-l border-white/5 md:pl-8 first:border-l-0 first:pl-0">
              <div className="text-3xl md:text-4xl font-bold font-sans text-champagne tracking-tight tabular-nums">
                <Counter target={s.value} suffix={s.suffix} prefix={s.prefix} />
              </div>
              <p className="text-xs font-mono text-ivory/40 uppercase tracking-wider leading-tight max-w-[160px]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── JURISDICTIONS ─────────────────────────────────────────────────────────────
function Jurisdictions() {
  const zones = [
    { name: 'Dubai Mainland', desc: 'DED licensed, full market access', tag: 'DED' },
    { name: 'DIFC', desc: 'Financial district, international law', tag: 'DIFC' },
    { name: 'JAFZA', desc: 'Jebel Ali Free Zone, trade & logistics', tag: 'FZ' },
    { name: 'RAKEZ', desc: 'RAK — flexible, cost-effective setups', tag: 'RAKEZ' },
    { name: 'DMCC', desc: 'Commodities & global trade hub', tag: 'DMCC' },
    { name: 'Ajman Offshore', desc: 'Asset protection, full ownership', tag: 'OFF' },
  ];

  return (
    <section className="py-32 px-6 md:px-16 bg-obsidian relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-xs font-mono text-champagne uppercase tracking-widest mb-3">Jurisdictions We Cover</p>
            <h2 className="text-4xl md:text-5xl font-sans tracking-tight text-ivory">Set up anywhere <br className="hidden md:block" />
              <span className="font-serif italic text-champagne">in the UAE.</span>
            </h2>
          </div>
          <p className="text-ivory/50 text-sm max-w-sm leading-relaxed">
            We are registered and active across every major UAE free zone and mainland authority — giving you the widest possible licensing footprint.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {zones.map((z, i) => (
            <div
              key={i}
              className="group relative p-7 rounded-[1.75rem] border border-white/5 bg-slate/20 hover:bg-slate/50 hover:border-champagne/20 transition-all duration-300 cursor-default overflow-hidden"
            >
              <div className="absolute top-5 right-5 text-[10px] font-mono text-champagne/60 border border-champagne/20 px-2 py-0.5 rounded-full">{z.tag}</div>
              <div className="w-8 h-8 rounded-xl bg-champagne/10 flex items-center justify-center mb-5">
                <div className="w-2 h-2 rounded-full bg-champagne" />
              </div>
              <h3 className="font-bold text-ivory text-lg mb-2">{z.name}</h3>
              <p className="text-ivory/50 text-sm leading-relaxed">{z.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── PROCESS STRIP ─────────────────────────────────────────────────────────────
function ProcessStrip() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.proc-step', {
        x: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
        }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const steps = [
    { n: '01', t: 'Consult', d: 'Free discovery call to map your business goals.' },
    { n: '02', t: 'Structure', d: 'We recommend the optimal entity and jurisdiction.' },
    { n: '03', t: 'Submit', d: 'We handle every document, authority, and approval.' },
    { n: '04', t: 'Operate', d: 'Your company is live — bank account, visa, ID ready.' },
  ];

  return (
    <section ref={ref} className="py-28 px-6 md:px-16 bg-[#0a0a0e] relative z-10">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-mono text-champagne uppercase tracking-widest mb-14 text-center">Our Process — From Idea to Operation</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* connecting line — desktop only */}
          <div className="absolute top-5 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-champagne/20 to-transparent hidden lg:block pointer-events-none" />
          {steps.map((s, i) => (
            <div key={i} className="proc-step flex flex-col items-start gap-4 relative">
              <div className="w-10 h-10 rounded-full bg-obsidian border border-champagne/30 flex items-center justify-center">
                <span className="font-mono text-xs text-champagne">{s.n}</span>
              </div>
              <h3 className="font-bold text-ivory text-xl">{s.t}</h3>
              <p className="text-ivory/50 text-sm leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── TESTIMONIALS ──────────────────────────────────────────────────────────────
function Testimonials() {
  const quotes = [
    {
      text: "Elite Point handled our entire freezone registration in under two weeks. The team knew every document, every authority, every shortcut.",
      author: "Rajan Mehta",
      title: "CEO, Meridian FZE",
      region: "🇮🇳 India → UAE"
    },
    {
      text: "From Golden Visa to company formation — completely stress-free. They are the most competent PRO team we have worked with in Dubai.",
      author: "Sophie Beaumont",
      title: "Founder, Beaumont Interiors",
      region: "🇫🇷 France → Dubai"
    },
    {
      text: "Banking, Emirates ID, health cards — they coordinated everything while I focused on running the business. Highly recommend.",
      author: "Mohammed Al Farsi",
      title: "Managing Partner, Al Farsi Holdings",
      region: "🇦🇪 Abu Dhabi"
    },
  ];

  return (
    <section className="py-32 px-6 md:px-16 bg-obsidian relative z-10">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-mono text-champagne uppercase tracking-widest mb-4 text-center">Client Voices</p>
        <h2 className="text-4xl md:text-5xl font-sans tracking-tight text-ivory text-center mb-16">
          Trusted by founders <span className="font-serif italic text-champagne">worldwide.</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quotes.map((q, i) => (
            <div
              key={i}
              className="p-8 rounded-[2rem] border border-white/5 bg-slate/20 flex flex-col gap-6 hover:border-champagne/20 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, s) => (
                  <svg key={s} className="w-3.5 h-3.5 text-champagne fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              {/* Quote */}
              <p className="text-ivory/70 text-sm leading-relaxed flex-1">"{q.text}"</p>
              {/* Author */}
              <div className="border-t border-white/5 pt-5">
                <p className="text-ivory font-semibold text-sm">{q.author}</p>
                <p className="text-ivory/40 text-xs mt-0.5">{q.title}</p>
                <p className="text-champagne/70 text-xs font-mono mt-0.5">{q.region}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── WHY ELITE POINT ───────────────────────────────────────────────────────────
function WhyUs() {
  const pillars = [
    { icon: '⚡', t: '7-Day Turnaround', d: 'Most formations completed in as little as 7 business days from document submission.' },
    { icon: '🔒', t: 'Zero Hidden Fees', d: 'Full cost breakdown in writing before we start. No surprises, ever.' },
    { icon: '🌐', t: '40+ Govt. Authorities', d: 'Active relationships with DED, MOHRE, ICA, and all major free zone authorities.' },
    { icon: '🤝', t: 'Dedicated Manager', d: 'One point of contact from consultation to operational status.' },
  ];

  return (
    <section className="py-28 px-6 md:px-16 bg-[#0a0a0e] relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-mono text-champagne uppercase tracking-widest mb-4">Why Elite Point</p>
            <h2 className="text-4xl md:text-5xl font-sans tracking-tight text-ivory mb-6">
              The difference is in <br />
              <span className="font-serif italic text-champagne">the details.</span>
            </h2>
            <p className="text-ivory/60 leading-relaxed text-base max-w-md">
              Hundreds of corporate services firms exist in the UAE. Few combine deep regulatory knowledge, government relationships, and premium client care at every level of the engagement.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {pillars.map((p, i) => (
              <div key={i} className="p-6 rounded-[1.75rem] border border-white/5 bg-slate/20 hover:border-champagne/20 hover:bg-slate/40 transition-all duration-300">
                <div className="text-2xl mb-4">{p.icon}</div>
                <h3 className="font-bold text-ivory text-base mb-2">{p.t}</h3>
                <p className="text-ivory/50 text-xs leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export { StatsBelt, Jurisdictions, ProcessStrip, Testimonials, WhyUs };
