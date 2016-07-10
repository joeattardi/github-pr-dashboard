import React from 'react';
import ReactDOM from 'react-dom';

import Main from './components/Main';
import config from '../config/config.json';
import configureStore from './store';

import 'bootstrap-loader';
import '../css/main.scss';

config.repos = config.repos.sort();

const store = configureStore();

ReactDOM.render(<Main />, document.getElementById('app'));

