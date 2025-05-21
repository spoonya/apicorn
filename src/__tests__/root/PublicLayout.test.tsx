import { render, screen } from '@testing-library/react';
import PublicLayout from '@/app/[locale]/(root)/layout';

describe('PublicLayout', () => {
  it('renders children', () => {
    render(
      <PublicLayout>
        <div>Public Content</div>
      </PublicLayout>
    );

    expect(screen.getByText('Public Content')).toBeInTheDocument();
  });
});
