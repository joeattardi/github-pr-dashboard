import React from 'react';
import { connect } from 'react-redux';

import { refresh } from '../actions';
import RefreshButton from './RefreshButton';
import AutoRefreshControl from './AutoRefreshControl';

function Toolbar(props) {
  return (
    <div id="toolbar">
      <RefreshButton onRefresh={props.refresh} />
      <AutoRefreshControl onRefresh={props.refresh} />
    </div>
  );
}

Toolbar.propTypes = {
  refresh: React.PropTypes.func.isRequired
};

function mapStateToProps() { return {}; }

function mapDispatchToProps(dispatch) {
  return {
    refresh: () => dispatch(refresh())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);

