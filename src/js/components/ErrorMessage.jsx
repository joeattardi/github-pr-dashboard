import React from 'react';

export default function ErrorMessage({ message }) {
  return (
    <div className="error-message">
      <div className="error-message-details">
        <div className="warning-symbol"><i className="fa fa-2x fa-warning"></i></div>
        <div>{message}</div>
      </div>
    </div>
  );
}

ErrorMessage.propTypes = {
  message: React.PropTypes.string.isRequired,
  details: React.PropTypes.string
};
