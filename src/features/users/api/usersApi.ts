import { baseApi } from '@/shared/api/baseApi.ts';
import type {
  ActionResponse,
  GetTableRequest,
  GetTableResponse,
  IdsRequest
} from "@/features/users/types/userApiTypes.ts";


export const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTable: build.query<GetTableResponse, GetTableRequest>({
      query: (body) => ({
        url: '/users/get-table',
        method: 'POST',
        body,
      }),
      providesTags: ['UsersTable'],
    }),
    block: build.mutation<ActionResponse, IdsRequest>({
      query: (body) => ({
        url: '/users/block',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['UsersTable'],
    }),
    unblock: build.mutation<ActionResponse, IdsRequest>({
      query: (body) => ({
        url: '/users/unblock',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['UsersTable'],
    }),
    deleteUsers: build.mutation<ActionResponse, IdsRequest>({
      query: (body) => ({
        url: '/users/delete',
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['UsersTable'],
    }),
    deleteUnverified: build.mutation<ActionResponse, void>({
      query: () => ({
        url: '/users/delete-unverified',
        method: 'DELETE',
      }),
      invalidatesTags: ['UsersTable'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTableQuery,
  useBlockMutation,
  useUnblockMutation,
  useDeleteUsersMutation,
  useDeleteUnverifiedMutation,
} = usersApi;
