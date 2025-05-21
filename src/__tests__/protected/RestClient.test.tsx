import { vi } from 'vitest';

import RestClient from '@/app/[locale]/(protected)/rest-client/page';
import { render, screen } from '@testing-library/react';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock('@/components', () => ({
  Sidebar: () => <div>Sidebar</div>,
  RequestSearch: () => <div>RequestSearch</div>,
  RequestPanel: () => <div>RequestPanel</div>,
  CodeGenPreview: () => <div>CodeGenPreview</div>,
  ResponseViewer: () => <div>ResponseViewer</div>,
}));

vi.mock('next-intl', () => ({
  useLocale: () => 'en',
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock('@/hooks', () => ({
  useRequestConfig: () => ({
    method: 'GET',
    url: '',
    body: '',
    headers: [],
    setMethod: vi.fn(),
    setUrl: vi.fn(),
    setBody: vi.fn(),
    setHeaders: vi.fn(),
  }),
  useRequestExecutor: () => ({
    execute: vi.fn(),
    response: null,
    error: null,
  }),
}));

vi.mock('@/utils/urlParams', () => ({
  encodeRequestToUrl: () => 'encodedRequest',
  decodeRequestFromUrl: () => null,
}));

vi.mock('@/lib/getStoredVariables', () => ({
  getStoredVariables: () => [],
}));

vi.mock('@/lib/applyVariables', () => ({
  applyVariables: (_: string) => _,
}));

vi.mock('@/utils/storage', () => ({
  saveRequestToHistory: vi.fn(),
}));

vi.mock('@/hooks/useDebouncedEffect', () => ({
  useDebouncedEffect: (fn: () => void) => fn(),
}));

describe('RestClient', () => {
  it('renders all main blocks', () => {
    render(<RestClient />);

    expect(screen.getByText('Sidebar')).toBeInTheDocument();
    expect(screen.getByText('RequestSearch')).toBeInTheDocument();
    expect(screen.getByText('RequestPanel')).toBeInTheDocument();
    expect(screen.getByText('CodeGenPreview')).toBeInTheDocument();
    expect(screen.getByText('ResponseViewer')).toBeInTheDocument();
  });
});
