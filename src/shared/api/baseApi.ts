import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = String(import.meta.env.VITE_API_BASE_URL || '').trim();

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['UsersTable'],
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: 'include',
    prepareHeaders: (headers) => {
      if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: () => ({}),
});
