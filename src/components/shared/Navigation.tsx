'use client';

import { AppRoutes } from '@/services';
import { Link } from '@heroui/react';

import { Logo } from '../ui';
import { LocaleSwitcher } from './LocaleSwitcher';

export function Navigation() {
  return (
    <div className="sticky top-0 z-50">
      <div className="max-w-8xl mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 max-w-fit">
            <Link
              href={AppRoutes.HOME}
              className="flex items-center gap-2 transition-all duration-300 hover:opacity-80"
            >
              <Logo className="h-9 w-9" />
              <span className="font-bold text-slate-800 text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Apicorn
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <LocaleSwitcher />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
