'use client';

import { useTranslations } from 'next-intl';

import { Container } from '@/components';
import { technologies } from '@/data';

import { TechnologyCard } from './';

export const TechnologiesSection = () => {
  const t = useTranslations('HomePage');

  return (
    <section className="py-20 bg-slate-50">
      <Container size="lg">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">
          {t('technologies')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech, index) => (
            <TechnologyCard key={tech.name} tech={tech} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
};
