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

vi.mock('@/components/shared/home/parts/TechnologyCard', () => ({
  TechnologyCard: ({ tech }: { tech: { name: string } }) => (
    <div>{tech.name}</div>
  ),
}));

vi.mock('@/data', () => ({
  technologies: [
    { name: 'React' },
    { name: 'Next.js' },
    { name: 'TypeScript' },
  ],
}));

import { TechnologiesSection } from '@/components/shared/home/TechnologiesSection';

describe('TechnologiesSection', () => {
  it('renders section title and technology names', () => {
    render(<TechnologiesSection />);
    expect(screen.getByText('technologies')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });
});
