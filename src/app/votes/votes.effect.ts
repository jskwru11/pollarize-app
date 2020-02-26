import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import * as VotesActions from './vote.actions';

@Injectable()
export class VotesEffect {
  voteCount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VotesActions.CAST_VOTE),
      tap(action => localStorage.setItem('vote', JSON.stringify(action)))
    ), {dispatch: false});

  constructor(private actions$: Actions) {}
}
