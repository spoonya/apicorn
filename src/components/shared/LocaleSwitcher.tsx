'use client';

import { Globe } from 'lucide-react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

import { languageNames, locales } from '@/services';
import { Locale } from '@/types';
import { cn } from '@/utils';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/react';

interface LocaleSwitcherProps {
  className?: string;
}

export const LocaleSwitcher = ({
  className,
}: Readonly<LocaleSwitcherProps>) => {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale();

  const switchLocale = (newLocale: Locale) => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          isIconOnly
          variant="light"
          size="sm"
          className={cn(
            className,
            'text-slate-600 hover:bg-slate-100 transition-background'
          )}
        >
          <Globe size={18} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Select language"
        className="min-w-[120px]"
        selectionMode="single"
        disallowEmptySelection
        variant="flat"
      >
        {locales.map((locale) => (
          <DropdownItem
            key={locale}
            onPress={() => switchLocale(locale)}
            className={cn(locale === currentLocale && 'bg-slate-100')}
          >
            {languageNames[locale]}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
