import type { ApiErrorType } from "@/features/auth/types/authApiTypes.ts";

export type UserId = number | string;

export type UserRowType = {
  id: UserId;
  name: string;
  email: string;
  createdAt: string;
  lastLoginAt: string | null;
  isBlocked: boolean;
  emailVerified: boolean;
};

export type GetTableRequest = {
  limit?: number;
  offset?: number;
};

export type GetTableResponse =
  | {
  ok: true;
  rows: UserRowType[];
  limit: number;
  offset: number;
}
  | ApiErrorType;

export type IdsRequest = {
  ids: number[];
};

export type ActionResponse =
  | {
  ok: true;
  message: string;
  updatedCount?: number;
  deletedCount?: number;
}
  | ApiErrorType;

export type UsersSelectionState = {
  selectedIds: number[];
};
