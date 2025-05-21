import { render, screen, fireEvent } from '@testing-library/react';
import Error from '@/app/[locale]/error';
import { describe, it, expect, vi } from 'vitest';

describe('<Error />', () => {
  it('displays an error message and calls reset on click', () => {
    const mockReset = vi.fn();
    const testError = { name: 'TestError', message: 'Something went wrong' };

    render(<Error error={testError} reset={mockReset} />);

    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText(testError.message)).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /try again/i });
    fireEvent.click(button);

    expect(mockReset).toHaveBeenCalledTimes(1);
  });
});
