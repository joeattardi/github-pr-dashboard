import React from 'react';
import config from '../../config/config.json';
import emoji from 'emojione';
import _ from 'lodash';

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
  }).map(comment => comment.user.login);
}

function filterReactions(reactions, whitelist) {
  return reactions.filter(reaction =>
    whitelist.indexOf(`:${reaction.content}:`) > -1
  ).map(reaction => reaction.user.login);
}

function translateReaction(reaction) {
  const translationMap = {
    '+1': 'thumbsup',
    '-1': 'thumbsdown',
    laugh: 'laughing',
    hooray: 'tada'
  };
  return translationMap[reaction] || reaction;
}

function getPosNegCount(comments, reactions, whitelist) {
  const commentUsers = filterComments(comments, whitelist);
  const reactionUsers = filterReactions(reactions, whitelist);
  return _.union(commentUsers, reactionUsers).length;
}

function renderCommentCount(comments) {
  return (
    <div className="pr-comment-count" title={`${comments} comments`}>
      <i className="fa fa-comment"></i> {comments}
    </div>
  );
}

function renderPositiveComments(comments, reactions) {
  if (typeof config.comments.negative === 'undefined') return '';
  const positiveCount = getPosNegCount(comments, reactions, config.comments.positive || []);
  return (
    <div className="pr-comment-positive" title={`${positiveCount} positive comments`}>
      <i className="fa fa-thumbs-up"></i> {positiveCount}
    </div>
  );
}

function renderNegativeComments(comments, reactions) {
  if (typeof config.comments.negative === 'undefined') return '';
  const negativeCount = getPosNegCount(comments, reactions, config.comments.negative || []);
  return (
    <div className="pr-comment-negative" title={`${negativeCount} negative comments`}>
      <i className="fa fa-thumbs-down"></i> {negativeCount}
    </div>
  );
}

function renderOtherReactions(reactions) {
  if (!!config.reactions) return <div />;
  const reactionCounts = {};
  const positive = config.comments.positive || [];
  const negative = config.comments.negative || [];
  const alreadyDoneList = positive.concat(negative);

  reactions.forEach(reaction => {
    const name = reaction.content;
    if (alreadyDoneList.indexOf(`:${name}:`) > -1) return;
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

export default function Comments(props) {
  const count = props.comments;
  const comments = props.computedComments;
  const reactions = props.computedReactions;

  if (typeof config.comments === 'undefined') config.comments = {};

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
      {renderPositiveComments(comments, reactions)}
      {renderNegativeComments(comments, reactions)}
      {renderOtherReactions(reactions)}
    </div>
  );
}

Comments.propTypes = {
  comments: React.PropTypes.number,
  computedComments: React.PropTypes.array,
  computedReactions: React.PropTypes.array
};
