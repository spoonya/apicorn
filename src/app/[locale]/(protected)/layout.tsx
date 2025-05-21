'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Preloader } from '@/components';
import { DefaultLayout } from '@/layouts';
import { supabase } from '@/lib/supabase';
import { AppRoutes } from '@/services';

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.replace(AppRoutes.HOME);
      } else {
        setIsLoading(false);
      }
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
    <DefaultLayout className="flex flex-col justify-between">
      {children}
    </DefaultLayout>
  );
}
