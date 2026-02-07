import type {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import type {SerializedError} from "@reduxjs/toolkit";

export const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError => {
  return typeof error === 'object' && error !== null && 'status' in error;
};

export const isSerializedError = (error: unknown): error is SerializedError => {
  return typeof error === 'object' && error !== null && (
    'message' in error || 'stack' in error || 'name' in error || 'code' in error
  );
};

export const getApiErrorMessage = (error: unknown, fallback: string) => {
  if (isFetchBaseQueryError(error)) {
    const payload = error.data;
    if (payload && typeof payload === 'object' && 'message' in payload && typeof payload.message === 'string') {
      return payload.message;
    }
    if ('error' in error && typeof error.error === 'string') {
      return error.error;
    }
    return fallback;
  }
  if (isSerializedError(error) && typeof error.message === 'string') {
    return error.message;
  }
  if (error instanceof Error) return error.message;
  return fallback;
};
