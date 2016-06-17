import React from 'react';
import config from '../../config/config.json';

export default function RepoSelector() {
  return (
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
  );
}
