import React from 'react';

export default function RefreshButton(props) {
  return (
    <button
      id="refresh-button"
      type="button"
      className="btn btn-default"
      onClick={props.onRefresh}
    >
      <i className="fa fa-refresh"></i>
    </button>
  );
}

RefreshButton.propTypes = {
  onRefresh: React.PropTypes.func.isRequired
};
