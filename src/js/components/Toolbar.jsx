import React from 'react';
import { connect } from 'react-redux';

import { refresh, loadPullRequests } from '../actions';
import RefreshButton from './RefreshButton';
import AutoRefreshControl from './AutoRefreshControl';
import config from '../../config/config.json';
import FilterRepoDropdown from './FilterRepoDropdown';

class Toolbar extends React.Component {

  renderFilterRepoDropdown() {
    return (
      <FilterRepoDropdown
        onRefresh={this.props.refresh}
        failedRepos={this.props.failedRepos}
        allRepos={config.repos}
      />
    );
  }
  render() {
    return (
      <div id="toolbar">
        <RefreshButton onRefresh={this.props.refresh} />
        <AutoRefreshControl onRefresh={this.props.refresh} />
        {this.renderFilterRepoDropdown()}
      </div>
    );
  }
}

Toolbar.propTypes = {
  refresh: React.PropTypes.func.isRequired,
  failedRepos: React.PropTypes.array.isRequired
};

function mapStateToProps() { return {}; }

function mapDispatchToProps(dispatch) {
  return {
    refresh: () => {
      dispatch(refresh());
      dispatch(loadPullRequests());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);

