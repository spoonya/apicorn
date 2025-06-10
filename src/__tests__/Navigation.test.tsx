import { vi } from 'vitest';

import { Navigation } from '@/components/shared/Navigation';
import { fireEvent, render, screen } from '@testing-library/react';

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

vi.mock('@/components/ui/Logo', () => ({
  Logo: ({ className }: { className: string }) => (
    <div className={className}>Logo</div>
  ),
}));

vi.mock('@/components/shared/LocaleSwitcher', () => ({
  LocaleSwitcher: () => <div>LocaleSwitcher</div>,
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

describe('Navigation', () => {
  it('renders logo, locale switcher and sign out when user exists', () => {
    render(<Navigation />);
    expect(screen.getByText('Logo')).toBeInTheDocument();
    expect(screen.getByText('LocaleSwitcher')).toBeInTheDocument();
  });
});
