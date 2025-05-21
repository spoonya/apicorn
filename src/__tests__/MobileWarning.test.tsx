import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) =>
    key === 'mobileVersion' ? 'Mobile Version' : 'Please use a desktop',
}));

beforeEach(() => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: 500,
  });
  window.dispatchEvent(new Event('resize'));
});

import MobileWarning from '@/components/shared/MobileWarning';

describe('MobileWarning', () => {
  it('shows message when screen is mobile size', () => {
    render(<MobileWarning />);
    expect(screen.getByText('Mobile Version')).toBeInTheDocument();
    expect(screen.getByText('Please use a desktop')).toBeInTheDocument();
  });

  it('renders nothing on desktop', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
    window.dispatchEvent(new Event('resize'));
    render(<MobileWarning />);
    expect(screen.queryByText('Mobile Version')).toBeNull();
  });
});
