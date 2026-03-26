import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const containerRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax Background
      gsap.to(bgRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });

      // Split Text Reveal (Mimicking SplitText with basic staggering due to pure React/GSAP without premium plugins)
      const words1 = gsap.utils.toArray('.phil-word-1');
      gsap.from(words1, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: text1Ref.current,
          start: 'top 80%',
        }
      });

      const words2 = gsap.utils.toArray('.phil-word-2');
      gsap.from(words2, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: text2Ref.current,
          start: 'top 80%',
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const line1 = "Most corporate setups focus on: basic incorporation.".split(' ');
  const line2 = "We focus on: strategic scaling.".split(' ');

  return (
    <section id="philosophy" ref={containerRef} className="relative py-24 md:py-48 px-6 md:px-16 overflow-hidden bg-obsidian">
      {/* Background Parallax Texture */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ overflow: 'hidden' }}>
        <img 
          ref={bgRef}
          src="https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&w=2000&q=80" 
          alt="Dark Texture" 
          className="w-full h-[120%] object-cover object-center origin-top scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-transparent to-obsidian"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-12">
        <h3 ref={text1Ref} className="text-xl md:text-3xl font-sans font-medium text-ivory/50 tracking-tight flex flex-wrap gap-2 uppercase">
          {line1.map((w, i) => (
            <span key={i} className="phil-word-1 overflow-hidden inline-[block]">
              <span className="inline-block">{w}</span>
            </span>
          ))}
        </h3>
        
        <h2 ref={text2Ref} className="text-4xl md:text-8xl lg:text-[110px] leading-[0.9] font-serif italic text-ivory tracking-tight flex flex-wrap gap-x-4 gap-y-2">
          {line2.map((w, i) => {
            const isAccent = w.toLowerCase().includes('scaling');
            return (
              <span key={i} className="phil-word-2 overflow-hidden inline-[block]">
                <span className={`inline-block ${isAccent ? 'text-champagne drop-shadow-lg' : ''}`}>{w}</span>
              </span>
            );
          })}
        </h2>
      </div>
    </section>
  );
}
