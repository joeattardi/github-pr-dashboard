export const ActionTypes = {
  ADD_PULL_REQUESTS: 'ADD_PULL_REQUESTS',
  UPDATE_PULL_REQUEST: 'UPDATE_PULL_REQUEST',
  ADD_FAILED_REPO: 'ADD_FAILED_REPO'
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
