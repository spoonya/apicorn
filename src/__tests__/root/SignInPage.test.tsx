import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

vi.mock('@/components', () => ({
  SignInForm: () => <div>SignIn Form</div>,
}));

vi.mock('@/layouts', () => ({
  DefaultLayout: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

import SignInPage from '@/app/[locale]/(root)/sign-in/page';

describe('SignInPage', () => {
  it('renders SignInForm inside DefaultLayout', () => {
    render(<SignInPage />);
    expect(screen.getByText('SignIn Form')).toBeInTheDocument();
  });
});
