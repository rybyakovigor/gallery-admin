import { useState } from 'react';

interface UseRequest {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  request: (requestHandler: (props: any) => Promise<any>, props: any, callback: () => void) => void;
  error: string | null;
  isLoading: boolean;
  clearError: () => void;
}

export function useRequest(): UseRequest {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const request = (requestHandler: (props: any) => Promise<any>, props: any, callback: () => void): void => {
    setError(null);
    setIsLoading(true);
    requestHandler(props)
      .then(() => callback())
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  };

  const clearError = (): void => setError(null);

  return { error, isLoading, request, clearError };
}
