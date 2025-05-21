import { vi } from 'vitest';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('@heroui/react', () => ({
  Tabs: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Tab: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock('@/components/shared/request-panel/parts/RequestHeadersTab', () => ({
  RequestHeadersTab: () => <div data-testid="headers-tab">Headers Panel</div>,
}));

vi.mock('@/components/shared/request-panel/parts/RequestBodyTab', () => ({
  RequestBodyTab: () => null,
}));

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

import { render, screen } from '@testing-library/react';
import { RequestPanel } from '@/components/shared/request-panel/RequestPanel';

describe('RequestPanel', () => {
  it('renders headers tab content', () => {
    render(
      <RequestPanel
        headers={[{ key: 'Authorization', value: 'Bearer token' }]}
        body=""
        onBodyChange={vi.fn()}
        onHeadersChange={vi.fn()}
      />
    );

    expect(screen.getByTestId('headers-tab')).toBeInTheDocument();
    expect(screen.getByTestId('headers-tab')).toHaveTextContent(
      'Headers Panel'
    );
  });
});
