'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { Technology } from '@/types/technology';

export const TechnologyCard = ({
  tech,
  index,
}: {
  tech: Technology;
  index: number;
}) => {
  const t = useTranslations('HomePage');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-slate-100"
    >
      <tech.icon className="w-12 h-12 mb-6 text-blue-600" />
      <h3 className="text-2xl font-semibold mb-3 text-slate-800">
        {tech.name}
      </h3>
      <p className="text-slate-600">{t(`technologiesList.${tech.key}`)}</p>
    </motion.div>
  );
};
