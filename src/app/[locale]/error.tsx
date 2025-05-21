'use client';

import { Button } from '@heroui/react';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: Readonly<ErrorProps>) {
  return (
    <div>
      <h2>Error</h2>
      <pre>{error.message}</pre>
      <Button onPress={() => reset()}>Try again</Button>
    </div>
  );
}
