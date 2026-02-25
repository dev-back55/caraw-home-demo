
import React from 'react';
import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { LandingHero } from '@/components/landing/LandingHero';
import { LandingAbout } from '@/components/landing/LandingAbout';
import { LandingServices } from '@/components/landing/LandingServices';
import { LandingNews } from '@/components/landing/LandingNews';
import { LandingCTA } from '@/components/landing/LandingCTA';
import { LandingContact } from '@/components/landing/LandingContact';
import { LandingFooter } from '@/components/landing/LandingFooter';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />
      <LandingHero />
      <LandingAbout />
      <LandingServices />
      <LandingNews />
      <LandingCTA />
      <LandingContact />
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
