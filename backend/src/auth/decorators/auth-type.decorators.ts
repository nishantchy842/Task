import { SetMetadata } from '@nestjs/common';
import { AuthType } from '../enum/auth-type.enum';

export const AUTH_TYPE_KEY = 'authType';

export const AuthGuard = (...authTypes: AuthType[]) =>
  SetMetadata(AUTH_TYPE_KEY, authTypes);