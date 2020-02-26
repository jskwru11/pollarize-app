import { Action } from '@ngrx/store';

import { VoteData } from './vote.model';

export const CREATE_VOTE_DATA = '[VOTE] Vote Data Created';
export const CAST_VOTE = '[VOTE] Cast Vote';

export class CreateVoteData implements Action {
  readonly type = CREATE_VOTE_DATA;

  constructor(public payload: VoteData[]) {}
}

export class CastVote implements Action {
  readonly type = CAST_VOTE;

  constructor(public payload: string) {}
}

export type VoteActions = CreateVoteData | CastVote;
