import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

class SortControl extends React.Component {
  constructor(props) {
    super(props);
    this.toggleSortByRepo = this.toggleSortByRepo.bind(this);
  }


  toggleSortByRepo() {
    const sortByRepo = this.refs.sortByRepoCheckbox.checked;
    this.props.actions.sort({ sortByRepo });
  }

  render() {
    return (
      <div id="sort-by-repo-container">
        <input
          type="checkbox"
          ref="sortByRepoCheckbox"
          id="sort-by-repo"
          onChange={this.toggleSortByRepo}
          checked={this.props.sortOptions.sortByRepo}
        />
        <label htmlFor="sort-by-repo"><strong>Sort By Repo</strong></label>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    sortOptions: state.sortOptions,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
}

SortControl.propTypes = {
  sortOptions: React.PropTypes.any,
  actions: React.PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(SortControl);
