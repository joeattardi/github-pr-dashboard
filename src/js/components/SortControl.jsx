import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

class SortControl extends React.Component {
  constructor(props) {
    super(props);

    this.changeSortOptions = this.changeSortOptions.bind(this);
  }

  changeSortOptions() {
    const sortByRepo = this.refs.sortByRepoCheckbox.checked;
    const orderBy = this.refs.orderBySelect.value;

    this.props.actions.sort({ sortByRepo, orderBy });
  }

  render() {
    return (
      <div id="sort-container">
        <span style={{ marginRight: '1em' }}>
          <input
            type="checkbox"
            ref="sortByRepoCheckbox"
            id="sort-by-repo"
            onChange={this.changeSortOptions}
            checked={this.props.sortOptions.sortByRepo}
          />
          <label htmlFor="sort-by-repo"><strong>Sort by repo</strong></label>
        </span>
        <span>
          <label htmlFor="order-by"><strong>Order by</strong></label>
          &nbsp;
          <select id="order-by" ref="orderBySelect" onChange={this.changeSortOptions}>
            <option value="updated">last updated</option>
            <option value="created">created</option>
          </select>
        </span>
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
