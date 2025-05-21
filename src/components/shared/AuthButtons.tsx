'use client';

import { LogIn, UserPlus } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { AppRoutes } from '@/services';
import { cn } from '@/utils';
import { Link } from '@heroui/react';

interface AuthButtonsProps {
  className?: string;
}

export function AuthButtons({ className }: AuthButtonsProps) {
  const t = useTranslations('Navigation');

  return (
    <div className={cn(className, 'flex items-center gap-2')}>
      <Link
        href={AppRoutes.SIGN_IN}
        className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5 text-sm"
      >
        <LogIn className="w-5 h-5" />
        {t('Sign In')}
      </Link>
      <Link
        href={AppRoutes.SIGN_UP}
        className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1.5 text-sm"
      >
        <UserPlus className="w-5 h-5" />
        {t('Sign Up')}
      </Link>
    </div>
  );
}
