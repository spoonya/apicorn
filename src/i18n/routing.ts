import { defineRouting } from 'next-intl/routing';

import { locales } from '@/services';
import { Locale } from '@/types';

export const routing = defineRouting({
  locales,
  defaultLocale: process.env.NEXT_PUBLIC_DEFAULT_LOCALE as Locale,
});
