import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('@monaco-editor/react', () => ({
  Editor: ({ value }: { value: string }) => (
    <div data-testid="monaco">{value}</div>
  ),
}));

import { ResponseViewer } from '@/components/shared/response-viewer/ResponseViewer';

describe('ResponseViewer', () => {
  it('shows error message if provided', () => {
    render(<ResponseViewer error="Server error" />);
    expect(screen.getByText('Server error')).toBeInTheDocument();
  });

  it('renders headers in details tab', async () => {
    render(
      <ResponseViewer
        requestMethod="POST"
        headers={[{ key: 'X-Test', value: '123' }]}
      />
    );

    fireEvent.click(screen.getByText('request POST'));

    expect(await screen.findByText(/X-Test\s*:/)).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();
  });
});
