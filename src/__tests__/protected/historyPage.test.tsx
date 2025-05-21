import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

vi.mock('@/components', () => ({
  Sidebar: () => <div data-testid="sidebar">Sidebar</div>,
}));
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      noHistory: 'No history yet',
      message: 'You have not made any requests.',
      goToClient: 'Go to REST Client',
      delete: 'Clear history',
      history: 'Request History',
    };
    return translations[key] || key;
  },
}));
vi.mock('@/utils/urlParams', () => ({
  encodeRequestToUrl: () => '',
}));
vi.mock('next/link', () => ({
  default: ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => <a href={href}>{children}</a>,
}));

import HistoryPage from '@/app/[locale]/(protected)/history/page';

describe('HistoryPage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('shows message when no history', () => {
    render(<HistoryPage />);
    expect(screen.getByText('No history yet')).toBeInTheDocument();
    expect(
      screen.getByText('You have not made any requests.')
    ).toBeInTheDocument();
    expect(screen.getByText('Go to REST Client')).toBeInTheDocument();
  });

  it('renders history items', () => {
    localStorage.setItem(
      'requests',
      JSON.stringify([{ method: 'GET', url: 'https://api.example.com' }])
    );
    render(<HistoryPage />);
    expect(screen.getByText('Request History')).toBeInTheDocument();
    expect(screen.getByText('GET')).toBeInTheDocument();
    expect(screen.getByText('https://api.example.com')).toBeInTheDocument();
  });

  it('clears history on button click', () => {
    localStorage.setItem(
      'requests',
      JSON.stringify([{ method: 'GET', url: 'https://api.example.com' }])
    );
    render(<HistoryPage />);
    fireEvent.click(screen.getByText('Clear history'));
    expect(localStorage.getItem('requests')).toBeNull();
    expect(screen.getByText('No history yet')).toBeInTheDocument();
  });
});
