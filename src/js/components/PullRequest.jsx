import React from 'react';
import moment from 'moment';

import '../../images/repo.svg';
import '../../images/git-pull-request.svg';

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
  if (isMergeable(pr.comments, pr.reactions)) {
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
            <img src="images/git-pull-request.svg" /> <a target="_blank" href={pr.url}>{pr.title}</a>
          </div>
          <div>
            <a target="_blank" href={pr.repoUrl}>
              <img src="images/repo.svg" /> {pr.repo}
            </a>
            <span className="pull-request-number">#{pr.number}</span>
            <Status
              status={pr.status}
            />
            <Comments
              comments={pr.comments}
              reactions={pr.reactions}
            />
          </div>
          <div className="pull-request-created" title={this.formatTime('Created', pr.created)}>
            Created {this.formatRelativeTime(pr.created)}
          </div>
        </div>
        <div
          className="pull-request-last-updated"
          title={this.formatTime('Last updated', pr.updated)}
        >
          {this.formatRelativeTime(pr.updated)}
        </div>
      </div>
    );
  }
}

PullRequest.propTypes = {
  pullRequest: React.PropTypes.object.isRequired
};
