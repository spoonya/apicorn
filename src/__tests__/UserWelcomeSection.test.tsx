import { render, screen } from '@testing-library/react';
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
  useTranslations: () => (key: string, values?: Record<string, string>) =>
    key === 'welcomeBack' && values ? `${key}, ${values.name}` : key,
}));

vi.mock('framer-motion', async () => {
  const actual =
    await vi.importActual<typeof import('framer-motion')>('framer-motion');
  return {
    ...actual,
    motion: {
      div: ({ children, ...props }: { children: React.ReactNode }) => (
        <div {...props}>{children}</div>
      ),
    },
  };
});

vi.mock('@/components/shared/home/parts/NavigationButtons', () => ({
  NavigationButtons: () => <div data-testid="nav-buttons">NavButtons</div>,
}));

import { UserWelcomeSection } from '@/components/shared/home/parts/UserWelcomeSection';

describe('UserWelcomeSection', () => {
  it('renders welcome message and navigation buttons', () => {
    render(<UserWelcomeSection name="Alice" />);
    expect(screen.getByText('welcomeBack, Alice')).toBeInTheDocument();
    expect(screen.getByTestId('nav-buttons')).toBeInTheDocument();
  });
});
