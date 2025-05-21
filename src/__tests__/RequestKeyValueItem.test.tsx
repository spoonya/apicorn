import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

import { RequestKeyValueItem } from '@/components/shared/request-panel/parts/RequestKeyValueItem';

describe('RequestKeyValueItem', () => {
  const item = {
    id: 'header-1',
    key: 'Content-Type',
    value: 'application/json',
  };

  const updateItem = vi.fn();
  const removeItem = vi.fn();

  it('renders correctly and updates key/value', () => {
    render(
      <RequestKeyValueItem
        item={item}
        index={0}
        updateItem={updateItem}
        removeItem={removeItem}
      />
    );

    const keyInput = screen.getByLabelText('Header key 1') as HTMLInputElement;
    const valueInput = screen.getByLabelText(
      'Header value 1'
    ) as HTMLInputElement;

    expect(keyInput.value).toBe('Content-Type');
    expect(valueInput.value).toBe('application/json');

    fireEvent.change(keyInput, { target: { value: 'Authorization' } });
    expect(updateItem).toHaveBeenCalledWith(
      item.id,
      'Authorization',
      item.value
    );

    fireEvent.change(valueInput, { target: { value: 'Bearer token' } });
    expect(updateItem).toHaveBeenCalledWith(item.id, item.key, 'Bearer token');
  });

  it('calls removeItem when delete button is pressed', () => {
    render(
      <RequestKeyValueItem
        item={item}
        index={0}
        updateItem={updateItem}
        removeItem={removeItem}
      />
    );

    const removeButton = screen.getByLabelText('Remove header 1');
    fireEvent.click(removeButton);

    expect(removeItem).toHaveBeenCalledWith(item.id);
  });
});
