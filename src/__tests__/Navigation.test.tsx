import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

const mockReplace = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: mockReplace }),
  useSelectedLayoutSegment: () => null,
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('@/hooks', () => ({
  useAuth: () => true,
}));

vi.mock('@/lib', () => ({
  supabase: {
    auth: {
      signOut: vi.fn(),
    },
  },
}));

vi.mock('@/components/ui/Logo', () => ({
  Logo: ({ className }: { className: string }) => (
    <div className={className}>Logo</div>
  ),
}));

vi.mock('@/components/shared/LocaleSwitcher', () => ({
  LocaleSwitcher: () => <div>LocaleSwitcher</div>,
}));

vi.mock('@/components/shared/AuthButtons', () => ({
  AuthButtons: () => <div>AuthButtons</div>,
}));

vi.mock('@heroui/react', () => ({
  Button: ({
    onPress,
    children,
  }: {
    onPress: () => void;
    children: React.ReactNode;
  }) => <button onClick={onPress}>{children}</button>,
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

import { Navigation } from '@/components/shared/Navigation';

describe('Navigation', () => {
  it('renders logo, locale switcher and sign out when user exists', () => {
    render(<Navigation />);
    expect(screen.getByText('Logo')).toBeInTheDocument();
    expect(screen.getByText('LocaleSwitcher')).toBeInTheDocument();
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
    expect(screen.getByText('home')).toBeInTheDocument();
  });

  it('calls signOut and router.replace on sign out click', () => {
    render(<Navigation />);
    fireEvent.click(screen.getByText('Sign Out'));
    expect(mockReplace).toHaveBeenCalled();
  });
});
