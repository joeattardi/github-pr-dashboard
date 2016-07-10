import deepFreeze from 'deep-freeze';

import { failedReposReducer } from '../../src/js/reducers';
import { addFailedRepo } from '../../src/js/actions';

describe('Failed Repos Reducer', () => {
  it('should add failed repos to the state', () => {
    const state = [];
    const action = addFailedRepo('owner/repo');
    const result = failedReposReducer(deepFreeze(state), deepFreeze(action));
    expect(result.length).toBe(1);
    expect(result[0]).toBe('owner/repo');
  });
});
