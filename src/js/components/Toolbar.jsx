import React from 'react';
import config from '../../config/config.json';

import RefreshButton from './RefreshButton';

export default function Toolbar(props) {
  return (
    <div id="toolbar">

      <RefreshButton onRefresh={props.onRefresh} />

      <div id="repo-selector" className="dropdown">
        <button
          className="btn btn-default dropdown-toggle"
          type="button"
          data-toggle="dropdown"
        >
            All repositories
          <span className="caret"></span>
        </button>
        <ul className="dropdown-menu">
          <li><a href="#">All repositories</a></li>
          <li role="separator" className="divider"></li>
          {config.repos.map(repo =>
            <li key={repo}><a href="#">{repo}</a></li>
          )}
        </ul>
      </div>
    </div>
  );
}

Toolbar.propTypes = {
  onRefresh: React.PropTypes.func.isRequired
};
