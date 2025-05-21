'use client';

import { LogIn, UserPlus } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Container } from '@/components';
import { AppRoutes } from '@/services';
import { Link } from '@heroui/react';

export const GetStartedSection = () => {
  const t = useTranslations('HomePage');
  const authT = useTranslations('Auth');

  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600">
      <Container size="lg">
        <div className="py-20 text-center max-w-3xl mx-auto text-white">
          <h2 className="text-3xl font-bold mb-6">{t('getStarted')}</h2>
          <p className="text-lg mb-8 opacity-90">{t('authPrompt')}</p>
          <div className="flex justify-center gap-4">
            <Link
              href={AppRoutes.SIGN_IN}
              className="flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-opacity-90 transition-colors font-semibold"
            >
              <LogIn className="w-5 h-5" />
              {authT('Sign In Auth')}
            </Link>
            <Link
              href={AppRoutes.SIGN_UP}
              className="flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold"
            >
              <UserPlus className="w-5 h-5" />
              {authT('Sign Up Auth')}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};
