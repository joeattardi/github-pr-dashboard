import React from 'react';

export default function ErrorMessage(props) {
  return (
    <div className="alert alert-danger" role="alert">
      <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
      {props.message}
    </div>
  );
}

ErrorMessage.propTypes = {
  message: React.PropTypes.string.isRequired
};
