import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-element', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-[100dvh] w-full flex items-end pb-16 md:pb-24 px-6 md:px-16 overflow-hidden">
      {/* Background Video: 109KB on mobile, WebM/MP4 on desktop */}
      <div className="absolute inset-0 z-0">
        <video
          ref={el => {
            if (!el) return;
            // Serve tiny mobile video on small screens
            const isMobile = window.matchMedia('(max-width: 768px)').matches;
            const src = isMobile ? '/hero-bg-mobile.mp4' : null;
            if (isMobile && el.querySelector('source[data-mobile]') === null) {
              const sources = el.querySelectorAll('source');
              sources.forEach(s => s.remove());
              const s = document.createElement('source');
              s.src = '/hero-bg-mobile.mp4';
              s.type = 'video/mp4';
              s.dataset.mobile = '1';
              el.appendChild(s);
              el.load();
            }
          }}
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-poster.jpg"
          className="w-full h-full object-cover"
          preload="metadata"
        >
          <source src="/hero-bg.webm" type="video/webm" />
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/70 to-obsidian/20"></div>
        <div className="absolute inset-0 bg-obsidian/40 mix-blend-multiply"></div>
      </div>

      <div ref={textRef} className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-start gap-4">
        <h1 className="flex flex-col gap-1 tracking-tight">
          <span className="hero-element font-sans font-bold text-2xl md:text-5xl lg:text-6xl uppercase tracking-tighter text-ivory/90">
            Precision structuring meets
          </span>
          <span className="hero-element font-serif italic text-5xl md:text-8xl lg:text-[140px] leading-[0.85] text-champagne pr-4">
            Flawless execution.
          </span>
        </h1>
        
        <p className="hero-element text-base md:text-xl text-ivory/70 max-w-lg mt-4 font-light">
          We architect and scale premium business entities with uncompromising clarity and compliance.
        </p>

        <div className="hero-element mt-8">
          <button className="group relative overflow-hidden bg-champagne text-obsidian px-8 py-4 rounded-full font-bold text-lg hover:scale-[1.03] transition-transform transform-gpu flex items-center gap-3" style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>
            <span className="relative z-10">Book a consultation</span>
            <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <span className="absolute inset-0 bg-ivory/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></span>
          </button>
        </div>
      </div>
    </section>
  );
}
