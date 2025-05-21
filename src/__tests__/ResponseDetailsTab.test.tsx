import { render, screen } from '@testing-library/react';
import { ResponseDetailsTab } from '@/components/shared/response-viewer/parts/ResponseDetailsTab';
import { vi } from 'vitest';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('ResponseDetailsTab', () => {
  it('renders status and headers', () => {
    render(
      <ResponseDetailsTab
        statusCode={200}
        statusText="OK"
        headers={[{ key: 'Content-Type', value: 'application/json' }]}
      />
    );

    expect(screen.getByText('status')).toBeInTheDocument();
    expect(screen.getByText('200 OK')).toBeInTheDocument();
    expect(screen.getByText('headers')).toBeInTheDocument();
    expect(screen.getByText('Content-Type:')).toBeInTheDocument();
    expect(screen.getByText('application/json')).toBeInTheDocument();
  });

  it('renders fallback text for missing status', () => {
    render(<ResponseDetailsTab headers={[]} />);

    expect(screen.getByText('noStatus')).toBeInTheDocument();
    expect(screen.getByText('headersEmpty')).toBeInTheDocument();
  });
});
