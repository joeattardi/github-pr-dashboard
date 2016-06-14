import React from 'react';
import moment from 'moment';

import UserPhoto from './UserPhoto';

class PullRequest extends React.Component {

  formatTime(date) {
    const momentDate = moment(date);
    return momentDate.fromNow();
  }

  render() {
    const pr = this.props.pullRequest;
    return (
      <div className="pr-item">
        <UserPhoto user={pr.user} />
        <div className="pr-main">
          <div className="pr-title">
            <a target="_blank" href={pr.html_url}>
              {pr.title}
            </a> 
          </div>
          <div className="pr-repo-name">
            {pr.base.repo.full_name}
          </div>
        </div>
        <div>
          created {this.formatTime(pr.created_at)} <br/>
          updated {this.formatTime(pr.updated_at)}
        </div>
      </div>
    );
  }
}

export default PullRequest;
