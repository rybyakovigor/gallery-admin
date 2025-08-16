import { useState } from 'react';

interface UseRequest {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  request: (requestHandler: (props: any) => Promise<any>, props: any, callback: (requestResult: any) => void) => void;
  error: string | null;
  isLoading: boolean;
  clearError: () => void;
}

export function useRequest(): UseRequest {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const request = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    requestHandler: (props: any) => Promise<any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback: (requestResult: any) => void
  ): void => {
    setError(null);
    setIsLoading(true);
    requestHandler(props)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((result: any) => callback(result))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  };

  const clearError = (): void => setError(null);

  return { error, isLoading, request, clearError };
}
