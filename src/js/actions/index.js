import axios from 'axios';

export const ActionTypes = {
  ADD_PULL_REQUESTS: 'ADD_PULL_REQUESTS',
  UPDATE_PULL_REQUEST: 'UPDATE_PULL_REQUEST',
  SET_FAILED_REPOS: 'SET_FAILED_REPOS',
  REFRESH: 'REFRESH',
  START_LOADING: 'START_LOADING',
  SET_ERROR: 'SET_ERROR'
};

export function setError(error) {
  return {
    type: ActionTypes.SET_ERROR,
    error
  };
}

export function addPullRequests(pullRequests) {
  return {
    type: ActionTypes.ADD_PULL_REQUESTS,
    pullRequests
  };
}

export function addFailedRepos(failedRepos) {
  return {
    type: ActionTypes.SET_FAILED_REPOS,
    failedRepos
  };
}

export function updatePullRequest(pullRequest) {
  return {
    type: ActionTypes.UPDATE_PULL_REQUEST,
    pullRequest
  };
}

export function addFailedRepo(failedRepo) {
  return {
    type: ActionTypes.ADD_FAILED_REPO,
    failedRepo
  };
}

export function loadPullRequests() {
  return dispatch => {
    dispatch({ type: ActionTypes.START_LOADING });
    return axios.get('/pulls').then(response => {
      dispatch(addPullRequests(response.data));
    });
  };
}

export function refresh() {
  return {
    type: ActionTypes.REFRESH
  };
}
