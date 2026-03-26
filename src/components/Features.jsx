import React, { useEffect, useState, useRef } from 'react';
import { Building2, CheckCircle2, MousePointer2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Card 1 — Diagnostic Shuffler: Rotating service categories
function DiagnosticShuffler() {
  const [cards, setCards] = useState([
    { id: 1, label: 'FORMATION', title: 'Company Setup', desc: 'LLC, Freezone & mainland company registration handled end-to-end.' },
    { id: 2, label: 'LICENSING', title: 'Trade Licensing', desc: 'Precise license selection across all UAE jurisdictions.' },
    { id: 3, label: 'PRO SERVICES', title: 'Government Liaison', desc: 'Visa, Emirates ID, labour & ministry approvals.' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prev => {
        const newArr = [...prev];
        const last = newArr.pop();
        newArr.unshift(last);
        return newArr;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-80 w-full flex items-start justify-center bg-[#0a0a0d] border border-white/10 p-6 rounded-[2rem] shadow-2xl overflow-hidden mt-0">
      {cards.map((card, idx) => {
        const isTop = idx === 0;
        const isMid = idx === 1;

        let yOffset = isTop ? 10 : isMid ? 38 : 64;
        let scale = isTop ? 1 : isMid ? 0.95 : 0.9;
        let opacity = isTop ? 1 : isMid ? 0.55 : 0.25;
        let zIndex = 10 - idx;

        return (
          <div
            key={card.id}
            className="absolute w-[85%] rounded-3xl bg-[#1e1e26] p-6 border border-white/10 shadow-2xl transition-all duration-700 font-sans"
            style={{
              transform: `translateY(${yOffset}px) scale(${scale})`,
              opacity,
              zIndex,
              transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="text-champagne w-5 h-5" />
              <span className="text-xs font-mono text-ivory/60 tracking-widest">{card.label}</span>
            </div>
            <h3 className="font-bold text-xl text-ivory mb-2">{card.title}</h3>
            <p className="text-sm text-ivory/70">{card.desc}</p>
          </div>
        );
      })}
    </div>
  );
}

// Card 2 — Compliance Checklist: Animated task completion for client onboarding
function ComplianceChecklist() {
  const steps = [
    'Trade name reservation confirmed',
    'Jurisdiction & license type selected',
    'Documents submitted to authority',
    'Initial approval received',
    'Banking account opened',
    'Visa & Emirates ID processed',
  ];

  const [checked, setChecked] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setChecked([]);
    setCurrent(0);

    let i = 0;
    const tick = () => {
      if (i < steps.length) {
        setChecked(prev => [...prev, i]);
        setCurrent(i + 1);
        i++;
        setTimeout(tick, 900);
      } else {
        // Reset after a pause
        setTimeout(() => {
          setChecked([]);
          setCurrent(0);
          i = 0;
          setTimeout(tick, 600);
        }, 3000);
      }
    };

    const startDelay = setTimeout(tick, 800);
    return () => clearTimeout(startDelay);
  }, []);

  return (
    <div className="h-80 w-full bg-[#0a0a0d] border border-white/10 p-6 rounded-[2rem] flex flex-col shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-champagne" />
          <span className="text-ivory/60 uppercase tracking-widest text-xs font-mono">Client Onboarding</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-champagne opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-champagne"></span>
          </span>
          <span className="text-xs text-champagne font-mono uppercase tracking-wider">In Progress</span>
        </div>
      </div>

      {/* Steps */}
      <div className="flex flex-col gap-2.5 flex-1 justify-center">
        {steps.map((step, i) => {
          const isDone = checked.includes(i);
          const isActive = current === i;
          return (
            <div
              key={i}
              className="flex items-center gap-3 transition-all duration-500"
              style={{ opacity: isDone || isActive ? 1 : 0.3 }}
            >
              {/* Indicator */}
              <div className={`w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center border transition-all duration-500 ${
                isDone
                  ? 'bg-champagne border-champagne'
                  : isActive
                  ? 'border-champagne animate-pulse'
                  : 'border-white/20'
              }`}>
                {isDone && (
                  <svg className="w-2.5 h-2.5 text-obsidian" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className={`text-xs font-mono transition-colors duration-500 ${isDone ? 'text-ivory/90' : isActive ? 'text-champagne' : 'text-ivory/40'}`}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Card 3 — Cursor Protocol Scheduler: Service timeline with animated cursor
function ServiceTimeline() {
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const btnRef = useRef(null);
  const milestones = ['W1', 'W2', 'W3', 'W4', 'W6', 'W8'];
  const [activeStep, setActiveStep] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });

      tl.set(cursorRef.current, { x: 260, y: 120, opacity: 0 });
      tl.to(cursorRef.current, { opacity: 1, duration: 0.3 });

      // Move to Week 4 (index 3)
      tl.to(cursorRef.current, { x: 100, y: 48, duration: 1, ease: 'power2.inOut' });
      tl.to(cursorRef.current, { scale: 0.8, duration: 0.1 });
      tl.call(() => setActiveStep(3));
      tl.to(cursorRef.current, { scale: 1, duration: 0.1 });

      tl.to({}, { duration: 0.6 });

      // Move to confirm button
      tl.to(cursorRef.current, { x: 80, y: 130, duration: 0.8, ease: 'power2.inOut' });
      tl.to(cursorRef.current, { scale: 0.8, duration: 0.1 });
      tl.to(btnRef.current, { scale: 0.95, backgroundColor: 'rgba(201, 168, 76, 0.8)', duration: 0.1 });
      tl.to(cursorRef.current, { scale: 1, duration: 0.1 });
      tl.to(btnRef.current, { scale: 1, backgroundColor: 'rgba(201, 168, 76, 1)', duration: 0.2 });

      tl.to(cursorRef.current, { opacity: 0, duration: 0.3, delay: 0.5 });
      tl.call(() => setActiveStep(null));
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="h-80 w-full bg-[#0a0a0d] border border-white/10 p-6 rounded-[2rem] shadow-2xl relative overflow-hidden flex flex-col items-center justify-center gap-8">
      {/* Milestone row */}
      <div>
        <p className="text-xs font-mono text-ivory/40 uppercase tracking-widest mb-4 text-center">Delivery Timeline</p>
        <div className="flex items-center gap-2">
          {milestones.map((m, i) => (
            <div
              key={i}
              className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-mono transition-all duration-300 ${
                activeStep === i
                  ? 'bg-champagne text-obsidian font-bold scale-110'
                  : 'bg-white/5 text-ivory/40 border border-white/10'
              }`}
            >
              {m}
            </div>
          ))}
        </div>
      </div>

      <button
        ref={btnRef}
        className="px-6 py-2 rounded-xl bg-champagne text-obsidian text-xs font-bold uppercase tracking-wider"
      >
        Confirm Timeline
      </button>

      {/* Animated Cursor */}
      <div
        ref={cursorRef}
        className="absolute top-0 left-0 pointer-events-none z-10 w-6 h-6 origin-top-left"
        style={{ filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.5))' }}
      >
        <MousePointer2 className="fill-white stroke-black stroke-[1.5px] w-full h-full" />
      </div>
    </div>
  );
}


export default function Features() {
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} id="services" className="py-32 px-6 md:px-16 bg-obsidian relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-20">
          <h2 className="text-sm font-mono tracking-widest text-champagne uppercase mb-4">How We Work</h2>
          <h3 className="text-4xl md:text-5xl font-sans tracking-tight text-ivory">Our Core Pillars</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Card 1 — Company Formation */}
          <div className="flex flex-col gap-8">
            <DiagnosticShuffler />
            <div>
              <h4 className="font-bold text-2xl font-sans text-ivory mb-3">Strategic Formation</h4>
              <p className="text-ivory/60 text-sm leading-relaxed">
                Dynamic modeling of company structures — LLC, freezone, or mainland — identifying the optimum licensing and jurisdictional path for your business.
              </p>
            </div>
          </div>

          {/* Card 2 — Regulatory Compliance */}
          <div className="flex flex-col gap-8">
            <ComplianceChecklist />
            <div>
              <h4 className="font-bold text-2xl font-sans text-ivory mb-3">Seamless Compliance</h4>
              <p className="text-ivory/60 text-sm leading-relaxed">
                We guide every step of your onboarding — from trade name to banking — so you are operational without the bureaucratic burden.
              </p>
            </div>
          </div>

          {/* Card 3 — Scalable Infrastructure */}
          <div className="flex flex-col gap-8">
            <ServiceTimeline />
            <div>
              <h4 className="font-bold text-2xl font-sans text-ivory mb-3">Guaranteed Timelines</h4>
              <p className="text-ivory/60 text-sm leading-relaxed">
                Clear week-by-week delivery milestones covering visas, banking, and operational setup — built for speed and certainty.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
