'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function MobileWarning() {
  const t = useTranslations('Mobile');

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isMobile) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white text-black text-center px-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">{t('mobileVersion')}</h2>
        <p>{t('Pls')}</p>
      </div>
    </div>
  );
}
