import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('@heroui/react', () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock('lucide-react', () => ({
  LogIn: () => <span>LogInIcon</span>,
  UserPlus: () => <span>UserPlusIcon</span>,
}));

vi.mock('@/components', () => ({
  Container: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="container">{children}</div>
  ),
}));

import { GetStartedSection } from '@/components/shared/home/GetStartedSection';

describe('GetStartedSection', () => {
  it('renders headline, prompt and auth links', () => {
    render(<GetStartedSection />);

    expect(screen.getByText('getStarted')).toBeInTheDocument();
    expect(screen.getByText('authPrompt')).toBeInTheDocument();
    expect(screen.getByText('Sign In Auth')).toBeInTheDocument();
    expect(screen.getByText('Sign Up Auth')).toBeInTheDocument();
  });
});
