import React from 'react';
import moment from 'moment';

import config from '../../config/config.json';
import UserPhoto from './UserPhoto';
import { hasMergeRules, isMergeable, Comments } from './Comments';
import { Status } from './Status';

const baseClassName = 'pull-request';
const unmergeable = `${baseClassName} ${baseClassName}--unmergeable`;
const mergeable = `${baseClassName} ${baseClassName}--mergeable`;
const neverMerge = hasMergeRules() && new RegExp(config.mergeRule.neverRegexp, 'i');

function isUnmergeable(pr) {
  return neverMerge && neverMerge.test(pr.title);
}

function getPrClassName(pr) {
  if (isUnmergeable(pr)) {
    return unmergeable;
  }
  if (isMergeable(pr.computedComments, pr.computedReactions)) {
    return mergeable;
  }
  return baseClassName;
}

export default class PullRequest extends React.Component {

  formatRelativeTime(date) {
    return moment(date).fromNow();
  }

  formatTime(header, date) {
    return `${header} ${moment(date).format('MMMM Do YYYY, h:mm:ss a')}`;
  }

  render() {
    const pr = this.props.pullRequest;
    const className = getPrClassName(pr);

    return (
      <div className={className}>
        <UserPhoto size={50} user={pr.user} />
        <div className="pull-request-info">
          <div className="pull-request-title">
            <a target="_blank" href={pr.html_url}>{pr.title}</a>
          </div>
          <div>
            <a target="_blank" href={pr.base.repo.html_url}>
              {pr.base.repo.full_name}
            </a>
            <span className="pull-request-number">#{pr.number}</span>
            <Status
              status={pr.status}
            />
            <Comments
              comments={pr.comments}
              computedComments={pr.computedComments}
              computedReactions={pr.computedReactions}
            />
          </div>
          <div className="pull-request-created" title={this.formatTime('Created', pr.created_at)}>
            Created {this.formatRelativeTime(pr.created_at)}
          </div>
        </div>
        <div
          className="pull-request-last-updated"
          title={this.formatTime('Last updated', pr.updated_at)}
        >
          {this.formatRelativeTime(pr.updated_at)}
        </div>
      </div>
    );
  }
}

PullRequest.propTypes = {
  pullRequest: React.PropTypes.object.isRequired
};
