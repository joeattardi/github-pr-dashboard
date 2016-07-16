import React from 'react';

export default function RefreshButton(props) {
  return (
    <button
      id="refresh-button"
      type="button"
      className="btn btn-default"
      onClick={props.onRefresh}
    >
      <span className="glyphicon glyphicon-refresh"></span>
      <i className="fa fa-refresh"></i> Refresh
    </button>
  );
}

RefreshButton.propTypes = {
  onRefresh: React.PropTypes.func.isRequired
};
