import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { NextIntlClientProvider } from 'next-intl';
import { DefaultLayout } from '@/layouts';
import { AuthButtons, PageLayout } from '@/components';

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

describe('<PageLayout />', () => {
  it('displays pageLayout', () => {
    render(
      <NextIntlClientProvider locale="en">
        <PageLayout title={'Hello'} userName={'User'} />
      </NextIntlClientProvider>
    );

    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('User')).toBeInTheDocument();
  });
});
