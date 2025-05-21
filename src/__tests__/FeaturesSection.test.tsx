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

vi.mock('@/components/shared/home/parts/FeatureCard', () => ({
  FeatureCard: ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  ),
}));

vi.mock('@/data', () => ({
  features: [
    {
      title: 'Feature One',
      description: 'Description one',
      icon: () => null,
      iconClassName: '',
      iconBgColor: '',
      textColor: '',
      borderColor: '',
    },
    {
      title: 'Feature Two',
      description: 'Description two',
      icon: () => null,
      iconClassName: '',
      iconBgColor: '',
      textColor: '',
      borderColor: '',
    },
  ],
}));

import { FeaturesSection } from '@/components/shared/home/FeaturesSection';

describe('FeaturesSection', () => {
  it('renders title and feature cards', () => {
    render(<FeaturesSection />);
    expect(screen.getByText('featuresTitle')).toBeInTheDocument();
    expect(screen.getByText('Feature One')).toBeInTheDocument();
    expect(screen.getByText('Feature Two')).toBeInTheDocument();
  });
});
