import React, { Suspense, lazy } from 'react';
import Hero from '../components/Hero';

// Lazy load all below-fold sections — they won't download until needed
const StatsBelt    = lazy(() => import('../components/HomeSections').then(m => ({ default: m.StatsBelt })));
const WhyUs        = lazy(() => import('../components/HomeSections').then(m => ({ default: m.WhyUs })));
const Jurisdictions = lazy(() => import('../components/HomeSections').then(m => ({ default: m.Jurisdictions })));
const ProcessStrip = lazy(() => import('../components/HomeSections').then(m => ({ default: m.ProcessStrip })));
const Testimonials = lazy(() => import('../components/HomeSections').then(m => ({ default: m.Testimonials })));
const GetStarted   = lazy(() => import('../components/GetStarted'));

// Minimal fallback — keeps layout stable while sections load in
const Placeholder = () => <div className="py-16 bg-obsidian" />;

export default function Home() {
  return (
    <>
      {/* Hero loads immediately — it's above the fold */}
      <Hero />

      {/* Everything below the fold is lazy */}
      <Suspense fallback={<Placeholder />}>
        <StatsBelt />
      </Suspense>
      <Suspense fallback={<Placeholder />}>
        <WhyUs />
      </Suspense>
      <Suspense fallback={<Placeholder />}>
        <Jurisdictions />
      </Suspense>
      <Suspense fallback={<Placeholder />}>
        <ProcessStrip />
      </Suspense>
      <Suspense fallback={<Placeholder />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<Placeholder />}>
        <GetStarted />
      </Suspense>
    </>
  );
}
