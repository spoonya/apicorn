import { render, screen } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

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

import { TechnologyCard } from '@/components/shared/home/parts/TechnologyCard';

describe('TechnologyCard', () => {
  it('renders tech icon, name, and translated description', () => {
    const IconMock = React.forwardRef<SVGSVGElement>((props, ref) => (
      <svg {...props} ref={ref} data-testid="tech-icon" />
    ));
    const tech = {
      name: 'TypeScript',
      key: 'typescript',
      icon: IconMock,
    };

    render(<TechnologyCard tech={tech} index={1} />);

    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('technologiesList.typescript')).toBeInTheDocument();
    expect(screen.getByTestId('tech-icon')).toBeInTheDocument();
  });
});
