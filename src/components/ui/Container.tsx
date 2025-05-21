import { cn } from '@/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'lg';
}

export const Container = ({
  children,
  className,
  size,
}: Readonly<ContainerProps>) => {
  return (
    <div
      className={cn(
        'mx-auto px-6 w-full',
        size === 'lg' && 'max-w-[1920px]',
        size === 'lg' && 'px-11',
        className
      )}
    >
      {children}
    </div>
  );
};
