import { State } from '../../../types/state';
import { NameSpace } from '../../root-reducer';
import { AuthorizationStatus } from '../../../types/enum';
import { AuthInfo } from '../../../types/types';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.UserAuth].authorizationStatus;
export const getAuthInfo = (state: State): AuthInfo  => state[NameSpace.UserAuth].authInfo;
