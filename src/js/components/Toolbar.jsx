import React from 'react';
import { connect } from 'react-redux';

import { refresh, loadPullRequests } from '../actions';
import RefreshButton from './RefreshButton';
import SettingsButton from './SettingsButton';
import AutoRefreshControl from './AutoRefreshControl';
import FilterRepoDropdown from './FilterRepoDropdown';

class Toolbar extends React.Component {

  renderFilterRepoDropdown() {
    return (
      <FilterRepoDropdown
        onRefresh={this.props.refresh}
        failedRepos={this.props.failedRepos}
        allRepos={this.props.repos}
      />
    );
  }
  render() {
    return (
      <div id="toolbar">
        <SettingsButton />
        <RefreshButton onRefresh={this.props.refresh} />
        <AutoRefreshControl onRefresh={this.props.refresh} />
      </div>
    );
  }
}

Toolbar.propTypes = {
  refresh: React.PropTypes.func.isRequired,
  failedRepos: React.PropTypes.array.isRequired,
  repos: React.PropTypes.array.isRequired
};

function mapStateToProps(state) { return state; }

function mapDispatchToProps(dispatch) {
  return {
    refresh: () => {
      dispatch(refresh());
      dispatch(loadPullRequests());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
