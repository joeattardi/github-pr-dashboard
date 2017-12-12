import axios from 'axios';

export const ActionTypes = {
  ADD_PULL_REQUESTS: 'ADD_PULL_REQUESTS',
  UPDATE_PULL_REQUEST: 'UPDATE_PULL_REQUEST',
  SET_FAILED_REPOS: 'SET_FAILED_REPOS',
  REFRESH: 'REFRESH',
  START_LOADING: 'START_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_REPOS: 'SET_REPOS',
  SET_TITLE: 'SET_TITLE',
  SORT: 'SORT'
};

export function setError(error) {
  return {
    type: ActionTypes.SET_ERROR,
    error
  };
}

export function setRepos(repos) {
  return {
    type: ActionTypes.SET_REPOS,
    repos
  };
}

export function setTitle(title) {
  return {
    type: ActionTypes.SET_TITLE,
    title
  };
}

export function addPullRequests(pullRequests, sortOptions) {
  return {
    type: ActionTypes.ADD_PULL_REQUESTS,
    pullRequests,
    sortOptions
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
  return (dispatch, getState) => {
    const { sortOptions } = getState();
    dispatch({ type: ActionTypes.START_LOADING });
    return axios.get('/pulls').then(response => {
      dispatch(addPullRequests(response.data.pullRequests, sortOptions));
      dispatch(setRepos(response.data.repos));
      dispatch(setTitle(response.data.title || 'Pull Requests'));
    }).catch(() => {
      dispatch(setError('Failed to load pull requests. Double check that all your repos exist!'));
    });
  };
}

export function refresh() {
  return {
    type: ActionTypes.REFRESH
  };
}

export function sort({ sortByRepo, orderBy }) {
  return {
    type: ActionTypes.SORT,
    sortOptions: {
      sortByRepo,
      orderBy
    }
  };
}
