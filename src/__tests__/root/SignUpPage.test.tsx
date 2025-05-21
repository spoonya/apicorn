import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

vi.mock('@/components', () => ({
  SignUpForm: () => <div>SignUp Form</div>,
}));

vi.mock('@/layouts', () => ({
  DefaultLayout: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

import SignUpPage from '@/app/[locale]/(root)/sign-up/page';

describe('SignUpPage', () => {
  it('renders SignUpForm inside DefaultLayout', () => {
    render(<SignUpPage />);
    expect(screen.getByText('SignUp Form')).toBeInTheDocument();
  });
});
