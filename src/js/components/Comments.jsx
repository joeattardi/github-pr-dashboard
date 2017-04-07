import React from 'react';
import emoji from 'emojione';
import _ from 'lodash';

function translateReaction(reaction) {
  const translationMap = {
    '+1': 'thumbsup',
    '-1': 'thumbsdown',
    laugh: 'laughing',
    hooray: 'tada'
  };
  return translationMap[reaction] || reaction;
}

function renderCommentCount(comments) {
  return (
    <div className="pr-comment-count" title={`${comments} comments`}>
      <i className="fa fa-comment-o"></i> {comments}
    </div>
  );
}

function renderPositiveComments(comments) {
  return (
    <div className="pr-comment-positive" title={`${comments} positive comments`}>
      <i className="fa fa-thumbs-o-up"></i> {comments}
    </div>
  );
}

function renderNegativeComments(comments) {
  return (
    <div className="pr-comment-negative" title={`${comments} negative comments`}>
      <i className="fa fa-thumbs-o-down"></i> {comments}
    </div>
  );
}

function renderOtherReactions(reactions) {
  const reactionCounts = {};

  reactions.forEach(reaction => {
    const name = reaction.content;
    if (!reactionCounts[name]) reactionCounts[name] = 0;
    reactionCounts[name] += 1;
  });

  return _.map(reactionCounts, (count, reaction) => (
    <div className="pr-reaction" title={`${count} ${reaction} reactions`} key={reaction}>
      {emoji.shortnameToUnicode(`:${translateReaction(reaction)}:`)} {count}
    </div>
    )
  );
}

export function Comments(props) {
  const count = props.comments.length;
  const comments = props.comments;
  const reactions = props.reactions;

  // If the comment count wasn't provided, don't render anything
  if (typeof count === 'undefined') {
    return <div></div>;
  }

  // If the comment config wasn't provided, only render the total count
  if (typeof comments === 'undefined') {
    // Set a default value so reactions process ok
    return (
      <div className="pr-comments">
        {renderCommentCount(count)}
        {renderOtherReactions(reactions)}
      </div>
    );
  }

  // If all data was provided, render the positive, negative, and total counts
  return (
    <div className="pr-comments">
      {renderCommentCount(count)}
      {renderPositiveComments(props.positiveCommentCount)}
      {renderNegativeComments(props.negativeCommentCount)}
      {renderOtherReactions(reactions)}
    </div>
  );
}

Comments.propTypes = {
  positiveCommentCount: React.PropTypes.number,
  negativeCommentCount: React.PropTypes.number,
  comments: React.PropTypes.array,
  reactions: React.PropTypes.array
};
