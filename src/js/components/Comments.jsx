import React from 'react';
import config from '../../config/config.json';

function renderCommentCount(comments) {
  return (
    <div className="pr-comment-count" title={`${comments} comments`}>
      <i className="fa fa-comment"></i> {comments}
    </div>
  );
}

function renderPositiveComments(comments) {
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

function renderNegativeComments(comments) {
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

export default function Comments(props) {
  const count = props.comments;
  const comments = props.computedComments;

  if (typeof comments === 'undefined' || typeof count === 'undefined') {
    return <div></div>;
  }

  return (
    <div className="pr-comments">
      {renderCommentCount(count)}
      {renderPositiveComments(comments)}
      {renderNegativeComments(comments)}
    </div>
  );
}

Comments.propTypes = {
  comments: React.PropTypes.number,
  computedComments: React.PropTypes.array
};
