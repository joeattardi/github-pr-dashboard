import React from 'react';
import config from '../../config/config.json';

export default class Toolbar extends React.Component {
  constructor(props) {
    super(props);

    this.handleRefresh = this.handleRefresh.bind(this);
  }

  handleRefresh(e) {
    e.preventDefault();
    console.log('Reload');
  }

  render() {
    return (
      <div id="toolbar">

        <button
          id="refresh-button"
          type="button"
          className="btn btn-default"
          onClick={this.props.onRefresh}
        >
          <span className="glyphicon glyphicon-refresh"></span>
          Refresh
        </button>

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
}

Toolbar.propTypes = {
  onRefresh: React.PropTypes.func.isRequired
};
