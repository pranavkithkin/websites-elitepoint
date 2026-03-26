import React from 'react';
import Hero from '../components/Hero';
import { StatsBelt, Jurisdictions, ProcessStrip, Testimonials, WhyUs } from '../components/HomeSections';
import GetStarted from '../components/GetStarted';

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBelt />
      <WhyUs />
      <Jurisdictions />
      <ProcessStrip />
      <Testimonials />
      <GetStarted />
    </>
  );
}
