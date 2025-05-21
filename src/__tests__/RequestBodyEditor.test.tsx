import { render } from '@testing-library/react';
import { vi } from 'vitest';

vi.mock('@monaco-editor/react', () => ({
  Editor: ({
    onMount,
    onChange,
  }: {
    onMount: () => void;
    onChange: () => void;
  }) => {
    onMount();
    onChange('{"test": 123}');
    return <div data-testid="monaco-editor">Monaco</div>;
  },
}));

import { RequestBodyEditor } from '@/components/shared/request-panel/parts/RequestBodyEditor';

describe('RequestBodyEditor', () => {
  it('calls onMount and onChange callbacks', () => {
    const onMount = vi.fn();
    const onChange = vi.fn();

    render(
      <RequestBodyEditor
        value="{}"
        language="json"
        onMount={onMount}
        onChange={onChange}
      />
    );

    expect(onMount).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith('{"test": 123}');
  });
});
