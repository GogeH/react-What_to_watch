import { datatype, internet } from 'faker';

import { AuthData, AuthInfo, ServerAuthInfo } from '../types/types';

export const createMockAuthInfo = (): AuthInfo => ({
  avatarUrl: internet.url(),
  email: internet.email(),
  id: datatype.number(),
  name: internet.userName(),
  token: datatype.uuid(),
});

export const createMockServerAuthInfo = (): ServerAuthInfo => ({
  'avatar_url': internet.url(),
  email: internet.email(),
  id: datatype.number(),
  name: internet.userName(),
  token: datatype.uuid(),
});

export const createMockAuthData = (): AuthData  => ({
  login: internet.email(),
  password: internet.password(),
});
