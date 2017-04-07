import React from 'react';

const ICONS = {
  success: 'check-circle',
  pending: 'question-circle',
  failure: 'times-circle',
  error: 'times-circle'
};

export function Status(props) {
  const status = props.status || {};

  const { state, description } = status;

  return (
    <div className="pr-status" title={description}>
      <i className={`fa fa-${ICONS[state]} ${state}`}></i>
    </div>
  );
}

Status.propTypes = {
  status: React.PropTypes.object,
};
