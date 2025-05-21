import Image from 'next/image';

import { cn } from '@/utils';

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: Readonly<LogoProps>) => {
  return (
    <div className={cn(className, 'relative')}>
      <Image src="/logo.svg" alt="Apicorn" fill />
    </div>
  );
};
