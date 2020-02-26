import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import * as AuthActions from './auth.actions';


@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActions.LOGIN),
    tap(action => localStorage.setItem('user', JSON.stringify(action))
      )
    ), {dispatch: false}
  );
  logout$ = createEffect(() =>
    this.actions$
    .pipe(
      ofType(AuthActions.LOGOUT),
        tap(action => {
          localStorage.removeItem('user');
        })
    ), {dispatch: false});

  constructor(private actions$: Actions) {
  }
}
