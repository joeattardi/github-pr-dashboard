import React from 'react';
import ReactDOM from 'react-dom';

import Main from './components/Main';
import config from '../config/config.json';

import '../css/main.scss';

config.repos = config.repos.sort();

ReactDOM.render(<Main />, document.getElementById('app'));

