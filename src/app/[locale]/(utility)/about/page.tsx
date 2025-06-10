'use client';

import { useState } from 'react';

import {
  FeaturesSection,
  HeroSection,
  Preloader,
  TeamSection,
  TechnologiesSection,
} from '@/components';

export default function Home() {
  const [isLoading] = useState(false);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Preloader />
      </div>
    );
  }

  return (
    <div className="flex-grow">
      <HeroSection />
      <FeaturesSection />
      <TechnologiesSection />
      <TeamSection />
    </div>
  );
}
