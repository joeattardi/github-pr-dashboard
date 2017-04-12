const emojione = require('emojione');

const configManager = require('./configManager');

let positiveEmojis = [];
let negativeEmojis = [];

function countReactions(reactions, whitelist) {
  let count = 0;
  reactions.forEach(reaction => {
    whitelist.forEach(emoji => {
      if (emoji.indexOf(reaction.content) >= 0) {
        count++;
      }
    });
  });

  return count;
}

function countComments(comments, whitelist) {
  let count = 0;
  comments.forEach(comment => {
    whitelist.forEach(emoji => {
      if (comment.body.indexOf(emoji) >= 0) {
        count++;
      }
    });
  });

  return count;
}

exports.init = function init() {
  const config = configManager.getConfig();
  positiveEmojis = [];
  negativeEmojis = [];

  config.comments.positive.forEach(positive => {
    if (positiveEmojis.indexOf(positive) < 0) {
      positiveEmojis.push(positive);
    }

    if (positiveEmojis.indexOf(emojione.shortnameToUnicode(positive)) < 0) {
      positiveEmojis.push(emojione.shortnameToUnicode(positive));
    }
  });

  config.comments.negative.forEach(negative => {
    if (negativeEmojis.indexOf(negative) < 0) {
      negativeEmojis.push(negative);
    }

    const emoji = emojione.shortnameToUnicode(negative);
    if (negativeEmojis.indexOf(emoji) < 0) {
      negativeEmojis.push(emoji);
    }
  });
};

exports.getOtherReactions = function getOtherReactions(reactions) {
  const config = configManager.getConfig();
  if (config.comments) {
    return reactions.filter(reaction =>
      positiveEmojis.indexOf(`:${reaction.content}:`) < 0 &&
      negativeEmojis.indexOf(`:${reaction.content}:`) < 0);
  }

  return reactions;
};

exports.countPositiveReactions = function countPostiveReactions(reactions) {
  return countReactions(reactions, positiveEmojis);
};

exports.countNegativeReactions = function countNegativeReactions(reactions) {
  return countReactions(reactions, negativeEmojis);
};

exports.countPositiveComments = function countPositiveComments(comments) {
  return countComments(comments, positiveEmojis);
};

exports.countNegativeComments = function countNegativeComments(comments) {
  return countComments(comments, negativeEmojis);
};
