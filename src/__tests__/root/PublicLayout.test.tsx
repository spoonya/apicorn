import PublicLayout from '@/app/[locale]/(utility)/layout';
import { render, screen } from '@testing-library/react';

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
