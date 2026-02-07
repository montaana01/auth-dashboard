export type ApiErrorType = { ok: false; message: string };

export type AuthUserType = {
  id: number | string;
  email: string;
  emailVerified: boolean;
  isBlocked?: boolean;
  lastLoginAt?: string | null;
};

export type SessionType = {
  id: number | string;
  expiresAt?: string;
};

export type AuthRequest = { email: string; password: string };

export type SignUpResponse =
  | {
  ok: true;
  message: string;
  user: {
    id: number | string;
    email: string;
    createdAt?: string;
    isBlocked?: boolean;
    emailVerified: boolean;
  };
}
  | ApiErrorType;

export type SignInResponse =
  | {
  ok: true;
  message: string;
  user: AuthUserType;
  session: SessionType;
}
  | ApiErrorType;

export type MeResponse =
  | {
  ok: true;
  user: AuthUserType;
  session?: SessionType;
}
  | ApiErrorType;

export type LogoutResponse =
  | {
  ok: true;
  message: string;
}
  | ApiErrorType;

export type VerifyEmailRequest = {
  token: string;
};

export type VerifyEmailResponse =
  | {
  ok: true;
  message: string;
}
  | ApiErrorType;
