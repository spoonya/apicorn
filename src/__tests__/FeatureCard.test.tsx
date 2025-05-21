import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

vi.mock('framer-motion', async () => {
  const actual =
    await vi.importActual<typeof import('framer-motion')>('framer-motion');
  return {
    ...actual,
    motion: {
      div: ({ children, ...props }: { children: React.ReactNode }) => (
        <div {...props}>{children}</div>
      ),
    },
  };
});

import { FeatureCard } from '@/components/shared/home/parts/FeatureCard';

describe('FeatureCard', () => {
  it('renders icon, title and description', () => {
    const DummyIcon = React.forwardRef<SVGSVGElement>((props, ref) => (
      <svg data-testid="icon" ref={ref} {...props}>
        Icon
      </svg>
    ));

    render(
      <FeatureCard
        icon={DummyIcon}
        iconClassName="text-blue-600"
        title="Test Feature"
        description="This is a test feature description."
        textColor="text-blue-600"
        iconBgColor="bg-blue-50"
        borderColor="border-blue-100"
        delay={0.1}
      />
    );

    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByText('Test Feature')).toBeInTheDocument();
    expect(
      screen.getByText('This is a test feature description.')
    ).toBeInTheDocument();
  });
});
