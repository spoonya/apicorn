'use client';

import { cn } from '@/utils';
import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  title: ReactNode;
  userName: string | null;
};

export function PageLayout({ children, title, userName }: Props) {
  return (
    <div className="relative min-h-screen flex items-center grow flex-col bg-slate-200 py-10">
      <div className="container relative flex items-center justify-center flex-col px-4">
        <h2
          className={cn(
            'title text-2xl font-semibold text-blue-800 leading-tight tracking-tight md:text-4xl pb-3'
          )}
        >
          {title}
        </h2>
        <h1 className="name text-3xl font-semibold leading-tight text-blue-800 tracking-tight md:text-5xl">
          {userName}
        </h1>
      </div>
      <div className="mt-10 text-gray-400 w-full md:text-lg">{children}</div>
    </div>
  );
}
