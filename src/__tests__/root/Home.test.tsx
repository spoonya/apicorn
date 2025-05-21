import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock('@/lib', () => ({
  supabase: {
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user: null } }),
    },
  },
}));

vi.mock('@/hooks', () => ({
  useAuth: () => null,
}));

vi.mock('@/components', () => ({
  Preloader: () => <div>Preloader</div>,
  HeroSection: ({ user }: { user: unknown }) => (
    <div>Hero {user ? 'User' : 'Guest'}</div>
  ),
  FeaturesSection: () => <div>Features</div>,
  TechnologiesSection: () => <div>Technologies</div>,
  TeamSection: () => <div>Team</div>,
  GetStartedSection: () => <div>Get Started</div>,
}));

import Home from '@/app/[locale]/(root)/page';

describe('Home', () => {
  it('renders Preloader while loading, then shows content', async () => {
    render(<Home />);
    expect(screen.getByText('Preloader')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Hero Guest')).toBeInTheDocument();
      expect(screen.getByText('Features')).toBeInTheDocument();
      expect(screen.getByText('Technologies')).toBeInTheDocument();
      expect(screen.getByText('Team')).toBeInTheDocument();
      expect(screen.getByText('Get Started')).toBeInTheDocument();
    });
  });
});
