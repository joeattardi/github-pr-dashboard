import React from 'react';
import moment from 'moment';

class PullRequest extends React.Component {

  formatTime(date) {
    const momentDate = moment(date);
    return momentDate.fromNow();
  }

  render() {
    const pr = this.props.pullRequest;
    return (
      <div className="pr-item">
        <div>
          <img className="profile-picture" src={pr.user.avatar_url} alt={pr.user.login} title={pr.user.login} />
        </div>
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
