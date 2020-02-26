import { Action } from '@ngrx/store';
import { Poll } from './poll.model';

export const POLL_CREATED = '[POLLS] Poll Created';

export class PollCreated implements Action {
  readonly type = POLL_CREATED;

  constructor(public payload: Poll) {}
}

export type PollsActions = PollCreated;
