'use client';

import { useTranslations } from 'next-intl';

import { AppRoutes } from '@/services';
import { Button, Link } from '@heroui/react';

export default function NotFound() {
  const t = useTranslations('404');

  return (
    <main className="flex flex-col items-center justify-center h-screen p-4 text-center">
      <h2>404</h2>
      <p>{t('description')}</p>
      <Button as={Link} href={AppRoutes.HOME} color="primary">
        {t('button')}
      </Button>
    </main>
  );
}
