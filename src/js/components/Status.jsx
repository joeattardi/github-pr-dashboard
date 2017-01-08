import React from 'react';

const ICONS = {
  success: 'check-circle',
  pending: 'question-circle',
  failure: 'times-circle',
};

export function Status(props) {
  const status = props.status || {};

  const { state, statuses, total_count: count } = status;

  if (typeof count === 'undefined' || count === 0) {
    return null;
  }

  const passing = statuses.filter((s) =>
    s.state === 'success'
  );

  return (
    <div className="pr-status" title={`Status: ${state} (${passing.length}/${count} passing)`}>
      <i className={`fa fa-${ICONS[state]} ${state}`}></i>
    </div>
  );
}

Status.propTypes = {
  status: React.PropTypes.object,
};
