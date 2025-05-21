'use client';

import { useTranslations } from 'next-intl';

import { Container } from '@/components';
import { features } from '@/data';

import { FeatureCard } from './';

export const FeaturesSection = () => {
  const t = useTranslations('HomePage');

  return (
    <section className="py-20 bg-white">
      <Container size="lg">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">
          {t('featuresTitle')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              iconClassName={feature.iconClassName}
              textColor={feature.textColor}
              iconBgColor={feature.iconBgColor}
              borderColor={feature.borderColor}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};
