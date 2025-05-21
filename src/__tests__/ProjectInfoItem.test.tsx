import { render, screen } from '@testing-library/react';
import { ProjectInfoItem } from '@/components/shared/home/parts/ProjectInfoItem';

describe('ProjectInfoItem', () => {
  it('renders icon and content correctly', () => {
    render(
      <ProjectInfoItem
        icon={<span data-testid="test-icon">🔥</span>}
        content={<p>Test content</p>}
        bgColor="bg-blue-100"
      />
    );

    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });
});
