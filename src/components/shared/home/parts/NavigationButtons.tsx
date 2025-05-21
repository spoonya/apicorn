'use client';

import { useTranslations } from 'next-intl';

import { welcomeNavButtons } from '@/data';
import { Link } from '@heroui/react';

export const NavigationButtons = () => {
  const t = useTranslations('HomePage');

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {welcomeNavButtons.map((item, index) => (
        <Link
          key={index}
          href={item.route}
          className={`group flex items-center gap-2 ${item.color} hover:${item.color.replace(
            '600',
            '700'
          )} text-white px-6 py-3 rounded-lg transition-all transform hover:-translate-y-1`}
        >
          <span className="text-xl">
            <item.icon className="w-5 h-5" />
          </span>
          <span className="font-medium">{t(item.key)}</span>
        </Link>
      ))}
    </div>
  );
};
