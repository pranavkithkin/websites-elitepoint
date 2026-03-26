import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';

export default function Navbar() {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Force styled background if not on root, otherwise use scroll behavior
      const needsBackground = scrolled || location.pathname !== '/';

      if (needsBackground) {
        gsap.to(navRef.current, {
          backgroundColor: 'rgba(13, 13, 18, 0.95)',
          backdropFilter: 'blur(24px)',
          borderColor: 'rgba(42, 42, 53, 0.4)',
          borderWidth: 1,
          paddingTop: '0.75rem',
          paddingBottom: '0.75rem',
          duration: 0.4,
          ease: 'power2.out',
        });
      } else {
        gsap.to(navRef.current, {
          backgroundColor: 'transparent',
          backdropFilter: 'blur(0px)',
          borderColor: 'transparent',
          paddingTop: '1.25rem',
          paddingBottom: '1.25rem',
          duration: 0.4,
          ease: 'power2.out',
        });
      }
    }, navRef);
    return () => ctx.revert();
  }, [scrolled, location.pathname]);

  return (
    <div className="fixed top-0 left-0 w-full z-40 px-6 pt-6 pointer-events-none">
      <nav
        ref={navRef}
        className="max-w-5xl mx-auto rounded-full flex items-center justify-between px-6 pointer-events-auto border border-transparent transition-all"
      >
        <Link to="/" className="flex items-center gap-2">
          {/* Logo */}
          <img src="/logo_8k_transparent_clean.png" alt="Elite Point Logo" className="h-10 w-auto object-contain" />
          <span className="font-semibold tracking-tight text-lg mt-1 hidden sm:block">ELITE POINT</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 font-medium text-sm text-ivory/80">
          <Link to="/" className="hover:text-champagne hover:-translate-y-[1px] transition-all">Home</Link>
          <Link to="/services" className="hover:text-champagne hover:-translate-y-[1px] transition-all">Services</Link>
          <Link to="/about" className="hover:text-champagne hover:-translate-y-[1px] transition-all">About</Link>
        </div>

        <div>
          <Link to="/contact" className="group relative overflow-hidden bg-champagne text-obsidian px-5 py-2.5 rounded-full font-semibold text-sm hover:scale-[1.03] inline-block transition-transform" style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>
            <span className="relative z-10">Consult</span>
            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
