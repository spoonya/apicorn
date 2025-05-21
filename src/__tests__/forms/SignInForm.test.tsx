import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('@/lib/supabase', () => {
  return {
    supabase: {
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: null } }),
        signInWithPassword: vi.fn().mockResolvedValue({ error: null }),
      },
    },
  };
});

vi.mock('@heroui/input', () => ({
  Input: ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }) => (
    <div>
      <label>{label}</label>
      <input value={value} onChange={onChange} aria-label={label} />
    </div>
  ),
}));

vi.mock('@heroui/react', () => ({
  Button: ({ children, ...props }: { children: React.ReactNode }) => (
    <button {...props}>{children}</button>
  ),
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock('@/components', () => ({
  Preloader: () => <div>Loading...</div>,
}));

import { SignInForm } from '@/components/shared/forms/SignInForm';
import { supabase } from '@/lib/supabase';

describe('SignInForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders and logs in successfully', async () => {
    render(<SignInForm />);
    await waitFor(() => screen.getByText('Sign In Auth'));

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password' },
    });
    fireEvent.click(screen.getByText('Sign In'));

    await waitFor(() => {
      expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password',
      });
    });
  });

  it('shows error message on failed login', async () => {
    vi.mocked(supabase.auth.signInWithPassword).mockResolvedValueOnce({
      error: { message: 'Invalid credentials' },
    });

    render(<SignInForm />);
    await waitFor(() => screen.getByText('Sign In Auth'));

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'wrongpass' },
    });
    fireEvent.click(screen.getByText('Sign In'));

    await waitFor(() => {
      expect(screen.getByText('wrongPassowrdOrEmail')).toBeInTheDocument();
    });
  });
});
