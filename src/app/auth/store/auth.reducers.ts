import { Ingredient } from '../../shared/ingredient.module';

export interface State {
  token: string;
  authenticated: boolean;
}

const initialState: State = {
    token: null,
    authenticated: false
  };

export function authReducers(state, action) {
  return state;
}
