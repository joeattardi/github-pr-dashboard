import React from 'react';

import RefreshButton from './RefreshButton';
import AutoRefreshControl from './AutoRefreshControl';

export default function Toolbar(props) {
  return (
    <div id="toolbar">
      <RefreshButton onRefresh={props.onRefresh} />
      <AutoRefreshControl onRefresh={props.onRefresh} />
    </div>
  );
}

Toolbar.propTypes = {
  onRefresh: React.PropTypes.func.isRequired
};
