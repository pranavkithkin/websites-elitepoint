import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';

export default function Navbar() {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-40 px-4 md:px-6 pt-4 md:pt-6 pointer-events-none">
        <nav
          ref={navRef}
          className="max-w-5xl mx-auto rounded-full flex items-center justify-between px-5 pointer-events-auto border border-transparent transition-all"
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Elite Point Logo" className="h-9 w-auto object-contain" />
            <span className="font-semibold tracking-tight text-base mt-1 hidden sm:block text-ivory">ELITE POINT</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 font-medium text-sm text-ivory/80">
            {navLinks.slice(0, 3).map(l => (
              <Link key={l.to} to={l.to} className="hover:text-champagne hover:-translate-y-[1px] transition-all">{l.label}</Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link to="/contact" className="group relative overflow-hidden bg-champagne text-obsidian px-5 py-2.5 rounded-full font-semibold text-sm hover:scale-[1.03] inline-block transition-transform" style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>
              <span className="relative z-10">Consult</span>
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="md:hidden p-2 rounded-xl text-ivory/80 hover:text-champagne transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile Full-Screen Menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-10"
          style={{ background: 'rgba(13,13,18,0.97)', backdropFilter: 'blur(20px)' }}
        >
          {/* Close */}
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 p-2 text-ivory/60 hover:text-champagne transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Links */}
          <nav className="flex flex-col items-center gap-8">
            {navLinks.map(l => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMenuOpen(false)}
                className="text-3xl font-sans font-bold text-ivory/80 hover:text-champagne transition-colors tracking-tight"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-4 bg-champagne text-obsidian px-10 py-4 rounded-full font-bold text-lg"
          >
            Book a Consultation
          </Link>
        </div>
      )}
    </>
  );
}
