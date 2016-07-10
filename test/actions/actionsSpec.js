import * as actions from '../../src/js/actions';

describe('Action Creators', () => {
  it('should exist', () => {
    expect(true).toBeTruthy();
  });

  it('should create an UPDATE_PULL_REQUEST action', () => {
    expect(actions.updatePullRequest({})).toEqual({
      type: actions.ActionTypes.UPDATE_PULL_REQUEST,
      pullRequest: {}
    });
  });

  it('should create an ADD_FAILED_REPO action', () => {
    expect(actions.addFailedRepo('owner/repo')).toEqual({
      type: actions.ActionTypes.ADD_FAILED_REPO,
      failedRepo: 'owner/repo'
    });
  });
});
