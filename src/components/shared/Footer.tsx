'use client';

import Image from 'next/image';

import { developers } from '@/data';
import { cn } from '@/utils';
import { Link } from '@heroui/react';

import { Container } from '../ui';
import { DeveloperItem } from './DeveloperItem';

export const Footer = ({ className }: { className?: string }) => {
  return (
    <footer
      className={cn(
        className,
        'border-t border-slate-200 py-4 h-max-[var(--footer-height)] h-full'
      )}
    >
      <Container>
        <div className="max-w-8xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {developers.map((developer) => (
              <DeveloperItem key={developer.name} developer={developer} />
            ))}
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="https://github.com/spoonya/rest-client-app"
              className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
              isExternal
            >
              GitHub
            </Link>
            <p className="text-sm text-slate-500">
              &copy; {new Date().getFullYear()}
            </p>
            <Link
              href="https://rs.school/courses/reactjs"
              className="hover:opacity-80 transition-opacity"
              isExternal
            >
              <Image
                src="/logo-rs.svg"
                alt="RS School"
                width={24}
                height={24}
              />
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};
