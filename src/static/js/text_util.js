/*
* Utilities for formatting tweet text
* Author: Connor Witt
*/

const TWITTER_LINK_REGEX = /https:\/\/t\.co\/[a-zA-Z0-9]{10}/g;

var exports = module.exports = {};

function removeLinks(text) {
  return text.replace(TWITTER_LINK_REGEX, '');
}

exports.formatTweetText = function(text) {
  reformattedText = removeLinks(text);
  return reformattedText;
}
