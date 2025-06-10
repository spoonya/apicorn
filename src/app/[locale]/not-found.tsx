'use client';

import { useTranslations } from 'next-intl';

import { AppRoutes } from '@/services';
import { Button, Link } from '@heroui/react';

export default function NotFound() {
  const t = useTranslations('404');

  return (
    <div className="h-full flex flex-col items-center justify-center p-6">
      <p className="text-8xl font-bold text-gray-800">404</p>
      <div className="space-y-3">
        <h1 className="text-2xl font-semibold text-gray-800 text-center">
          {t('title') || 'Page Not Found'}
        </h1>
        <p className="text-gray-600">
          {t('description') ||
            "The page you're looking for doesn't exist or has been moved."}
        </p>
      </div>
      <Button
        as={Link}
        href={AppRoutes.HOME}
        color="primary"
        className="mt-4 w-48 mx-auto py-3 font-medium rounded-lg transition hover:opacity-90"
      >
        {t('button')}
      </Button>
    </div>
  );
}
