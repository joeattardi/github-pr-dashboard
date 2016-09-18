import React from 'react';
import moment from 'moment';

import UserPhoto from './UserPhoto';
import Comments from './Comments';

export default class PullRequest extends React.Component {

  formatRelativeTime(date) {
    return moment(date).fromNow();
  }

  formatTime(header, date) {
    return `${header} ${moment(date).format('MMMM Do YYYY, h:mm:ss a')}`;
  }

  render() {
    const pr = this.props.pullRequest;
    return (
      <div className="pull-request">
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
            <Comments comments={pr.comments} computedComments={pr.computedComments} />
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
