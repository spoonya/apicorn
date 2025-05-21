import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

vi.mock('framer-motion', () => ({
  motion: {
    header: ({ children }: { children: React.ReactNode }) => (
      <header>{children}</header>
    ),
  },
  useScroll: () => ({ scrollY: { onChange: vi.fn() } }),
  useTransform: () => '',
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  useSelectedLayoutSegment: () => null,
}));

vi.mock('@/hooks', () => ({
  useAuth: () => null,
}));

vi.mock('@/components/ui/Container', () => ({
  Container: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="container">{children}</div>
  ),
}));

vi.mock('@/components/shared/Navigation', () => ({
  Navigation: () => (
    <nav>
      <img src="/logo.svg" alt="Apicorn" />
      Navigation
    </nav>
  ),
}));

import { Header } from '@/components/shared/Header';

describe('Header', () => {
  it('renders Header with Navigation and Logo inside Container', () => {
    render(<Header />);
    expect(screen.getByTestId('container')).toBeInTheDocument();
    expect(screen.getByAltText('Apicorn')).toBeInTheDocument();
    expect(screen.getByText('Navigation')).toBeInTheDocument();
  });
});
