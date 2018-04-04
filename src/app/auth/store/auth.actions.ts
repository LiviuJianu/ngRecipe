import { Action } from '@ngrx/store';

export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';

export class Signup implements Action {
  type = SIGNUP;
}

export class Signin implements Action {
  type = SIGNIN;
}

export class Logout implements Action {
  type = LOGOUT;
}

export class SetToken implements Action {
  type = SET_TOKEN;

  constructor(public payload: string) {}
}

export type AuthActions = Signup | Signin | Logout | SetToken;
