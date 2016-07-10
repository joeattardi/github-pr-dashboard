import deepFreeze from 'deep-freeze';

import { pullRequestsReducer } from '../../src/js/reducers';
import * as actions from '../../src/js/actions';

describe('Pull Request Reducer', () => {
  it('should add pull requests to the state', () => {
    const state = [
      {
        id: 10000,
        number: 5,
        state: 'open'
      }
    ];

    const action = actions.addPullRequests([
      {
        id: 10001,
        number: 6,
        state: 'open'
      }
    ]);

    const result = pullRequestsReducer(deepFreeze(state), deepFreeze(action));

    expect(result.length).toBe(2);
  });

  it('should update an existing pull request with additional data', () => {
    const state = [
      {
        id: 10000,
        number: 5,
        state: 'open'
      },
      {
        id: 10001,
        number: 6,
        state: 'open'
      }
    ];

    const action = actions.updatePullRequest({
      id: 10000,
      comments: 10
    });

    const result = pullRequestsReducer(deepFreeze(state), deepFreeze(action));

    expect(result[0].comments).toBe(10);
    expect(result[1].comments).not.toBeDefined();
  });
});
