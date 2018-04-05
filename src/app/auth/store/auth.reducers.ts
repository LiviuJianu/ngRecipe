import * as AuthActionsExports from './auth.actions';
export interface State {
  token: string;
  authenticated: boolean;
}

const initialState: State = {
    token: null,
    authenticated: false
  };

export function authReducer(state = initialState, action: AuthActionsExports.AuthActions) {
  switch (action.type) {
    case (AuthActionsExports.SIGNUP):
    case (AuthActionsExports.SIGNIN):
      return {
        ...state,
        authenticated: true
      };
    case (AuthActionsExports.LOGOUT):
      return {
        ...state,
        token: null,
        authenticated: false
      };
    default:
      return state;
  }
}
