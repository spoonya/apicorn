import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user: null } }),
      signUp: vi.fn().mockResolvedValue({ error: null }),
    },
  },
}));

vi.mock('@heroui/input', () => ({
  Input: ({ label, type, ...rest }: { label: string; type: string }) => (
    <div>
      <label>{label}</label>
      <input type={type} aria-label={label} {...rest} />
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

import { SignUpForm } from '@/components/shared/forms/SignUpForm';
import { supabase } from '@/lib/supabase';

describe('SignUpForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('submits form successfully', async () => {
    render(<SignUpForm />);
    await waitFor(() => screen.getByText('Sign Up Auth'));

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'Test@1234' },
    });
    fireEvent.change(screen.getByLabelText('Confirm Password'), {
      target: { value: 'Test@1234' },
    });

    fireEvent.click(screen.getByText('Sign Up'));

    await waitFor(() => {
      expect(supabase.auth.signUp).toHaveBeenCalledWith({
        email: 'john@example.com',
        password: 'Test@1234',
        options: { data: { full_name: 'John Doe' } },
      });
    });
  });

  it('shows validation errors if inputs are invalid', async () => {
    render(<SignUpForm />);
    await waitFor(() => screen.getByText('Sign Up Auth'));

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'invalid' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'abc' },
    });
    fireEvent.change(screen.getByLabelText('Confirm Password'), {
      target: { value: 'def' },
    });

    fireEvent.click(screen.getByText('Sign Up'));

    await waitFor(() => {
      expect(screen.getByText('name')).toBeInTheDocument();
      expect(screen.getByText('email')).toBeInTheDocument();
      expect(screen.getByText('password')).toBeInTheDocument();
      expect(screen.getByText('confirmPassword')).toBeInTheDocument();
    });
  });
});
