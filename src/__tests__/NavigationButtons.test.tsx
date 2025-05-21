import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('@heroui/react', () => ({
  Link: ({
    href,
    children,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    className: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

vi.mock('@/data', () => ({
  welcomeNavButtons: [
    {
      key: 'docs',
      route: '/docs',
      icon: () => <svg data-testid="icon-docs" />,
      color: 'bg-blue-600',
    },
    {
      key: 'examples',
      route: '/examples',
      icon: () => <svg data-testid="icon-examples" />,
      color: 'bg-purple-600',
    },
  ],
}));

import { NavigationButtons } from '@/components/shared/home/parts/NavigationButtons';

describe('NavigationButtons', () => {
  it('renders navigation links with icons and translated labels', () => {
    render(<NavigationButtons />);

    expect(screen.getByText('docs')).toBeInTheDocument();
    expect(screen.getByText('examples')).toBeInTheDocument();
    expect(screen.getByTestId('icon-docs')).toBeInTheDocument();
    expect(screen.getByTestId('icon-examples')).toBeInTheDocument();
  });
});
