import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { NextIntlClientProvider } from 'next-intl';
import { DefaultLayout } from '@/layouts';
import { AuthButtons, Sidebar } from '@/components';

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

describe('<Sidebar />', () => {
  it('displays sidebar', () => {
    render(
      <NextIntlClientProvider locale="en">
        <DefaultLayout children={<Sidebar />} />
      </NextIntlClientProvider>
    );

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
  });
});
