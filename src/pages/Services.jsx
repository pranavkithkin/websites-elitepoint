import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Features from '../components/Features';

export default function Services() {
  const containerRef = useRef(null);

  const servicesList = [
    { title: 'Business Setup', desc: 'Comprehensive entity establishment tailored to your scaling needs.' },
    { title: 'Trade License (LLC, Freezone & Offshore)', desc: 'Full-spectrum licensing acquisition across all UAE jurisdictions.' },
    { title: 'Local Sponsorship', desc: 'Secure, legally-binding corporate sponsorship agreements.' },
    { title: 'Golden Visa Services', desc: 'Fast-tracked, premium residency solutions for investors and talent.' },
    { title: 'Immigration & Visa', desc: 'End-to-end processing for employment, family, and investor visas.' },
    { title: 'Tasheel & Amer', desc: 'Dedicated processing of Ministry of Human Resources and Amer-related documentation.' },
    { title: 'Medical & Emirates ID', desc: 'Streamlined health and identity verification workflows.' },
    { title: 'Health Card & Insurance', desc: 'Corporate medical insurance facilitation and card issuance.' },
    { title: 'Certificate Attestation', desc: 'Global document authentication and Ministry of Foreign Affairs clearance.' },
    { title: 'Legal Translation', desc: 'Ministry of Justice-approved translation for official corporate documentation.' },
    { title: 'All Govt. Dept. Works', desc: 'Holistic liaison and clearance across all governmental bodies.' },
    { title: 'PRO Services', desc: 'Expert government liaison and swift document processing for all corporate needs.' },
  ];

  // Using CSS animations (defined in index.css) to prevent React routing GSAP sticking bugs
  useEffect(() => {
    // any general mounting logic could go here
  }, []);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-obsidian text-ivory/90 font-sans" ref={containerRef}>
      
      {/* 1. Show the interactive structural Features first */}
      <Features />

      {/* 2. Then comprehensively list all specific company services */}
      <div className="max-w-6xl mx-auto px-6 md:px-16 mt-24">
        <div className="mb-16">
          <h2 className="text-sm font-mono tracking-widest text-champagne uppercase mb-4">Comprehensive Solutions</h2>
          <h3 className="text-4xl md:text-5xl font-sans tracking-tight text-ivory">Our Enterprise Services</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map((srv, idx) => (
            <div 
              key={idx} 
              className="service-card group relative p-8 rounded-[2rem] bg-[#0A0A14] border border-white/5 overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:border-champagne/30 hover:shadow-[0_10px_30px_rgba(201,168,76,0.15)] opacity-0 animate-fade-up min-h-[280px]"
              style={{ animationDelay: `${idx * 0.05 + 0.2}s` }}
            >
              {/* Dynamic Background Image */}
              <div className="absolute inset-0 transition-transform duration-[1.5s] ease-out group-hover:scale-110">
                <img 
                  src={`/Services/${idx + 1}.jpg`} 
                  alt={srv.title}
                  loading="lazy"
                  className={`w-full h-full object-cover object-center opacity-40 mix-blend-screen group-hover:opacity-70 transition-opacity duration-500 transform ${idx >= 9 ? 'scale-[1.7]' : 'scale-100'}`}
                  onError={(e) => { e.target.style.display = 'none'; }} 
                />
              </div>

              {/* Gradient Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A14] via-[#0A0A14]/80 to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-0 bg-champagne/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
              
              <div className="relative z-20 flex flex-col h-full transform transition-transform duration-500 ease-out group-hover:-translate-y-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-obsidian border border-champagne/30 flex items-center justify-center shadow-[0_0_10px_rgba(201,168,76,0.05)] group-hover:border-champagne group-hover:shadow-[0_0_15px_rgba(201,168,76,0.2)] transition-all duration-500">
                    <span className="font-mono text-xs font-bold text-champagne">
                      {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </span>
                  </div>
                </div>
                <h4 className="font-bold text-xl text-ivory/90 mb-3 leading-tight tracking-tight">{srv.title}</h4>
                <p className="text-sm text-ivory/60 leading-relaxed mt-auto">
                  {srv.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
