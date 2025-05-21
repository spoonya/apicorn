import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

const formatDocumentMock = vi.fn();

import { forwardRef } from 'react';

vi.mock('@/components/shared/request-panel/parts/RequestBodyEditor', () => ({
  RequestBodyEditor: forwardRef((_props, ref) => {
    if (ref) {
      if (ref && 'current' in ref) {
        ref.current = { formatDocument: formatDocumentMock };
      }
    }
    return <div data-testid="editor">Editor</div>;
  }),
}));

import { RequestBodyTab } from '@/components/shared/request-panel/parts/RequestBodyTab';

describe('RequestBodyTab', () => {
  it('renders editor and formats on Zap click', () => {
    const onChange = vi.fn();
    const onFormatChange = vi.fn();

    render(
      <RequestBodyTab
        body="{}"
        bodyFormat="json"
        onBodyChange={onChange}
        onBodyFormatChange={onFormatChange}
      />
    );

    expect(screen.getByTestId('editor')).toBeInTheDocument();

    const zapButton = screen
      .getAllByRole('button')
      .find((btn) => btn.querySelector('svg.lucide-zap'));

    expect(zapButton).toBeDefined();
    zapButton && fireEvent.click(zapButton);

    expect(formatDocumentMock).toHaveBeenCalled();
  });
});
