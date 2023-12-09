import {AuthErrorCodes} from 'firebase/auth';

export const AuthErrorCodesCustom = {
  ...AuthErrorCodes,
  INVALID_CREDENTIALS: 'auth/invalid-login-credentials' as const,
  USER_NOT_FOUND: 'auth/user-not-found' as const,
};
