import { vi } from 'vitest';

import Loading from '@/app/[locale]/(utility)/about/loading';
import { render, screen } from '@testing-library/react';

vi.mock('@/components', () => ({
  Preloader: () => <div data-testid="preloader">Loading...</div>,
}));

describe('Loading', () => {
  it('renders Preloader', () => {
    render(<Loading />);
    expect(screen.getByTestId('preloader')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
