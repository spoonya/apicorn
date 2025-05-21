import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

vi.mock('@/components', () => ({
  Preloader: () => <div data-testid="preloader">Loading...</div>,
}));

import Loading from '@/app/[locale]/(protected)/variables/loading';

describe('Loading', () => {
  it('renders Preloader', () => {
    render(<Loading />);
    expect(screen.getByTestId('preloader')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
