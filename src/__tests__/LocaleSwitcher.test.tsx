import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => '/en/page',
}));

vi.mock('next-intl', () => ({
  useLocale: () => 'en',
}));

vi.mock('@heroui/react', () => ({
  Button: ({ children, ...props }: { children: React.ReactNode }) => (
    <button {...props}>{children}</button>
  ),
  Dropdown: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DropdownTrigger: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  DropdownMenu: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DropdownItem: ({
    children,
    onPress,
  }: {
    children: React.ReactNode;
    onPress: () => void;
  }) => (
    <div onClick={onPress} role="option">
      {children}
    </div>
  ),
}));

vi.mock('lucide-react', () => ({
  Globe: () => <span>🌐</span>,
}));

import { LocaleSwitcher } from '@/components/shared/LocaleSwitcher';
import { languageNames, locales } from '@/services';

describe('LocaleSwitcher', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it('renders Globe icon and languages', () => {
    render(<LocaleSwitcher />);

    expect(screen.getByText('🌐')).toBeInTheDocument();

    locales.forEach((locale) => {
      expect(screen.getByText(languageNames[locale])).toBeInTheDocument();
    });
  });

  it('changes locale on language click', () => {
    render(<LocaleSwitcher />);
    const targetLocale = 'ru';

    fireEvent.click(screen.getByText(languageNames[targetLocale]));

    expect(mockPush).toHaveBeenCalledWith('/ru/page');
  });
});
