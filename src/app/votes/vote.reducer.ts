import { VoteData } from './vote.model';
import { VoteActions, CREATE_VOTE_DATA, CAST_VOTE } from './vote.actions';

export interface State {
  voteData: VoteData[];
}

const initialState = {
  voteData: null
};

export function voteReducer(state = initialState, action: VoteActions) {
  switch (action.type) {
    case CREATE_VOTE_DATA:
      return {
        ...state,
        voteData: action.payload
      };
    case CAST_VOTE:
      return { ...state, voteDate: state.voteData.map((data, index) => {
        if (action.payload === data.answer) {
          data = {...data, voteCount: state.voteData[index].voteCount += 1};
        }
        return data;
      })};
    default:
      return state;
  }
}

export const getVoteData = (state: State) => state.voteData;
