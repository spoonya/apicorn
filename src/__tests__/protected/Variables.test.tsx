import { vi } from 'vitest';

import Variables from '@/app/[locale]/(root)/variables/page';
import { render, screen } from '@testing-library/react';

vi.mock('@/components/shared/variables/VariableManager', () => ({
  default: () => <div>Variable Manager</div>,
}));

describe('Variables', () => {
  it('renders VariableManager', () => {
    render(<Variables />);
    expect(screen.getByText('Variable Manager')).toBeInTheDocument();
  });
});
