import { SetMetadata } from '@nestjs/common';

export const AUTH_TEST_KEY = 'auth-test';
export const AuthTest = () => SetMetadata(AUTH_TEST_KEY, true);
