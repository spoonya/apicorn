import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { NextIntlClientProvider } from 'next-intl';
import { DefaultLayout } from '@/layouts';
import { Footer } from '@/components';

vi.mock('@supabase/supabase-js');
vi.mock('next/navigation', () => ({
  usePathname: () => ({ pathname: '' }),
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => ({ get: () => {} }),
  useServerInsertedHTML: vi.fn(),
}));

describe('<Footer />', () => {
  it('displays footer', () => {
    render(
      <NextIntlClientProvider locale="en">
        <DefaultLayout children={<Footer />} />
      </NextIntlClientProvider>
    );

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(5);
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('spoonya')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
