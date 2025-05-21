import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import NotFound from '@/app/[locale]/not-found';
import { NextIntlClientProvider } from 'next-intl';

describe('<NotFound />', () => {
  it('displays not-found page', () => {
    render(
      <NextIntlClientProvider locale="en">
        <NotFound />
      </NextIntlClientProvider>
    );

    expect(screen.getByText('404')).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /button/i });
    expect(button).toBeInTheDocument();
  });
});
