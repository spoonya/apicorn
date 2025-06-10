import { History, Rocket, Settings } from 'lucide-react';

import { AppRoutes } from '@/services';

export const welcomeNavButtons = [
  {
    route: AppRoutes.HOME,
    color: 'bg-blue-600',
    icon: Rocket,
    key: 'restClient',
  },
  {
    route: AppRoutes.HISTORY,
    color: 'bg-green-600',
    icon: History,
    key: 'history',
  },
  {
    route: AppRoutes.VARS,
    color: 'bg-purple-600',
    icon: Settings,
    key: 'variables',
  },
];
