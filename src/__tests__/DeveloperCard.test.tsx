import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

vi.mock('framer-motion', async () => {
  const actual =
    await vi.importActual<typeof import('framer-motion')>('framer-motion');
  return {
    ...actual,
    motion: {
      div: ({ children, ...props }: { children: React.ReactNode }) => (
        <div {...props}>{children}</div>
      ),
    },
  };
});

vi.mock('lucide-react', () => ({
  Github: () => <span>GitHubIcon</span>,
  Users: () => <span>UsersIcon</span>,
}));

vi.mock('next/image', () => ({
  __esModule: true,
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}));

vi.mock('@heroui/react', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

import { DeveloperCard } from '@/components/shared/home/parts/DeveloperCard';

describe('DeveloperCard', () => {
  it('renders developer with avatar and GitHub link', () => {
    render(
      <DeveloperCard
        developer={{
          name: 'John Doe',
          git: 'https://github.com/johndoe',
          gitName: 'johndoe',
          avatar: '/avatar.png',
        }}
      />
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('johndoe')).toBeInTheDocument();
    expect(screen.getByAltText('John Doe')).toBeInTheDocument();
  });

  it('renders fallback avatar when no image', () => {
    render(
      <DeveloperCard
        developer={{
          name: 'Jane Doe',
          git: 'https://github.com/janedoe',
          gitName: '',
          avatar: '',
        }}
      />
    );

    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('GitHub Profile')).toBeInTheDocument();
    expect(screen.getByText('UsersIcon')).toBeInTheDocument();
  });
});
