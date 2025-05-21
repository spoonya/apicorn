'use client';

import { DeveloperInfo } from '@/types';
import { Link } from '@heroui/react';

export const DeveloperItem = ({ developer }: { developer: DeveloperInfo }) => {
  return (
    <Link
      isExternal
      href={developer.git}
      className="text-sm text-slate-600 hover:text-blue-600 px-2 transition-colors"
    >
      {developer.gitName}
    </Link>
  );
};
