import { createStore, combineReducers } from 'redux';

import { pullRequestsReducer, failedReposReducer } from '../reducers';

export default function configureStore() {
  const reducer = combineReducers({
    pullRequests: pullRequestsReducer,
    failedRepos: failedReposReducer
  });

  return createStore(reducer);
}
