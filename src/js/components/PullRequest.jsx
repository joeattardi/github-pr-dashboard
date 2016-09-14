import React from 'react';
import moment from 'moment';
import config from '../../config/config.json';
import UserPhoto from './UserPhoto';

export default class PullRequest extends React.Component {

  formatRelativeTime(date) {
    return moment(date).fromNow();
  }

  formatTime(header, date) {
    return `${header} ${moment(date).format('MMMM Do YYYY, h:mm:ss a')}`;
  }

  renderComments() {
    const count = this.props.pullRequest.comments;
    const comments = this.props.pullRequest.computedComments;

    if (typeof comments === 'undefined' || typeof count === 'undefined') {
      return <div></div>;
    }

    return (
      <div className="pr-comments">
        {this.renderCommentCount(count)}
        {this.renderPositiveComments(comments)}
        {this.renderNegativeComments(comments)}
      </div>
    );
  }

  renderCommentCount(comments) {
    return (
      <div className="pr-comment-count" title={`${comments} comments`}>
        <i className="fa fa-comment"></i> {comments}
      </div>
    );
  }

  renderPositiveComments(comments) {
    const positiveComments = comments.filter(comment => {
      let result = false;
      config.comments.positive.forEach(type => {
        if (comment.body.indexOf(type) > -1) result = true;
      });
      return result;
    });
    return (
      <div className="pr-comment-positive" title={`${positiveComments.length} positive comments`}>
        <i className="fa fa-thumbs-up"></i> {positiveComments.length}
      </div>
    );
  }

  renderNegativeComments(comments) {
    const negativeComments = comments.filter(comment => {
      let result = false;
      config.comments.negative.forEach(type => {
        if (comment.body.indexOf(type) > -1) result = true;
      });
      return result;
    });
    return (
      <div className="pr-comment-negative" title={`${negativeComments.length} negative comments`}>
        <i className="fa fa-thumbs-down"></i> {negativeComments.length}
      </div>
    );
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
            {this.renderComments()}
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
