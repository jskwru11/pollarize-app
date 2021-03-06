import { Action } from '@ngrx/store';
import { User } from './user.model';

export const LOGIN = '[AUTH] LOGIN';
export const LOGOUT = '[AUTH] LOGOUT';

export class Login implements Action {
  readonly type = LOGIN;

  constructor(public payload?: User) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export type AuthActions = Login | Logout;
