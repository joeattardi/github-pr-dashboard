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
});
