import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
vi.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      getUser: vi.fn(),
      onAuthStateChange: vi.fn(),
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
    },
  },
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

import { RequestHeadersTab } from '@/components/shared/request-panel/parts/RequestHeadersTab';

describe('RequestHeadersTab', () => {
  it('renders and adds a header', () => {
    const setHeaders = vi.fn();

    render(<RequestHeadersTab headers={[]} setHeaders={setHeaders} />);

    expect(screen.getByText('headers')).toBeInTheDocument();
    expect(screen.getByText('addHeader')).toBeInTheDocument();

    fireEvent.click(screen.getByText('addHeader'));

    expect(setHeaders).toHaveBeenCalled();
  });
});
