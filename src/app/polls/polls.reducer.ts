import { PollsActions, POLL_CREATED } from './polls.actions';
import { Poll } from './poll.model';

export interface State {
  poll: Poll;
}

const initialState = {
  poll: null
};

export function pollsReducer(state = initialState, action: PollsActions): State {
  switch (action.type) {
    case POLL_CREATED:
      return {
        poll: action.payload
      };
    default:
      return state;
  }
}

export const getPolls = (state: State): Poll => state.poll;

