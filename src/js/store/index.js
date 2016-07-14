import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { loadingReducer, pullRequestsReducer, failedReposReducer } from '../reducers';

export default function configureStore() {
  const reducer = combineReducers({
    pullRequests: pullRequestsReducer,
    failedRepos: failedReposReducer,
    loading: loadingReducer
  });

  return createStore(reducer, {}, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));
}
