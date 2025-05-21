import { vi } from 'vitest';

vi.mock('next-intl/server', () => ({
  setRequestLocale: vi.fn(),
}));
vi.mock('next/navigation', async () => {
  const actual =
    await vi.importActual<typeof import('next/navigation')>('next/navigation');
  return {
    ...actual,
    useRouter: () => ({
      push: vi.fn(),
    }),
    notFound: vi.fn(),
  };
});

vi.mock('next/font/google', () => ({
  JetBrains_Mono: () => ({
    className: 'mocked-font',
    variable: '--mocked-font',
  }),
}));
vi.mock('next-intl', () => ({
  hasLocale: () => true,
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));
vi.mock('@/components', () => ({
  Header: () => <div>Header</div>,
  Footer: () => <div>Footer</div>,
}));
vi.mock('@/components/shared/MobileWarning', () => ({
  default: () => <div>MobileWarning</div>,
}));

import LocaleLayout from '@/app/[locale]/layout';
import { render, screen } from '@testing-library/react';

describe('LocaleLayout', () => {
  it('renders layout with children', async () => {
    const layout = await LocaleLayout({
      children: <div>Test</div>,
      params: Promise.resolve({ locale: 'en' }),
    });

    render(layout);

    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
    expect(screen.getByText('MobileWarning')).toBeInTheDocument();
  });
});
