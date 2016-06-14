import React from 'react';
import moment from 'moment';

import UserPhoto from './UserPhoto';

class PullRequest extends React.Component {

  formatRelativeTime(date) {
    return moment(date).fromNow();
  }

  formatTime(date) {
    return 'Last updated ' + moment(date).format('MMMM Do YYYY, h:mm:ss a');  
  }

  render() {
    const pr = this.props.pullRequest;
    return (
      <div className="pull-request panel panel-default">
        <div className="panel-body">
          <UserPhoto size="50" user={pr.user} />
          <div className="pr-main">
            <div className="pr-title">
              <a target="_blank" href={pr.html_url}>{pr.title}</a>
            </div>
            <div className="pr-repo-name">
              <a target="_blank" href={pr.base.repo.html_url}>
                {pr.base.repo.full_name}
              </a>
            </div>
          </div>
          <div className="pr-last-updated">
            <span className="label label-primary" title={this.formatTime(pr.updated_at)}>
              {this.formatRelativeTime(pr.updated_at)}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default PullRequest;
