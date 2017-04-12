import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Dashboard from './components/Dashboard';
import EditDashboard from './components/EditDashboard';
import { loadPullRequests } from './actions';
import configureStore from './store';

import '../css/main.scss';

const store = configureStore();

store.dispatch(loadPullRequests(undefined));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={Dashboard} />
        <Route path="/settings" component={EditDashboard} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('app')
);
