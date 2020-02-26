import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUi from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
import * as fromPolls from './polls/polls.reducer';
import * as fromVotes from './votes/vote.reducer';

export interface State {
    ui: fromUi.State;
    auth: fromAuth.State;
    poll: fromPolls.State;
    vote: fromVotes.State;
}


export const reducers: ActionReducerMap<State> = {
    ui: fromUi.uiReducer,
    auth: fromAuth.authReducer,
    poll: fromPolls.pollsReducer,
    vote: fromVotes.voteReducer
};

export const getUiState = createFeatureSelector<fromUi.State>('ui');
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuthenticated = createSelector(getAuthState, fromAuth.getIsAuthenticated);

export const getPollState = createFeatureSelector<fromPolls.State>('poll');
export const getPolls = createSelector(getPollState, fromPolls.getPolls);

export const getVoteState = createFeatureSelector<fromVotes.State>('vote');
export const getVoteData = createSelector(getVoteState, fromVotes.getVoteData);
