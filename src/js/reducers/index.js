import { ActionTypes } from '../actions';

export function pullRequestsReducer(state = [], action) {
  switch (action.type) {
    case ActionTypes.ADD_PULL_REQUESTS:
      return [
        ...state,
        ...action.pullRequests
      ];
    case ActionTypes.UPDATE_PULL_REQUEST:
      return state.map(pullRequest => {
        if (pullRequest.id === action.pullRequest.id) {
          return Object.assign(
            {},
            pullRequest,
            action.pullRequest
          );
        }

        return pullRequest;
      });
    default:
      return state;
  }
}

export function failedReposReducer(state = [], action) {
  switch (action.type) {
    case ActionTypes.ADD_FAILED_REPO:
      return [
        ...state,
        action.failedRepo
      ];
    default:
      return state;
  }
}
