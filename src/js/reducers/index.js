import { ActionTypes } from '../actions';

export function loadingReducer(state = false, action) {
  switch (action.type) {
    case ActionTypes.START_LOADING:
    case ActionTypes.REFRESH:
      return true;
    case ActionTypes.ADD_PULL_REQUESTS:
      return false;
    default:
      return state;
  }
}

export function titleReducer(state = '', action) {
  switch (action.type) {
    case ActionTypes.SET_TITLE:
      return action.title;
    default:
      return state;
  }
}

export function reposReducer(state = [], action) {
  switch (action.type) {
    case ActionTypes.SET_REPOS:
      return action.repos;
    default:
      return state;
  }
}

export function pullRequestsReducer(state = [], action) {
  switch (action.type) {
    case ActionTypes.ADD_PULL_REQUESTS:
      return action.pullRequests;
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
    case ActionTypes.SET_FAILED_REPOS:
      return action.failedRepos;
    default:
      return state;
  }
}

export function errorReducer(state = '', action) {
  switch (action.type) {
    case ActionTypes.SET_ERROR:
      return action.error;
    default:
      return state;
  }
}
