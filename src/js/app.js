import React from 'react';
import ReactDOM from 'react-dom';

import Main from './Main';

const repos = ['galileo-engine', 'galileo-editor'];

ReactDOM.render(<Main repos={repos} />, document.getElementById('app'));

