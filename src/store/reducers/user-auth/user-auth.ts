import { AuthorizationStatus } from '../../../types/enum';
import { UserAuth } from '../../../types/state';
import { Actions, ActionType } from '../../../types/action';
import { AuthInfo } from '../../../types/types';
import { AuthInfoUnknown } from '../../../types/const';

const initialState: UserAuth = {
  authorizationStatus: AuthorizationStatus.Unknown,
  authInfo: AuthInfoUnknown,
};

const userAuth = (state = initialState, action: Actions): UserAuth => {
  switch (action.type) {
    case ActionType.RequireAuthorization:
      return {...state, authorizationStatus: action.payload as AuthorizationStatus};
    case ActionType.RequireLogout:
      return {...state, authorizationStatus: AuthorizationStatus.NoAuth};
    case ActionType.RequireAuthInfo:
      return { ...state, authInfo: action.payload as AuthInfo };
    case ActionType.RequireUnknown:
      return {...state, authorizationStatus: action.payload as AuthorizationStatus};
    default:
      return state;
  }
};

export {userAuth};
