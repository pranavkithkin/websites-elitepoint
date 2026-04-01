import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LogoLoop from './LogoLoop';

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
    { value: 1000, suffix: '+', label: 'Licenses Issued in UAE', prefix: '' },
    { value: 20, suffix: '+', label: 'Freezones & Jurisdictions Covered', prefix: '' },
    { value: 1000, suffix: '+', label: 'Active Commercial Licenses', prefix: '' },
    { value: 99, suffix: '%', label: 'Application Success & Approval Rate', prefix: '' },
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
    { name: 'Dubai Mainland', desc: 'DED licensed, full market access', tag: 'DED', logo: '/Authorities/Dubai.png' },
    { name: 'DIFC', desc: 'Financial district, international law', tag: 'DIFC', logo: '/Authorities/DIFC.png' },
    { name: 'JAFZA', desc: 'Jebel Ali Free Zone, trade & logistics', tag: 'FZ', logo: '/Authorities/Jafza.png' },
    { name: 'RAKEZ', desc: 'RAK — flexible, cost-effective setups', tag: 'RAKEZ', logo: '/Authorities/rakez.png' },
    { name: 'DMCC', desc: 'Commodities & global trade hub', tag: 'DMCC', logo: '/Authorities/DMCC .png' },
    { name: 'Ajman Offshore', desc: 'Asset protection, full ownership', tag: 'OFF', logo: '/Authorities/ajman freezone.png' },
  ];

  const logoItems = zones.map((z, i) => ({
    node: (
      <div className="group relative p-8 w-[340px] md:w-[380px] h-full rounded-[2rem] border border-white/5 bg-[#0e0e12] hover:bg-[#121216] transition-all duration-300 cursor-default overflow-hidden flex flex-col justify-between">
        <div className="absolute top-6 right-6 text-[10px] font-mono text-champagne/40 border border-champagne/10 px-2 flex items-center h-6 rounded-full uppercase tracking-wider">{z.tag}</div>
        
        {/* Authority Logo taking up the prominent center space */}
        <div className="flex-1 w-full flex items-center justify-start mt-6 mb-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
           <img 
               src={z.logo} 
               alt={`${z.name} Logo`} 
               className="w-[85%] max-h-[100px] object-contain object-left filter brightness-0 invert origin-left transform scale-125 md:scale-150 ml-4 md:ml-6"
           />
        </div>
        
        <div className="mt-auto">
          <h3 className="font-bold text-ivory/90 text-lg tracking-wide mb-2">{z.name}</h3>
          <p className="text-ivory/40 text-sm leading-relaxed">{z.desc}</p>
        </div>
      </div>
    ),
    title: z.name
  }));

  return (
    <section className="py-28 bg-[#0a0a0e] relative z-10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-[10px] font-mono text-champagne/80 uppercase tracking-widest mb-4">JURISDICTIONS WE COVER</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans tracking-tight text-ivory/90 mb-1">Set up anywhere</h2>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-champagne leading-tight">in the UAE.</h2>
          </div>
          <div className="md:w-1/3 md:pb-2">
            <p className="text-ivory/40 text-[15px] leading-relaxed">
              We are registered and active across every major UAE free zone and mainland authority — giving you the widest possible licensing footprint.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full">
        <LogoLoop
          logos={logoItems}
          speed={50}
          direction="left"
          gap={20}
          logoHeight={200}
          hoverSpeed={10}
          fadeOut={true}
          fadeOutColor="#0a0a0e"
          ariaLabel="Jurisdictions We Cover"
        />
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
        y: 60,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
        }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const steps = [
    { n: '01', t: 'Consult', d: 'Free discovery call to map your business goals.', img: '/images/process/corp_consult.png' },
    { n: '02', t: 'Structure', d: 'We recommend the optimal entity and jurisdiction.', img: '/images/process/corp_structure.png' },
    { n: '03', t: 'Submit', d: 'We handle every document, authority, and approval.', img: '/images/process/corp_submit.png' },
    { n: '04', t: 'Operate', d: 'Your company is live — bank account, visa, ID ready.', img: '/images/process/corp_operate.png' },
  ];

  return (
    <section ref={ref} className="py-32 px-6 md:px-16 bg-[#0a0a0e] relative z-10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <p className="text-[10px] font-mono text-champagne/80 uppercase tracking-widest mb-16 text-center">Our Process — From Idea to Operation</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((s, i) => (
            <div key={i} className="proc-step group relative overflow-hidden rounded-[2rem] border border-white/5 bg-[#0e0e12] h-[400px] flex flex-col justify-end p-8 isolate transition-all duration-500 hover:border-champagne/30">
              
              {/* Background Glow/Image */}
              <div className="absolute inset-0 transition-transform duration-[1.5s] ease-out group-hover:scale-110">
                <img 
                  src={s.img} 
                  alt={s.t}
                  loading="lazy"
                  className="w-full h-full object-cover object-center opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>
              
              {/* Gradient Overlay to ensure text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0e] via-[#0a0a0e]/40 to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-0 bg-[#0a0a0e]/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />

              {/* Content Box */}
              <div className="relative z-20 flex flex-col gap-3 transform transition-transform duration-500 ease-out group-hover:-translate-y-2">
                <div className="w-10 h-10 rounded-full bg-obsidian/80 backdrop-blur-md border border-champagne/30 flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(201,168,76,0.15)] group-hover:border-champagne group-hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] transition-all duration-500">
                  <span className="font-mono text-xs text-champagne scale-110">{s.n}</span>
                </div>
                <h3 className="font-bold text-ivory/90 text-2xl tracking-tight">{s.t}</h3>
                <p className="text-ivory/50 text-sm leading-relaxed">{s.d}</p>
              </div>
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
    { icon: '🌐', t: '40+ Govt. Authorities', d: 'Active relationships with DED, MOHRE, ICP, Amer, and all major free zone authorities.' },
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

// ── FEATURED SERVICES ─────────────────────────────────────────────────────────
function FeaturedServices() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feat-srv-card', {
        y: 60,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
        }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const featured = [
    { title: 'Business Setup', desc: 'Comprehensive entity establishment tailored to your scaling needs.', img: '/Services/1.jpg' },
    { title: 'Golden Visa Services', desc: 'Fast-tracked, premium residency solutions for investors and talent.', img: '/Services/4.jpg' },
    { title: 'Trade License (LLC, Freezone & Offshore)', desc: 'Full-spectrum licensing acquisition across all UAE jurisdictions.', img: '/Services/2.jpg' },
    { title: 'Immigration & Visa', desc: 'End-to-end processing for employment, family, and investor visas.', img: '/Services/5.jpg' }
  ];

  return (
    <section ref={ref} className="py-24 px-6 md:px-16 bg-obsidian relative z-10 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-[10px] font-mono text-champagne/80 uppercase tracking-widest mb-4">Core Solutions</p>
            <h2 className="text-4xl md:text-5xl font-sans tracking-tight text-ivory">Featured Services</h2>
          </div>
          <a href="/services" className="group flex items-center gap-3 text-champagne font-bold text-sm tracking-wide uppercase hover:text-ivory transition-colors">
            View All Services
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((srv, idx) => (
            <a 
              href="/services"
              key={idx} 
              className="feat-srv-card group relative p-8 rounded-[2rem] bg-[#0A0A14] border border-white/5 overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:border-champagne/30 hover:shadow-[0_10px_30px_rgba(201,168,76,0.15)] min-h-[320px] flex flex-col justify-end isolate"
            >
              {/* Dynamic Background Image */}
              <div className="absolute inset-0 transition-transform duration-[1.5s] ease-out group-hover:scale-110 pointer-events-none">
                <img 
                  src={srv.img} 
                  alt={srv.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center opacity-50 mix-blend-screen group-hover:opacity-90 transition-opacity duration-500"
                  onError={(e) => { e.target.style.display = 'none'; }} 
                />
              </div>

              {/* Gradient Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A14] via-[#0A0A14]/60 to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-0 bg-champagne/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
              
              <div className="relative z-20 flex flex-col h-full transform transition-transform duration-500 ease-out group-hover:-translate-y-2">
                <div className="w-10 h-10 rounded-full bg-obsidian border border-champagne/30 flex items-center justify-center mb-4 shadow-[0_0_10px_rgba(201,168,76,0.05)] group-hover:border-champagne transition-all duration-500">
                  <span className="font-mono text-xs font-bold text-champagne">
                    0{idx + 1}
                  </span>
                </div>
                <h4 className="font-bold text-xl text-ivory/90 mb-3 leading-tight tracking-tight">{srv.title}</h4>
                <p className="text-sm text-ivory/60 leading-relaxed mt-auto">
                  {srv.desc}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export { StatsBelt, FeaturedServices, Jurisdictions, ProcessStrip, Testimonials, WhyUs };
