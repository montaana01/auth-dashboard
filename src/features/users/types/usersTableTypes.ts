import type {ActionResponse, UserRowType} from "@/features/users/types/userApiTypes.ts";

export type TableUserRow = Omit<UserRowType, 'id'> & { id: number };

export type Snack = { open: boolean; severity: 'success' | 'error'; text: string };
export type ActionSuccess = Extract<ActionResponse, { ok: true }>;
