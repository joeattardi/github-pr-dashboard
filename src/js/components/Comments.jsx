import React from 'react';
import config from '../../config/config.json';
import emoji from 'emojione';

function filterComments(comments, whitelist) {
  return comments.filter(comment => {
    let result = false;
    whitelist.forEach(entry => {
      let entryName = entry;
      let entryEmoji = entry;
      if (entry.charAt(0) === ':') {
        entryName = entry.replace(':', '');
        entryEmoji = emoji.shortnameToUnicode(entry);
      }
      // Check for both the emoji and shortname because old GitHub Enterprise
      // returns the shortcodes, not the emoji themselves.
      if (comment.body.indexOf(entryName) > -1 ||
          comment.body.indexOf(entryEmoji) > -1) {
        result = true;
      }
    });
    return result;
  });
}

function renderCommentCount(comments) {
  return (
    <div className="pr-comment-count" title={`${comments} comments`}>
      <i className="fa fa-comment"></i> {comments}
    </div>
  );
}

function renderPositiveComments(comments) {
  const positiveComments = filterComments(comments, config.comments.positive || []);
  return (
    <div className="pr-comment-positive" title={`${positiveComments.length} positive comments`}>
      <i className="fa fa-thumbs-up"></i> {positiveComments.length}
    </div>
  );
}

function renderNegativeComments(comments) {
  const negativeComments = filterComments(comments, config.comments.negative || []);
  return (
    <div className="pr-comment-negative" title={`${negativeComments.length} negative comments`}>
      <i className="fa fa-thumbs-down"></i> {negativeComments.length}
    </div>
  );
}

export default function Comments(props) {
  const count = props.comments;
  const comments = props.computedComments;

  if (typeof config.comments === 'undefined' ||
      typeof comments === 'undefined' ||
      typeof count === 'undefined') {
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
