import { NextIntlClientProvider } from 'next-intl';
import { describe, expect, it, vi } from 'vitest';

import { AuthButtons } from '@/components';
import { DefaultLayout } from '@/layouts';
import { render, screen } from '@testing-library/react';

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

describe('<AuthButtons />', () => {
  it('displays auth buttons', () => {
    render(
      <NextIntlClientProvider locale="en">
        <DefaultLayout children={<AuthButtons />} />
      </NextIntlClientProvider>
    );

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(screen.getByText('Navigation.Sign In')).toBeInTheDocument();
    expect(screen.getByText('Navigation.Sign Up')).toBeInTheDocument();
  });
});
