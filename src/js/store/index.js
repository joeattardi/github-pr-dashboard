import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import {
  loadingReducer,
  reposReducer,
  titleReducer,
  pullRequestsReducer,
  failedReposReducer,
  errorReducer
} from '../reducers';

export default function configureStore() {
  const reducer = combineReducers({
    pullRequests: pullRequestsReducer,
    repos: reposReducer,
    failedRepos: failedReposReducer,
    loading: loadingReducer,
    error: errorReducer,
    title: titleReducer
  });

  return createStore(reducer, {}, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));
}
