import { render, screen, fireEvent } from '@testing-library/react';
import { useState } from 'react';
import { vi } from 'vitest';
vi.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      getUser: vi.fn(),
      signOut: vi.fn(),
      onAuthStateChange: vi.fn(),
    },
  },
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('@heroui/react', () => ({
  Select: ({ children, ...props }: { children: React.ReactNode }) => (
    <select {...props}>{children}</select>
  ),
  SelectItem: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    key: string;
  }) => <option value={props.key}>{children}</option>,
  Input: ({
    value,
    onChange,
  }: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }) => <input value={value} onChange={onChange} />,
  Button: ({
    onPress,
    children,
  }: {
    onPress: () => void;
    children: React.ReactNode;
  }) => <button onClick={onPress}>{children}</button>,
}));

import { RequestSearch } from '@/components';

type HttpMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'PATCH'
  | 'HEAD'
  | 'OPTIONS';

describe('RequestSearch', () => {
  it('renders and responds to input, reset and submit', () => {
    const Wrapper = () => {
      const [method, setMethod] = useState<HttpMethod>('GET');
      const [url, setUrl] = useState('');
      const onSubmit = vi.fn();
      const onClickReset = vi.fn();

      return (
        <RequestSearch
          method={method}
          setMethod={setMethod}
          url={url}
          setUrl={setUrl}
          onSubmit={onSubmit}
          onClickReset={onClickReset}
        />
      );
    };

    render(<Wrapper />);

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'https://api.com' },
    });
    expect(screen.getByDisplayValue('https://api.com')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Clear'));
    fireEvent.click(screen.getByText('submit'));

    expect(screen.getByText('Clear')).toBeInTheDocument();
    expect(screen.getByText('submit')).toBeInTheDocument();
  });
});
