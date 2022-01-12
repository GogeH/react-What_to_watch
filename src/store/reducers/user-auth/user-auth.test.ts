import { AuthorizationStatus } from '../../../types/enum';
import { userAuth } from './user-auth';
import { ActionType } from '../../../types/action';
import { createMockAuthInfo } from '../../../mocks/authorizationFake';
import { AuthInfoUnknown } from '../../../types/const';

const mockAuthInfo = createMockAuthInfo();

describe('Reducer: user-auth', ()=> {
  it('without additional parameters should return initial state', ()=> {
    const state = {
      authorizationStatus: AuthorizationStatus.Auth,
      authInfo: AuthInfoUnknown,
    };

    const requiredAuthorizationAction = {
      type: ActionType.RequireUnknown,
      payload: AuthorizationStatus.Unknown,
    };

    expect(userAuth(state, requiredAuthorizationAction))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Unknown,
        authInfo: AuthInfoUnknown,
      });
  });

  it('should update authorizationStatus to "NO_AUTH"', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      authInfo: mockAuthInfo,
    };

    const requiredAuthorizationAction = {
      type: ActionType.RequireAuthorization,
      payload: AuthorizationStatus.NoAuth,
    };

    expect(userAuth(state, requiredAuthorizationAction))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        authInfo: mockAuthInfo,
      });
  });

});
