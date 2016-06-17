import React from 'react';

import RefreshButton from './RefreshButton';
import RepoSelector from './RepoSelector';

export default function Toolbar(props) {
  return (
    <div id="toolbar">
      <RefreshButton onRefresh={props.onRefresh} />
      <RepoSelector />
    </div>
  );
}

Toolbar.propTypes = {
  onRefresh: React.PropTypes.func.isRequired
};
