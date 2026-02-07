import { baseApi } from '@/shared/api/baseApi.ts';
import type {
  AuthRequest,
  LogoutResponse,
  MeResponse,
  SignInResponse,
  SignUpResponse
} from '../types/authApiTypes';

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation<SignUpResponse, AuthRequest>({
      query: (body) => ({
        url: '/auth/sign-up',
        method: 'POST',
        body,
      }),
    }),
    signIn: build.mutation<SignInResponse, AuthRequest>({
      query: (body) => ({
        url: '/auth/sign-in',
        method: 'POST',
        body,
      }),
    }),
    me: build.query<MeResponse, void>({
      query: () => ({
        url: '/auth/me',
        method: 'GET',
      }),
    }),
    logout: build.mutation<LogoutResponse, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useSignUpMutation, useSignInMutation, useLazyMeQuery, useLogoutMutation } = authApi;
