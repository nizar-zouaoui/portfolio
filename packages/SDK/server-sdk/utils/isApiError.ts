import { AxiosError } from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isApiError = <T = unknown, D = any>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any
): error is AxiosError<T, D> => {
  if (error instanceof AxiosError) return true;

  return false;
};
