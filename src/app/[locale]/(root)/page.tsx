'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import {
  FeaturesSection,
  GetStartedSection,
  HeroSection,
  Preloader,
  TeamSection,
  TechnologiesSection,
} from '@/components';
import { useAuth } from '@/hooks';
import { supabase } from '@/lib';

export default function Home() {
  const user = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      supabase.auth.getUser().finally(() => setIsLoading(false));
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Preloader />
      </div>
    );
  }

  return (
    <div className="flex-grow">
      <HeroSection user={user} />
      <FeaturesSection />
      <TechnologiesSection />
      <TeamSection />
      {!user && <GetStartedSection />}
    </div>
  );
}
