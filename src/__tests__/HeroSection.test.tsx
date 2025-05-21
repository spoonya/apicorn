import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('framer-motion', async () => {
  const actual =
    await vi.importActual<typeof import('framer-motion')>('framer-motion');
  return {
    ...actual,
    motion: {
      div: ({ children }: { children: React.ReactNode }) => (
        <div>{children}</div>
      ),
    },
  };
});

vi.mock('@/components', () => ({
  Container: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="container">{children}</div>
  ),
  Logo: ({ className }: { className: string }) => (
    <div className={className}>Logo</div>
  ),
}));

vi.mock('@/components/shared/home/parts/ProjectInfoCard', () => ({
  ProjectInfoCard: () => <div>ProjectInfoCard</div>,
}));

vi.mock('@/components/shared/home/parts/UserWelcomeSection', () => ({
  UserWelcomeSection: ({ name }: { name?: string }) => (
    <div>Welcome, {name}</div>
  ),
}));

import { HeroSection } from '@/components/shared/home/HeroSection';

describe('HeroSection', () => {
  it('renders title, description and logo', () => {
    render(<HeroSection />);
    expect(screen.getByText('title')).toBeInTheDocument();
    expect(screen.getByText('description')).toBeInTheDocument();
    expect(screen.getByText('ProjectInfoCard')).toBeInTheDocument();
    expect(screen.getByText('Logo')).toBeInTheDocument();
  });

  it('renders welcome section when user is passed', () => {
    render(
      <HeroSection
        user={{
          id: '1',
          app_metadata: {},
          aud: 'aud',
          created_at: '2023-01-01',
          user_metadata: { full_name: 'Alice' },
        }}
      />
    );
    expect(screen.getByText('Welcome, Alice')).toBeInTheDocument();
  });
});
