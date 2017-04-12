import React from 'react';
import { withRouter } from 'react-router-dom';

function SettingsButton({ history }) {
  return (
    <button
      id="settings-button"
      type="button"
      className="btn btn-default"
      title="Settings"
      onClick={() => history.push('/settings')}
    >
      <i className="fa fa-lg fa-gear"></i>
    </button>
  );
}

SettingsButton.propTypes = {
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(SettingsButton);
