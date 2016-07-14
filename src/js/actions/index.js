import { getAllPullRequests } from '../api/githubService';

import config from '../../config/config.json';

export const ActionTypes = {
  ADD_PULL_REQUESTS: 'ADD_PULL_REQUESTS',
  UPDATE_PULL_REQUEST: 'UPDATE_PULL_REQUEST',
  ADD_FAILED_REPO: 'ADD_FAILED_REPO',
  REFRESH: 'REFRESH',
  START_LOADING: 'START_LOADING'
};

export function addPullRequests(pullRequests) {
  return {
    type: ActionTypes.ADD_PULL_REQUESTS,
    pullRequests
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
    return getAllPullRequests(config.repos)
      .then(pullRequestData => {
        dispatch(addPullRequests(pullRequestData.pullRequests));
      });
  };
}

export function refresh() {
  return dispatch => {
    dispatch({ type: ActionTypes.REFRESH });
    return getAllPullRequests(config.repos)
      .then(pullRequestData => {
        dispatch(addPullRequests(pullRequestData.pullRequests));
      });
  };
}
