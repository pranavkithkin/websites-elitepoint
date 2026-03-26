import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0d] rounded-t-[4rem] text-ivory/80 pt-20 pb-10 px-6 md:px-16 relative z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand Col */}
          <div className="md:col-span-2 flex flex-col items-start gap-6">
            <Link to="/" className="flex items-center gap-3">
              <img src="/logo_8k_transparent_clean.png" alt="Elite Point Logo" className="h-14 w-auto object-contain" />
              <div className="flex flex-col">
                <span className="font-semibold tracking-tight text-xl text-ivory leading-tight">ELITE POINT</span>
                <span className="text-xs font-mono text-champagne">CORPORATE SERVICES</span>
              </div>
            </Link>
            <p className="max-w-sm text-sm text-ivory/60 leading-relaxed">
              Precision structuring meets absolute compliance. We build the architecture that powers global enterprise scaling.
            </p>
            
            {/* Live Indicator */}
            <div className="flex items-center gap-2 mt-4 px-4 py-2 rounded-full border border-green-500/20 bg-green-500/5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-mono text-green-500">System Operational</span>
            </div>
          </div>

          {/* Nav Col */}
          <div className="flex flex-col items-start gap-4 text-sm">
            <h4 className="font-bold text-ivory mb-2 uppercase tracking-widest text-xs font-sans">Navigation</h4>
            <Link to="/services" className="hover:text-champagne transition-colors">Services</Link>
            <Link to="/about" className="hover:text-champagne transition-colors">About</Link>
            <Link to="/contact" className="hover:text-champagne transition-colors">Contact</Link>
          </div>

          {/* Legal Col */}
          <div className="flex flex-col items-start gap-4 text-sm">
            <h4 className="font-bold text-ivory mb-2 uppercase tracking-widest text-xs font-sans">Legal</h4>
            <a href="#" className="hover:text-champagne transition-colors">Privacy Protocol</a>
            <a href="#" className="hover:text-champagne transition-colors">Terms of Infrastructure</a>
            <a href="#" className="hover:text-champagne transition-colors">Compliance Map</a>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-ivory/40">
          <p>© {new Date().getFullYear()} Elite Point Corporate Services LLC. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0 font-mono">
            <span>Dubai</span>
            <span>|</span>
            <span>Global Structuring</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
