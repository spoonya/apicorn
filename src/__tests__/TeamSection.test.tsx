import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('@/components', () => ({
  Container: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="container">{children}</div>
  ),
}));

vi.mock('@/components/shared/home/parts/DeveloperCard', () => ({
  DeveloperCard: ({ developer }: { developer: { name: string } }) => (
    <div>{developer.name}</div>
  ),
}));

vi.mock('@/data', () => ({
  developers: [{ name: 'Alice' }, { name: 'Bob' }, { name: 'Charlie' }],
}));

import { TeamSection } from '@/components/shared/home/TeamSection';

describe('TeamSection', () => {
  it('renders team section title and developer names', () => {
    render(<TeamSection />);
    expect(screen.getByText('team')).toBeInTheDocument();
    expect(screen.getByText('teamMembers.Alice')).toBeInTheDocument();
    expect(screen.getByText('teamMembers.Bob')).toBeInTheDocument();
    expect(screen.getByText('teamMembers.Charlie')).toBeInTheDocument();
  });
});
