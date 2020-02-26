import { AuthActions, LOGIN, LOGOUT } from './auth.actions';
import { User } from './user.model';

export interface State {
  isAuthenticated: boolean;
  user: User;
}

const initialState = {
  isAuthenticated: false,
  user: null
};

export const authReducer = (state = initialState, action: AuthActions) => {
  switch (action.type) {
    case LOGIN:
      return {
        isAuthenticated: true,
        user: {...action.payload}
      };
    case LOGOUT:
      return {
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
};

// create helpers

export const getIsAuthenticated = (state: State) => state.isAuthenticated;
