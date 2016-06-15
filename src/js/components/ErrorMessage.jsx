import React from 'react';

export default class ErrorMessage extends React.Component {
  render() {
    return (
      <div className="alert alert-danger" role="alert">
        <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> 
        {this.props.message}
      </div>
    );
  }
}
