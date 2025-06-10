import { vi } from 'vitest';

import Home from '@/app/[locale]/(utility)/about/page';
import { render, screen, waitFor } from '@testing-library/react';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
}));

vi.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user: null } }),
      onAuthStateChange: vi.fn(),
    },
  },
}));

vi.mock('@/hooks', () => ({
  useAuth: () => null,
}));

vi.mock('@/components', () => ({
  Preloader: () => <div>Preloader</div>,
  HeroSection: () => <div>Hero</div>,
  FeaturesSection: () => <div>Features</div>,
  TechnologiesSection: () => <div>Tech</div>,
  TeamSection: () => <div>Team</div>,
  GetStartedSection: () => <div>Start</div>,
}));

describe('Home page', () => {
  it('renders all sections', async () => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Hero')).toBeInTheDocument();
      expect(screen.getByText('Features')).toBeInTheDocument();
      expect(screen.getByText('Tech')).toBeInTheDocument();
      expect(screen.getByText('Team')).toBeInTheDocument();
      expect(screen.getByText('Start')).toBeInTheDocument();
    });
  });
});
