import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { logout } from '@/shared/store/auth/authSlice.ts';

const baseUrl = String(import.meta.env.VITE_API_BASE_URL || '').trim();

const rawBaseQuery = fetchBaseQuery({
  baseUrl,
  credentials: 'include',
  prepareHeaders: (headers) => {
    if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
    return headers;
  },
});

const baseQueryWithAutoLogout: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  const result = await rawBaseQuery(args, api, extraOptions);
  const status = (result as any)?.error?.status;
  if (status === 401 || status === 403) {
    api.dispatch(logout());
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['UsersTable'],
  baseQuery: baseQueryWithAutoLogout,
  endpoints: () => ({}),
});
