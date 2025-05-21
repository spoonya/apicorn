import { useTranslations } from 'next-intl';

import { Container } from '@/components';
import { developers } from '@/data';

import { DeveloperCard } from './parts/DeveloperCard';

export const TeamSection = () => {
  const t = useTranslations('HomePage');

  return (
    <section className="pb-20 bg-slate-50">
      <Container size="lg">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">
          {t('team')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {developers.map((dev, index) => (
            <DeveloperCard
              key={dev.name}
              developer={{
                ...dev,
                name: t(`teamMembers.${dev.name}`),
              }}
              animationDelay={index * 0.1}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};
