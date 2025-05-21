import { vi } from 'vitest';

vi.mock('next/navigation', () => {
  const notFoundMock = vi.fn();
  return {
    notFound: notFoundMock,
    __esModule: true,
    _mock: { notFoundMock },
  };
});

import CatchAllPage from '@/app/[locale]/[...rest]/page';

describe('CatchAllPage', () => {
  it('calls notFound', async () => {
    const { notFound } = vi.mocked(await import('next/navigation'));
    const notFoundMock = notFound as unknown as jest.Mock;

    CatchAllPage();

    expect(notFoundMock).toHaveBeenCalled();
  });
});
