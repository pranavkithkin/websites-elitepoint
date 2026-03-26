import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01',
    title: 'Initial Architecting',
    desc: 'We analyze your precise operational goals and architect a jurisdictional framework designed for maximum efficiency.',
    svgType: 'geom',
  },
  {
    num: '02',
    title: 'Entity Structuring',
    desc: 'Seamless incorporation of legal structures, licensing setups, and fully compliant local integrations.',
    svgType: 'scan',
  },
  {
    num: '03',
    title: 'Operational Launch',
    desc: 'Capital architecture, strategic banking, and ongoing compliance protocol synchronization.',
    svgType: 'pulse',
  }
];

// SVG Animations components
const RotatingGeometric = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full text-champagne/30 animate-[spin_20s_linear_infinite]">
    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" />
    <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 4" />
    <polygon points="50,15 80,85 20,85" fill="none" stroke="currentColor" strokeWidth="0.5" className="animate-[pulse_4s_ease-in-out_infinite]" />
  </svg>
);

const ScanningLaser = () => (
  <div className="relative w-full h-full p-4 overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,248,245,0.05)_1px,transparent_1px)] bg-[size:10px_10px]"></div>
    <div className="w-full h-[2px] bg-champagne blur-[1px] absolute left-0 top-0 shadow-[0_0_10px_rgba(201,168,76,1)] animate-[scan_3s_ease-in-out_infinite_alternate]" style={{
      animationName: 'scanVertical',
    }}></div>
    <style>{`
      @keyframes scanVertical {
        0% { transform: translateY(0); }
        100% { transform: translateY(100vh); }
      }
    `}</style>
  </div>
);

const PulsingEKG = () => (
  <svg viewBox="0 0 200 100" className="w-full h-full text-champagne/40">
    <path 
      d="M0,50 L50,50 L60,30 L70,80 L80,20 L90,60 L100,50 L200,50" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeDasharray="200"
      strokeDashoffset="200"
      className="animate-[ekg_3s_linear_infinite]"
    />
    <style>{`
      @keyframes ekg {
        0% { stroke-dashoffset: 200; }
        50% { stroke-dashoffset: 0; }
        100% { stroke-dashoffset: -200; }
      }
    `}</style>
  </svg>
);


export default function Protocol() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const innerCardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        
        // The card underneath fades and blurs
        if (i > 0) {
          const prevInner = innerCardsRef.current[i - 1];
          gsap.to(prevInner, {
            scale: 0.9,
            opacity: 0.5,
            filter: 'blur(10px)',
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "top top",
              scrub: 1,
            }
          });
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="protocol" ref={containerRef} className="relative bg-obsidian pb-24">
      {steps.map((step, i) => (
        <div 
          key={i} 
          ref={el => cardsRef.current[i] = el}
          className="h-[100dvh] w-full flex items-center justify-center p-6 md:p-16 sticky top-0"
        >
          <div 
            ref={el => innerCardsRef.current[i] = el}
            className="w-full max-w-6xl min-h-[70vh] md:h-[80vh] bg-slate/50 backdrop-blur-md rounded-[2rem] md:rounded-[3rem] border border-white/5 relative overflow-hidden flex flex-col md:flex-row shadow-2xl"
          >
            
            {/* Visual Half */}
            <div className="w-full md:w-1/2 h-36 md:h-full bg-obsidian/50 relative overflow-hidden flex items-center justify-center">
              {step.svgType === 'geom' && <RotatingGeometric />}
              {step.svgType === 'scan' && <ScanningLaser />}
              {step.svgType === 'pulse' && <PulsingEKG />}
            </div>

            {/* Content Half */}
            <div className="w-full md:w-1/2 p-6 md:p-16 flex flex-col justify-center">
              <span className="font-mono text-champagne text-2xl md:text-4xl block mb-4">{step.num}</span>
              <h3 className="font-sans font-bold text-2xl md:text-5xl text-ivory tracking-tight mb-4">{step.title}</h3>
              <p className="font-sans text-ivory/70 text-base md:text-xl leading-relaxed max-w-md">
                {step.desc}
              </p>
            </div>
            
          </div>
        </div>
      ))}
    </section>
  );
}
