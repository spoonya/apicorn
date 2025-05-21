import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { NavigationButtons } from '../';

interface UserWelcomeSection {
  name: string;
}

export const UserWelcomeSection = ({ name }: Readonly<UserWelcomeSection>) => {
  const t = useTranslations('HomePage');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl shadow-sm border border-slate-200"
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-6 flex items-center gap-3">
          <h2 className="text-3xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t('welcomeBack', { name })}
          </h2>
        </div>
        <NavigationButtons />
      </div>
    </motion.div>
  );
};
