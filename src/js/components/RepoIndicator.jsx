import React from 'react';
import moment from 'moment';

export default class RepoIndicator extends React.Component {

  formatRelativeTime(date) {
    return moment(date).fromNow();
  }

  formatTime(header, date) {
    return `${header} ${moment(date).format('MMMM Do YYYY, h:mm:ss a')}`;
  }

  render() {
    const pr = this.props.pullRequest;
    const isToHide = !this.props.show;

    const styleHidden = {
      display: 'none'
    };
    const styleShow = {
      display: 'block'
    };

    function getStyles() {
      if (isToHide) {
        return styleHidden;
      }
      return styleShow;
    }

    return (
      <div className="repo-indicator" style={getStyles()}>
        <div className="repo-indicator-description" >
          <div className="repo-symbol">
            <i className="fa fa-2x fa-th"></i>
          </div>
          <div className="repo-title">
            <a className="repo-link" target="_blank" href={pr.repoUrl}>
              {pr.repo}
            </a>
          </div>
          <div className="repo-details">
            <div className="repo-details-line">
              Created: {this.formatRelativeTime(pr.created_at)}
            </div>
            <div className="repo-details-line">
              Last updated: {this.formatRelativeTime(pr.updated_at)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

RepoIndicator.propTypes = {
  pullRequest: React.PropTypes.object.isRequired,
  show: React.PropTypes.bool.isRequired
};
