import { cn } from '@/utils';

interface DefaultLayoutProps {
  className?: string;
  children: React.ReactNode;
}

export function DefaultLayout({ children, className }: DefaultLayoutProps) {
  return (
    <main
      className={cn(
        'flex-1',
        'h-[calc(100vh_-_var(--header-height)_-_var(--footer-height))]',
        'overflow-auto',
        className
      )}
    >
      {children}
    </main>
  );
}
