'use client';

import { cn } from '@/utils';
import { Spinner } from '@heroui/react';

interface PreloaderProps {
  className?: string;
}

export const Preloader = ({ className }: Readonly<PreloaderProps>) => {
  return <Spinner className={cn(className)} variant="wave" size="lg" />;
};
