'use client';

import { ArchiveRestore, History, Variable } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { AppRoutes } from '@/services';
import { cn } from '@/utils';
import { Tooltip } from '@heroui/react';

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const t = useTranslations('Sidebar');

  return (
    <div
      className={cn(
        'w-12 h-full border-r-1 border-r-gray-200 py-6 px-2 flex justify-center',
        className
      )}
    >
      <ul className="nav flex flex-col gap-8">
        <li>
          <Link href={AppRoutes.REST}>
            <Tooltip content={t('restClient')}>
              <ArchiveRestore className="stroke-gray-600 hover:stroke-primary transition-colors outline-none" />
            </Tooltip>
          </Link>
        </li>
        <li>
          <Link href={AppRoutes.HISTORY}>
            <Tooltip content={t('history')}>
              <History className="stroke-gray-600 hover:stroke-primary transition-colors outline-none" />
            </Tooltip>
          </Link>
        </li>
        <li>
          <Link href={AppRoutes.VARS}>
            <Tooltip content={t('variables')}>
              <Variable className="stroke-gray-600 hover:stroke-primary transition-colors outline-none" />
            </Tooltip>
          </Link>
        </li>
      </ul>
    </div>
  );
};
