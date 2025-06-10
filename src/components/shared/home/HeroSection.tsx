'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { Container, Logo } from '@/components';
import { AppRoutes } from '@/services';
import { Button } from '@heroui/react';
import { User } from '@supabase/supabase-js';

import { ProjectInfoCard, UserWelcomeSection } from './';

interface HeroSectionProps {
  user?: User | null;
}

export const HeroSection = ({ user }: Readonly<HeroSectionProps>) => {
  const t = useTranslations('HomePage');
  const name = user?.user_metadata.full_name;

  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-20">
      <Container size="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-5xl mx-auto"
        >
          <div className="flex flex-col items-center mb-10">
            <div className="flex items-center gap-4 mb-6">
              <Logo className="h-14 w-14" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t('title')}
              </h1>
            </div>
            <p className="text-2xl text-slate-600 mb-8 max-w-3xl">
              {t('description')}
            </p>

            {!user && (
              <Button
                as={Link}
                href={AppRoutes.HOME}
                size="lg"
                className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
              >
                {t('getStarted')}
              </Button>
            )}
          </div>
          <ProjectInfoCard />
          {user && <UserWelcomeSection name={name} />}
        </motion.div>
      </Container>
    </section>
  );
};
