import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

vi.mock('@/components/shared/variables/VariableManager', () => ({
  default: () => <div>Variable Manager</div>,
}));

import Variables from '@/app/[locale]/(protected)/variables/page';

describe('Variables', () => {
  it('renders VariableManager', () => {
    render(<Variables />);
    expect(screen.getByText('Variable Manager')).toBeInTheDocument();
  });
});
